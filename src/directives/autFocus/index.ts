import { Directive, nextTick, ref } from 'vue'

export const focus: Directive = {
  mounted: (el: HTMLElement) => {
    const inputList = el.getElementsByTagName("input")
    Object.keys(inputList).forEach((res: any) => {
      inputList[res].focus()
    })
  },
  unmounted() {

  }
}