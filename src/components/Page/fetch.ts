import { BASE_URL_REPOSTORYTwo, VITE_NEW_EXPORT_API } from '@/lib/config'
import { RecordApis, createApiByConfig } from "@/api/utils";

const baseURL = VITE_NEW_EXPORT_API

type Apis = 'pageNation'

function apiRecord(urls: string) {
  const apis: RecordApis<Apis> = {
    pageNation: { baseURL, url: urls, method: 'GET' }
  }
  return apis
}
function createApi(urls: string) {
  return createApiByConfig(apiRecord(urls))
}

export default createApi;



