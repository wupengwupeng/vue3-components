<template>
  <div>
    <span id="test">测试{{ number }}</span>
    <el-button size="mini" @click="hanlderClick">flushTest</el-button>
    <ElipsisBox :content="'sdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'" :isMore="true">
    </ElipsisBox>
    <CustomDragableDialog>
      <div class=" bg-gray-300">悬浮拖动测试</div>
    </CustomDragableDialog>
  </div>
</template>

<script setup lang="ts">
import { watch, watchEffect, ref } from 'vue'


const number = ref(0)

const hanlderClick = () => {
  number.value++
}

watchEffect(() => {
  console.log(number.value, "no flush")
  console.log(document.querySelector("#test") && document.querySelector("#test")?.innerHTML, "innerHTML")
}, { flush: 'post' })
</script>