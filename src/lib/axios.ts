import { AUTHENTICATION, AXIOS_TIMEOUT, BASE_URL_API } from '@/lib/config'
import { getLang, getToken } from '@/lib/storage'
import Axios from 'axios'
const axios = Axios.create({
  baseURL: BASE_URL_API,
  timeout: AXIOS_TIMEOUT,
})

axios.interceptors.request.use(config => {
  const token: string = getToken()
  // //console.log(token, "axios");
  // const a = '5207D6A2EB1B3145B49479C066D98C54';
  // const token: string = JSON.parse(JSON.stringify(a));
  const lang: string = getLang()
  // 判断是否是下载

  if (token) {
    config.headers[AUTHENTICATION] = token
    // 用于账号系统
    config.headers.Authorization = token;
  }
  if (lang) config.headers['Accept-Language'] = lang
  return config
})

export default axios
