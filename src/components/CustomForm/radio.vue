<template>
  <el-radio-group v-model="radio" v-bind="$attrs" @change="handlerChange">
    <el-radio class="my-10" v-for="(item, index) in values" :key="index" :label="item.value">{{ item.text }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, watch, computed, unref } from 'vue';
export default defineComponent({
  name: 'MyRadio',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'radioChange'],
  setup(props, { emit, attrs }) {
    const { values, modelValue }: any = toRefs(props)
    const radio = computed({
      get() {
        return unref(modelValue)
      },
      set(val) {
        emit('update:modelValue', val)
      }
    })
    const state = reactive({})
    function handlerChange(val: number) {
      emit('radioChange', attrs.name)
    }
    return {
      values,
      modelValue,
      radio,
      ...toRefs(state),
      handlerChange,
    }
  },
})
</script>