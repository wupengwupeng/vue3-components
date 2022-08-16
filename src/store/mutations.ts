import { isThemeExist } from '@/lib/config'
import { removeToken, removeUser, setLang, setTheme, setToken, setUser } from '@/lib/storage'
import type { MutationTree } from 'vuex'
import { changeTheme } from '.'
import type { RootState, UserConfig } from './type'
import { RootMutations } from './type'

async function saveLoginUserConfig(configs: UserConfig[]) {

}

const mutations: MutationTree<RootState> = {
  [RootMutations.SET_THEME](state, theme: string) {
    if (isThemeExist(theme)) {
      state.theme = theme
      setTheme(theme)
      changeTheme(theme)
    }
  },
  [RootMutations.SET_LANG](state, lang: string) {
    state.lang = lang
    setLang(lang)
  },
  [RootMutations.SET_TOKEN](state, token: string) {
    state.token = token
    setToken(token)
  },
  [RootMutations.SET_USER](state: RootState, user: App.LoginUser) {
    state.user = user
    setUser(user)
  },
  [RootMutations.SET_CONFIGS]: (state, configs: UserConfig[]) => {
    state.configs = configs
  },
  [RootMutations.SET_CONFIG]: (state, config: UserConfig) => {
    const findedConfig = state.configs.find(i => i.key === config.key)
    if (findedConfig) {
      findedConfig.value = config.value
    } else {
      state.configs.push(config)
    }
    saveLoginUserConfig(state.configs)
  },
  [RootMutations.RESET](state: RootState) {
    state.token = ''
    removeToken()
    removeUser()
  },
}

export default mutations
