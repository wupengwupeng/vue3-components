
import { Directive, reactive, ref } from 'vue'

const ownPermission = ref(['user', 'order']);
function toolPermission(el: HTMLElement, permission: any) {
  // 简单的数据类型
  if (permission && !ownPermission.value.includes(permission)) {
    el.parentNode && el.parentNode.removeChild(el); // 关键代码, 没有权限则删除元素
  }
}
export const permission: Directive = {
  mounted(el, binding) {
    toolPermission(el, binding.value)
  },
  updated(el, binding) {
    toolPermission(el, binding.value)
  }
}