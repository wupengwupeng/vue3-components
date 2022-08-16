import { createApp, Directive } from 'vue'
import App from './App.vue'

import { store, key } from './store'

import router from './router'
// 国际化
import i18n from './locales/index'
import element from 'element-plus'
import './scss/app.scss'
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
// TODO
import 'virtual:svg-icons-register'

import AppSvgIcon from './components/app/AppSvgIcon.vue'

import vue3WpComponents from 'vue3-wp-components'
// import * as directives from './directives/index'

const app = createApp(App);
app.use(i18n).use(element, {
  i18n: (k: string, v: string) => i18n.global.t(k, v),
}).use(store, key).use(router).use(vue3WpComponents)
  .mount('#app')
// 自定义指令
// Object.keys(directives).forEach(key => {
//   app.directive(key, (directives as { [key: string]: Directive })[key])
// })
app.component(AppSvgIcon.name, AppSvgIcon)

