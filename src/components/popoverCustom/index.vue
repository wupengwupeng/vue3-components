<template>
  <div class="flex">
    <template v-if="!isShowMenu">
      <el-popover popper-class="tag-popper" v-bind="$attrs" :visible="visible" ref="properRef">
        <template #reference>
          <slot name="header">插槽header</slot>
        </template>
        <div :class="classContent" ref="target">
          <slot>default</slot>
        </div>
      </el-popover>
    </template>
    <!-- 右键功能 -->
    <template v-else>
      <el-popover popper-class="tag-popper" v-bind="$attrs" ref="properRef">
        <template #reference>
          <slot name="header">插槽header</slot>
        </template>
        <div :class="classContent" ref="target">
          <slot>default</slot>
        </div>
      </el-popover>
    </template>
  </div>
</template>

<script setup lang="ts" name="PopoverCustom">
// 此popover使用的是outsideclick解决点击内部进行关闭，点击外部也可以进行关闭的问题。
import { ref, Ref, onMounted, useSlots, useAttrs, toRefs, unref } from 'vue'
import { defaultProps } from './props'
import { onClickOutside } from '@vueuse/core'
const props = defineProps(defaultProps)
const emits = defineEmits(['update:visible', 'childRef'])
const { visible } = toRefs(props)
const target: Ref<null> = ref(null)
const properRef = ref(null)
onClickOutside(target, (event) => emits('update:visible', false))

const getRef = () => {
  emits('childRef', unref(properRef))
}
defineExpose({
  proper: getRef
})
onMounted(() => {

})

</script>


<style lang="scss">
.tag-popper {
  padding: 0px !important;
}
</style>