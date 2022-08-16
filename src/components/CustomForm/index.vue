<template>
  <component :is="componentId" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MyRadio from './radio.vue'
import MyChckBox from './checkBox.vue'
import CustomSelect from '@/components/CustomSelect/index.vue'
export default defineComponent({
  name: 'IsComponents',
  components: {
    'my-radio': MyRadio,
    'my-checkbox': MyChckBox,
    'my-select': CustomSelect,
  },
  props: {
    componentId: {
      type: String as PropType<any>,
      default: '',
    },
  },
  setup() {
    return {
    }
  },
})
</script>