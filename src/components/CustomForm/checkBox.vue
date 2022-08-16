<template>
  <el-checkbox-group v-model="checkList" v-bind="$attrs" @change="handlerChange">
    <el-checkbox class="my-10" v-for="(item, index) in values" :key="index" :label="item.value">{{ item.text }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'MyChckBox',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      defualt: () => [],
    },
  },
  emits: ['update:modelValue', 'checkBox', 'cheboxChange'],
  setup(props, { emit, attrs }) {
    const { values, modelValue }: any = toRefs(props)
    const state = reactive({
      checkList: modelValue.value,
    })

    function handlerChange(val: any) {
      emit('update:modelValue', val)
      state.checkList = val
      emit('cheboxChange', attrs.name)
    }
    watch(
      () => state.checkList,
      () => {
        emit('checkBox')
      }
    )
    return {
      modelValue,
      values,
      ...toRefs(state),
      handlerChange,
    }
  },
})
</script>