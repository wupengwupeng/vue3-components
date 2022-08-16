import storage from 'store'

const TOKEN = 'TOKEN'
const USER = 'USER'
const LANG = 'LANG'
const THEME = 'THEME'
const MENUACTIVE = 'MENUACTIVE'

// const BATTERY_TESTS_SELECTED = 'BATTERY_TESTS_SELECTED'

export const getLang = (): string => storage.get(LANG, '')
export const setLang = (lang: string) => storage.set(LANG, lang)

export const getTheme = (): string => storage.get(THEME, '')
export const setTheme = (theme: string) => storage.set(THEME, theme)

export const getToken = (): string => storage.get(TOKEN, '')
export const setToken = (token: string) => storage.set(TOKEN, token)
export const removeToken = () => storage.remove(TOKEN)

export const getUser = (): App.LoginUser => storage.get(USER)
export const setUser = (user: App.LoginUser) => storage.set(USER, user)
export const removeUser = () => storage.remove(USER)

export const getActiveMenu = (): string => storage.get(MENUACTIVE)
export const setActiveMenu = (str: string) => storage.set(MENUACTIVE, str)
export const removeActiveMenu = () => storage.remove(MENUACTIVE)

// export const setBatteryTestsSelected = (batteryTests: App.BatteryTest[]) => storage.set(BATTERY_TESTS_SELECTED, batteryTests)
// export const getBatteryTestsSelected = (): App.BatteryTest[] => {
//   const batteryTests: App.BatteryTest[] = storage.get(BATTERY_TESTS_SELECTED, [])
//   return batteryTests
// }
// export const getBatteryTestsSelectedIds = (): App.BatteryTestIds[] => {
//   const batteryTests: App.BatteryTest[] = getBatteryTestsSelected()
//   return batteryTests.map(batteryTest => {
//     return {
//       data_id: batteryTest.data_id,
//       id: batteryTest.id,
//       bar_id: batteryTest.bar_id,
//       ed_id: batteryTest.ed_id,
//       srv_id: batteryTest.srv_id,
//     }
//   })
// }
// export const removeBatteryTestsSelected = () => storage.remove(BATTERY_TESTS_SELECTED)
