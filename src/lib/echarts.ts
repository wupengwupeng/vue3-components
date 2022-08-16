import walden from '@/assets/echarts-theme/walden'
import { init } from 'echarts'

export function initEChartsWithTheme(dom: HTMLElement, theme = walden) {
  return init(dom, theme)
}
