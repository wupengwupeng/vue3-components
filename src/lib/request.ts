import * as redirect from '@/lib/redirect'
import { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { clone, merge } from 'lodash'
import axios from './axios'
import { isRealProduction } from './is'

export interface ApiResponse {
  code: any
  status?: number
  data: any
  message: string
  errors?: any[]
  Debug?: string
  TraceIdentifier?: string
}
export interface ApiOptions {
  showSuccessNotification?: boolean
  showErrorMessage?: boolean
  redirectable?: boolean
}

const DEFAULT_API_OPTIONS: ApiOptions = {
  showSuccessNotification: false,
  showErrorMessage: true,
  redirectable: true,
}

export function showErrorMessage(message: string) {
  ElMessage({
    type: 'error',
    message,
  })
}

function handlerApiResponseErrors(res: ApiResponse, options: ApiOptions) {
  const status = res.status
  if (status === 400) {
    if (options.showErrorMessage) {
      const errors = res.errors
      if (errors && errors.length > 0) {
        showErrorMessage(Object.values(errors).flat(Infinity).join(' '))
      } else {
        showErrorMessage(res.message)
      }
    }
  } else if (status === 401) {
    // if (options.redirectable) redirect.login()
    redirect.unauthorized()
  } else if (status === 404) {
    // if (options.redirectable) redirect.pageNotFound()
    redirect.pageNotFound()
  } else if (status === 500) {
    if (!isRealProduction())
      ElNotification({
        type: 'error',
        title: status.toString(),
        message: res.message,
        duration: 60 * 1000,
        position: 'bottom-left',
      })
    if (options.redirectable) redirect.serverError()
  } else {
    if (options.showErrorMessage) showErrorMessage(`${res.message || 'Exception not caught by server'}`)
  }
}
function handlerAxiosResponseErrors(res: AxiosResponse, options: ApiOptions) {
  const status = res.status
  if (status === 401) {
    redirect.unauthorized()
    // if (options.redirectable) redirect.login()
  } else if (status === 404) {
    redirect.pageNotFound()
    // if (options.redirectable) redirect.pageNotFound()
  } else if (status === 500) {
    if (options.redirectable) redirect.serverError()
  } else {
    if (options.showErrorMessage) {
      const data: ApiResponse = res.data
      if (data) {
        showErrorMessage(`${data.message || 'Exception not caught by server'}`)
      } else {
        showErrorMessage(`${res.statusText || 'Exception not caught by server'}`)
      }
    }
  }
}

// 
async function to(promise: AxiosPromise<ApiResponse>, options?: ApiOptions): Promise<[ApiResponse, null] | [null, ApiResponse | AxiosError]> {
  options = merge(clone(DEFAULT_API_OPTIONS), options)
  try {
    const res = await promise
    const data = res.data
    const code: any = data.code
    if (data.Debug) {
      console.debug(res.config.url, {
        Debug: data.Debug,
        TraceIdentifier: data.TraceIdentifier
      })
    }
    if (code === '1001') {
      if (options.showSuccessNotification) {
        ElNotification({
          type: 'success',
          title: status.toString(),
          message: data.message,
          position: 'bottom-right',
        })
      }
      return [data, null]
    } else {
      handlerApiResponseErrors(data, options)
      return [null, data]
    }
  } catch (error) {
    const err = error as AxiosError<ApiResponse>
    if (err.response) {
      const res = err.response
      if (res.status === 200) {
        handlerApiResponseErrors(res.data, options)
      } else if (res.status === 1) {
        handlerAxiosResponseErrors(res, options)
      } else {
        handlerAxiosResponseErrors(res, options)
      }
    } else if (err.request) {
      // 请求已经成功发起 但没有收到响应
      if (options.showErrorMessage) showErrorMessage(err.message)
    } else {
      // 发送请求时出了点问题
      if (options.showErrorMessage) showErrorMessage(err.message)
    }
    return [null, err]
  }
}

export default (config: AxiosRequestConfig, options?: ApiOptions) => {
  return to(axios(config), options)
}
