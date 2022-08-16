import { BASE_URL_REPOSTORYTwo, VITE_NEW_EXPORT_API } from "@/lib/config";
import { RecordApis, createApiByConfig } from './utils'
const baseURL = VITE_NEW_EXPORT_API

type Apis =
  | 'downLoad'
  | 'getAllTemplate'
  | 'deleteTemplate'
  | 'createTemplate'
  | 'updateTemplate'

const apis: RecordApis<Apis> = {
  downLoad: { baseURL, url: 'data/file', method: 'GET' },
  getAllTemplate: { baseURL, url: 'data/templates', method: 'GET' },
  deleteTemplate: { baseURL, url: 'data/template', method: 'DELETE' },
  createTemplate: { baseURL, url: 'data/template', method: 'POST' },
  updateTemplate: { baseURL, url: 'data', method: 'PUT' }
}

export default createApiByConfig(apis)