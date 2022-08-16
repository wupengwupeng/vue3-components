import { App, Directive } from 'vue'
import AppSvgIcon from './app/AppSvgIcon.vue'
import Page from './Page/index.vue'
import EllipsisBox from './ellipsisBox/index.vue'
import Dialog from './Dialog/index.vue'
import Table from './CustomTableNews/index.vue'
import NumberInput from './CustomOnlyNumber/index.vue'
import CustomDragableDialog from './CustomDragableDialog/index.vue'
import DatePicker from './CustomDataPicker/index.vue'
import CustomSelect from './CustomSelect/index.vue'
import InputNumber from './InputNumber/index.vue'
import Button from './button/index.vue'
import * as directives from '@/directives/index'

export type DirectiveType = { [key: string]: Directive }

const components = [
  AppSvgIcon,
  Page,
  EllipsisBox,
  Dialog,
  Table,
  NumberInput,
  CustomDragableDialog,
  DatePicker,
  CustomSelect,
  InputNumber,
  Button
]
const install: any = function (app: App) {
  if (install.installed) return
  install.installed = true
  components.forEach(res => {
    app.component(res.name, res)
  })
  Object.keys(directives).forEach(res => {
    app.directive(res, (directives as DirectiveType)[res])
  })
}

export default {
  install
}

