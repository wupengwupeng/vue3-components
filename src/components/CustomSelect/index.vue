<template>
  <el-select v-bind="$attrs" v-model="val" ref="selectRef">
    <el-option v-for="(item, index) in options" :key="index + 'gs'" :label="item.label" :value="item.value">
      <slot v-if="slots.option" name="option" :item="item">default</slot>
    </el-option>
  </el-select>
</template>

<script setup lang="ts" name="CustomSelect">
import { ref, PropType, computed, useSlots, useAttrs, watch, Ref, defineExpose } from 'vue'
import { ElSelect } from 'element-plus'
type OptionRaw = Array<{
  value: string
  label: string
  disabled?: boolean
}>
const props = defineProps({
  modelValue: {
    type: String as PropType<any>,
    default: '',
  },
  options: {
    type: Array as PropType<OptionRaw>,
    default: () => [{
      value: 'zhangan',
      label: 'shangsan'
    }]
  },
})
const emits = defineEmits(['update:modelValue'])
const slots = useSlots()
const selectRef: Ref<InstanceType<typeof ElSelect> | null> = ref(null)
const val = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})

defineExpose({
  selectRef,
})
</script>