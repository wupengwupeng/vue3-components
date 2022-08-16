import { ELEMENT_THEME_LINK_ID, getDefaultTheme, isThemeExist } from '@/lib/config'
import { getLang, getTheme, getToken, getUser } from '@/lib/storage'
import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import { RootState } from './type'

import { RootStates } from './modulesType'
import { test } from '@/store/modules/test/index'

// 修改主题
export function changeTheme(theme: string) {
  document.documentElement.dataset.theme = theme
  const link = document.getElementById(ELEMENT_THEME_LINK_ID) as HTMLLinkElement
  if (link) link.href = `../css/element-theme/${theme}/index.css`
}

// 初始化主题
let theme: string = getTheme() // 可能为空字符串或不在已有主题里面
if (!isThemeExist(theme)) theme = getDefaultTheme()
changeTheme(theme)

export function getDefaultRootState() {
  const state: RootState = {
    theme,
    lang: getLang(),
    token: getToken(),
    user: getUser() || {},
    configs: [],
  }
  return state
}
const state = getDefaultRootState()
export const key: InjectionKey<Store<RootState>> = Symbol()
export const store = createStore<RootState>({
  strict: true,
  state,
  getters,
  mutations,

  modules: {
    test
  }
})
export function useStore() {
  return baseUseStore(key)
}
