<template>
  <div class="w-full h-auto">
    <input v-if="typeComponent === 'text'" v-model="val" type="text" v-numberInput:customize="val"
      data-rule="/[^\d\,]/g" :class="inputClass" v-bind="$attrs">
    <textarea v-if="typeComponent === 'textarea'" v-model="val" :class="inputClass" v-numberInput:customize="val"
      data-rule="/[^\d\,]/g" v-bind="$attrs"></textarea>
  </div>
</template>

<script setup lang="ts" name="CustomOnlyNumber">
import { computed, } from 'vue'

const props = defineProps({
  modelValue: {
    type: String as any,
    default: ''
  },
  arg: {
    type: Object as any,
    default: () => { }
  },
  typeComponent: {
    type: String,
    default: 'text'
  }
})
const emits = defineEmits(["update:modelValue"])
const inputClass = computed(() => {
  return 'input-class border w-full h-32 rounded px-12 '
})
const val = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits("update:modelValue", v)
  }
})
</script>

<style lang="scss">
.input-class:focus {
  border-color: var(--primary);
}
</style>