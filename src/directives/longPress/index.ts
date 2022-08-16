// 长按指令 鼠标右键长按事件

import { Directive } from 'vue'
export const longPress: Directive = {
  beforeMount(el, binding) {
    const cb = binding.value;
    if (typeof cb !== 'function') return console.warn('v-longpress指令必须接收一个回调函数');
    let timer: any = null;
    // 重置计时器
    const cancel = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    }

    el.addEventListener('mousedown', (e: any) => {
      // 排除点击与右键情况, event.button: 0-左键  2-右键
      if (e.type === 'click' && e.button !== 0) return;
      e.preventDefault();
      if (timer === null) {
        timer = setTimeout(() => {
          cb();
          timer = null;
        }, 2000)
      }
    });

    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    // or - 长按后移出元素外是否还有效
    // el.addEventListener('mouseup', cancel);
  },
  unmounted(el) {
    el.removeEventListener('mousedown', () => { });
    el.removeEventListener('click', () => { });
    el.removeEventListener('mouseout', () => { });
  }
}


// 具体使用

/*

<template>
  <button v-longpress="longpress">按钮</button>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      longpress() {
        console.log('长按事件')
      }
    }
  }
});
</script>
*/
