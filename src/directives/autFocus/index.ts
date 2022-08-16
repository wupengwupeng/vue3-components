import { Directive, nextTick, ref } from 'vue'
const timer = ref()
export const focus: Directive = {
  mounted: (el) => {
    const classStr = el.getAttribute('class')
    const arr = classStr.split(' ')
    if (arr.includes('el-input-number')) {
      timer.value = setTimeout(() => {
        el?.lastChild.children[0].focus()
      }, 200)
    } else {
      timer.value = setTimeout(() => {
        el?.children[0].focus();
      }, 200)
    }
  },
  unmounted() {
    clearTimeout(timer.value)
  }
}