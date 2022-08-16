<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
type Obj = {
  [key: string]: any
}
const props = defineProps({
  data: {
    type: Object as PropType<Obj>
  }
})
</script>