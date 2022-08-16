import { saveAs } from 'file-saver'
import { parseTime } from '@/lib/utils.ts'

// blob文件下载 二进制文件 后端返回的二进制流数据进行下载
export function blobDownload(data, fileName = `${parseTime(new Date().getTime())}.csv`) {
  if (!data) return;
  saveAs(new Blob([data]), fileName);
}
