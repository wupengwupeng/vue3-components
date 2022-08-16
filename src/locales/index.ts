import { getLang, setLang } from '@/lib/storage'
import { createI18n } from 'vue-i18n'
import en from './global/en'
import zhCN from './global/zh-CN'

const messages = {
  en,
  'zh-CN': zhCN,
}

// const DEFAULT_LOCALE = 'zh-CN'


// 默认为英文
const DEFAULT_LOCALE = 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE, // 设置语言环境
  fallbackLocale: DEFAULT_LOCALE,
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  globalInjection: true,
  messages, // 设置语言环境信息
})

const loadedLanguages: string[] = ['zh-CN', 'en'] // 我们的预装默认语言

function setI18nLanguage(lang: string): string {
  setLang(lang)
  i18n.global.locale.value = lang
  document.documentElement.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<string> {
  if (i18n.global.locale.value !== lang) {
    if (!loadedLanguages.includes(lang)) {
      const msgs = await import(`./global/${lang}.ts`)
      i18n.global.setLocaleMessage(lang, msgs.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
    return setI18nLanguage(lang)
  }
  return lang
}

export const defaultLang: string = getLang() || DEFAULT_LOCALE
loadLanguageAsync(defaultLang)

export default i18n
