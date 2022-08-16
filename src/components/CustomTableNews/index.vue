<template>
  <div class="w-full h-full">
    <el-table :data="tableDate" style="width: 100%" height="100%" v-bind="$attrs">
      <TableColumn :column="column">
        <template v-for="(index, item) in slots" :key="index + 'key'" #[item]="{ row }">
          <slot :name="item" :row="row"></slot>
        </template>
      </TableColumn>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="Table">
import { PropType, Ref, useSlots } from 'vue'
import { useModelVal } from '@/lib/vue-use'
import TableColumn from '@/components/CustomTableColumn/index.vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>
  },
  column: {
    type: Array as PropType<any[]>
  }
})
const emits = defineEmits(['update:modelValue'])
const tableDate: Ref<typeof props.modelValue> = useModelVal(props, emits)

const slots = useSlots()
</script>