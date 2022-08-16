// 限制输入表情的指令
import { Directive } from 'vue'
import inputFilter from './filter'
// 派发自定义事件
const trigger = (el: HTMLElement, type: string) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

export const emoji: Directive = {
  mounted(el: any) {
    el.$handler = (el: HTMLElement) => {
      const regRule = /[^\a-\z\A-\Z0-9\u4e00-\u9fa5\？\#]/;
      // el.value = val.replace(regRule, '');
      inputFilter.replaceAndSetPos(el, regRule, '');
      trigger(el, 'input'); // 派发自定义事件, 防止出现视图更新数据没有数据的情况
    }
    el.$handler(el);
  },
  updated(el) {
    el.$handler && el.$handler(el);
  },

}