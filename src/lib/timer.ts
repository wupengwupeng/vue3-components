import api from '@/api'
import { login as toLoginPage } from '@/lib/redirect'
import { getToken, setToken } from '@/lib/storage'
import { store } from '@/store'
import { RootMutations } from '@/store/type'
import { AUTHENTICATION } from './config'

async function startRefreshToken() {
  const [res] = await api.user.refreshToken({
    [AUTHENTICATION]: getToken(),
  })
  if (res) {
    const token = res.data
    setToken(token)
    store.commit(RootMutations.SET_TOKEN, token)
  } else {
    //console.log('TOKEN 刷新失败跳转去登陆')
    toLoginPage()
  }
}

export default class TokenRefresher {
  timer: number | null = null
  start() {
    if (this.timer) return
    //console.log(
    '%c TOKEN 刷新器 %c 已启动 %c',
      'background: #10B981; padding: 6px 4px; color: #fff',
      'background: #10B981; padding: 6px 4px; color: #fff',
      'background: transparent'
    )
    // 先1秒钟执行一次
    // 再1分钟执行一次
    this.timer = window.setTimeout(() => {
      startRefreshToken()
      this.timer = window.setInterval(startRefreshToken, 1 * 60 * 1000)
    }, 1 * 1 * 1000)
  }
  stop() {
    if (this.timer) {
      //console.log(
      '%c TOKEN 刷新器 %c 已关闭 %c',
        'background: #ee5c5c; padding: 6px 4px; color: #ffedc5',
        'background: #333; padding: 6px 4px; color: #fff',
        'background: transparent'
      )
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
