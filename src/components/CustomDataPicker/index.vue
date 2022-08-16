<template>
  <div>
    <template v-if="hasDisableDate">
      <el-date-picker v-bind="$attrs" v-model="val" :disabledDate="disabledDate" @calendar-change="handleChange"
        @focus="handleFocus">
        <template v-for="(index, name) in slots" :key="index + 'g'" #[name]>
          <slot :name="name"></slot>
        </template>
      </el-date-picker>
    </template>
    <template v-else>
      <el-date-picker v-bind="$attrs" v-model="val">
        <template v-for="(index, name) in slots" :key="index + 'g'" #[name]>
          <slot :name="name"></slot>
        </template>
      </el-date-picker>
    </template>
  </div>
</template>

<script setup lang="ts" name="DatePicker">
import { ref, reactive, unref, computed, Ref, useSlots, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<string | number | Date> | string>,
  },
  // 间隔的天数
  spacingTime: {
    type: Number,
    default: 7
  },
  hasDisableDate: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:modelValue'])
const slots = useSlots()

const pickTime = ref()
const val = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})



function disabledDate(time: any) {
  if (!unref(pickTime)) {
    return false
  }
  // 7天的时间戳
  const one = props.spacingTime * 24 * 3600 * 1000
  const con1 = new Date(unref(pickTime)).getTime() - one
  const con2 = new Date(unref(pickTime)).getTime() + one
  return time < con1 || time > con2
}
function handleChange(val: Date[]) {
  const [firstTime] = val
  pickTime.value = firstTime
}
function handleFocus() {
  pickTime.value = null
}
</script>