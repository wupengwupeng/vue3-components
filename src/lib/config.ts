
export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string // 数据分析地址
export const BASE_URL_API: string = import.meta.env.VITE_BASE_URL_API as string// 数据分析接口地址
export const BASE_URL_LIMS_IMG: string = import.meta.env.VITE_BASE_URL_LIMS_IMG as string // LIMS图片地址
export const BASE_URL_ACCOUNT_SYSTEM: string = import.meta.env.VITE_BASE_URL_ACCOUNT_SYSTEM as string // 账号系统地址
export const BASE_URL_ACCOUNT_SYSTEM_API: string = import.meta.env.VITE_BASE_URL_ACCOUNT_SYSTEM_API as string // 账号系统接口地址


let baseUrl = import.meta.env.VITE_NEW_EXPORT_API as string

// 全局变量 config
export const BASE_URL_REPOSTORYTwo: string = baseUrl

export const VITE_NEW_EXPORT_API: string = baseUrl


export const AXIOS_TIMEOUT: number = 60 * 1000 // Axios超时限制(specifies the number of milliseconds before the request times out)
export const AUTHENTICATION = 'Token' // Request Headers TokenKey
export const MAX_PAGE_SIZE: number = 2 ** 31 - 1 // 分页获取数据接口传这 个值获取所有数据

export const ELEMENT_THEME_LINK_ID = 'element-theme' // 引入element-ui的<link>标签ID

// 所有主题
export const THEMES: App.Theme[] = [
  {
    name: '活力黄',
    class: 'vitality-yellow',
    color: '#ffbf01',
  },
  {
    name: '钴蓝',
    class: 'cobalt-blue',
    color: '#2962ff',
  },
  {
    name: '玉髓绿',
    class: 'chalcedony-green',
    color: '#37b057',
  },
  {
    name: '琥珀色',
    class: 'amber',
    color: '#ff9100',
  },
  {
    name: '靛蓝',
    class: 'indigo',
    color: '#00a8f0',
  },
  {
    name: '钢蓝',
    class: 'slate-blue',
    color: '#3781b8',
  },
  {
    name: '紫色',
    class: 'purple',
    color: '#AB4BF5',
  }

]
export const isThemeExist = (theme: string): boolean => THEMES.map(theme => theme.class).includes(theme)
export const getDefaultTheme = () => THEMES[6].class

// 所有语言
export const LANGUAGES = [
  {
    lang: 'zh-CN',
    name: '简体中文',
  },
  {
    lang: 'zh-TW',
    name: '繁體中文',
  },
  {
    lang: 'en',
    name: 'English',
  },
]
