// 当前用户配置
export interface UserConfig {
  key: string
  value: any
}
export interface RootState {
  theme: string // 主题
  lang: string // 语言
  token: string
  user: App.LoginUser
  configs: UserConfig[]
}
export enum RootGetters {
  GET_USER_CONFIG_BY_KEY = 'GET_USER_CONFIG_BY_KEY',
}
export enum RootMutations {
  SET_THEME = 'SET_THEME',
  SET_LANG = 'SET_LANG',
  SET_TOKEN = 'SET_TOKEN',
  SET_USER = 'SET_USER',
  SET_CONFIGS = 'SET_CONFIGS',
  SET_CONFIG = 'SET_CONFIG',
  RESET = 'RESET',
}


