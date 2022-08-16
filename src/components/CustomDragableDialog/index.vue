<template>
  <div v-draggable:[contentId] :class="defaultClass" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="CustomDragableDialog">
const props = defineProps({
  contentId: {
    type: String,
    default: ''
  },
  defaultClass: {
    type: String,
    default: 'w-100 h-30'
  }
})

</script>