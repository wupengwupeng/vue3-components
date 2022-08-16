import api from '@/api'

function getChunkData(file: File, index: number, chunkSize: number): Blob {
  const start: number = index * chunkSize
  const end: number = Math.min(file.size, start + chunkSize)
  const data: Blob = file.slice(start, end)
  return data
}

function getGuid(): string {
  const S4 = (): string => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

export const uploadByPieces = async (file: File, size = 1) => {
  const chunkSize: number = size * 1024 * 1024 // 1MB一片
  const chunkCount: number = Math.ceil(file.size / chunkSize) // 总片数

  const guid: string = getGuid()
  for (let index = 0; index < chunkCount; index++) {
    const data: Blob = getChunkData(file, index, chunkSize)
    const formData: FormData = new FormData()
    formData.append('fileName', file.name)
    formData.append('data', data)
    formData.append('index', (index + 1).toString())
    formData.append('total', chunkCount.toString())
    formData.append('lastModified', guid)
    const [res, err] = await api.lims.uploadFile(formData)
    if (res) {
      if (index === chunkCount - 1) {
        return res.data
      }
    } else {
      return Promise.reject(err)
    }
  }
}

export const uploadFile = async (file: File, fileType = -1) => {
  const formData: FormData = new FormData()
  formData.append('fileType', fileType.toString())
  formData.append('file', file)
  const [res, err] = await api.upload.uploadFile(formData)
  if (res) {
    return res.data
  } else {
    return Promise.reject(err)
  }
}
