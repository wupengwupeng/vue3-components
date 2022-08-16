import { ApiOptions } from '@/lib/request'
import request from '@/lib/request'
import { AxiosRequestConfig } from 'axios'

export type RecordApis<T extends string> = Record<T, AxiosRequestConfig>
type ReturnTypeOfRequest = ReturnType<typeof request>

interface HttpRequest {
  (data?: unknown, options?: ApiOptions): ReturnTypeOfRequest
}

export function createApiByConfig<T extends RecordApis<string>>(apis: T) {
  type HttpRequests = {
    [key in keyof T]: HttpRequest
  }
  const api: HttpRequests = {} as HttpRequests
  for (const key in apis) {
    if (Object.prototype.hasOwnProperty.call(apis, key)) {
      const config = apis[key]
      api[key] = (data, options) => {
        if (data) {
          if (config.method === 'POST' || config.method === 'PUT' || config.method === 'PATCH') {
            config.data = data
          } else {
            config.params = data
          }
        }
        return request(config, options)
      }
    }
  }
  return api
}
