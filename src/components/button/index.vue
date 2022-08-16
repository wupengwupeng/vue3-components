<template>
  <div class="button-style" :class="buttonClass" @click="handlerClickButton">
    <AppSvgIcon class="w-20 h-20 translate-y-2" :iconName="iconName" />
    <span class="ml-5">{{ title }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Button',
  props: {
    iconName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    buttonClass: {
      type: String,
      default: 'hover:bg-red-100',
    },
  },
  emits: ['clickButton'],
  setup(props, { emit }) {
    function handlerClickButton() {
      emit('clickButton')
    }
    return {
      handlerClickButton,
    }
  },
})
</script>

<style lang="scss" scoped>
.button-style {
  min-width: 60px;
  height: 28;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;

  &:hover {
    cursor: pointer;
    background-color: rgb(233, 81, 81);

  }
}
</style>