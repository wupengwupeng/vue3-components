<template>
  <el-table-column v-for="(item, index) in column" :key="index + 'gg'" v-bind="item">
    <template v-if="item.type && item.type === 'button'" #default="{ row }">
      <ColumnButtons :data="row">
        <template #default>
          <slot name="buttons" :row="row"></slot>
        </template>
      </ColumnButtons>
    </template>
    <template v-if="item.slot" #default="{ row }">
      <slot :name="item.slot" :row="row"></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" name="CustomTableColumn">
import ColumnButtons from '@/components/CustomTableColumnButtons/index.vue'
import { PropType } from 'vue';
const props = defineProps({
  column: {
    type: Array as PropType<any[]>,
    default: () => []
  },
})

</script>