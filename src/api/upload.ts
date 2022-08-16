import { RecordApis, createApiByConfig } from './utils'

type Apis = 'uploadFile'

const apis: RecordApis<Apis> = {
  uploadFile: {
    url: 'Upload/UploadFile',
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    timeout: 10 * 60 * 1000,
  }, // 上传文件
}

export default createApiByConfig(apis)
