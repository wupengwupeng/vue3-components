<template>
  <div class="h-full w-full">
    <el-table class="content-table" :data="tableDate" style="width: 100%" :row-class-name="rowClassName"
      :cell-class-name="cellClassName" v-bind="tableProps" @cell-click="handlerCellClick">
      <el-table-column v-for="(item, index) in componentArr" :key="item.id + 'gg'" v-bind="item.columnProps"
        :prop="item.name" :label="item.titleName">
        <template #default="{ row }">
          <!-- select的情况防止和时间组件的事件冲突 -->
          <template v-if="item.type === 'select'">
            <CustomForm v-if="row[item.name] && row[item.name]?.isShow" :ref="(el: HTMLElement) => sexRef[index] = el"
              v-bind="item.props" :componentId="getTypeComponets(item.type)" v-focus
              @visible-change="flag => visibleChange(flag, row, index, item.name)" filterable @change="handlerChange"
              v-model="row[item.name]!.value" />
            <span v-else>{{ row[item.name] && getSelectRenderLabel(row[item.name]!.value, item.props)
            }}</span>
          </template>
          <!-- range组件 -->
          <template v-else-if="item.type === 'range'">
            <CustomForm v-if="row[item.name] && row[item.name]?.isShow" v-bind="item.props"
              :componentId="getTypeComponets(item.type)" @change="(val) => handlerRange(val, row, item.name)"
              v-model="row[item.name]!.value" />
            <span v-else>{{ row[item.name] && row[item.name]!.value }}</span>
          </template>
          <!-- 其他组件 text or number...-->
          <template v-else>
            <CustomForm v-if="row[item.name] && row[item.name]?.isShow" v-focus v-bind="item.props"
              :componentId="getTypeComponets(item.type)" @blur="row[item.name]!.isShow = false"
              v-model="row[item.name]!.value" />
            <span v-else>{{ row[item.name] && row[item.name]!.value }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="60" fixed="right">
        <template #default="scoped">
          <div class="flex justify-center items-center">
            <el-button size="mini" @click="handlerDelete(scoped.row, scoped.$index)">
              <AppSvgIcon iconName="icon-delete"></AppSvgIcon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="w-full" size="mini" @click="handlerAdd">添加</el-button>
  </div>
</template>

<script setup lang="ts" name="CustomTable">
import CustomForm from '@/components/CustomForm/index.vue'
import { ref, unref, Ref, nextTick, computed, PropType, } from 'vue';
import { getTypeComponets } from '@/lib/utils'
type Obj = {
  [key: string]: any
}
type Options = {
  value: string | number
  label: string
  disabled?: boolean

}
const emits = defineEmits(['update:modelValue', 'changeFormValid'])
const props = defineProps({
  modelValue: {
    type: Array as PropType<any>,
    default: () => []
  },
  tableProps: {
    type: Object,
    default: () => { }
  },
  componentArr: {
    type: Array as PropType<any>,
    default: () => []
  }
})
const sexRef: Ref<any> = ref([])
const targetElement: Ref<HTMLElement | null> = ref(null)
const tableDate = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})

const handlerCellClick = (row: any, column: any, cell: HTMLElement, event: Event) => {
  targetElement.value = cell
  if (!row[column.property]) return
  row[column.property]!.isShow = true
}
const visibleChange = (flag: boolean, row: any, index: number, name: string) => {
  if (!flag) {
    row[name].isShow = false
  }
}
const handlerChange = () => {
  emits('changeFormValid')
}

const handlerRange = (val: any, row: any, name: string) => {
  row[name].isShow = false
}
const handlerAdd = () => {
  let obj: any = {}
  const arr = props.componentArr.map((res: Obj) => res.name)
  arr.forEach((item: string) => {
    obj[item] = {
      value: '',
      isShow: false
    }
  });
  tableDate.value.push(obj)
  emits('changeFormValid')
}
const handlerDelete = (row: any, index: number) => {
  tableDate.value.splice(index, 1)
  emits('changeFormValid')
}
const cellClassName = ({ row, column, rowIndex, columnIndex }: Obj) => {
  if (column.property) {
    return 'cell-class-name'
  }
}
const rowClassName = ({ row, column, rowIndex, columnIndex }: Obj) => {
  if ((rowIndex + 1) % 2 == 0) {
    return 'row-class-name'
  }
}

// 获取下拉框选中一个label显示对应的值
const getSelectRenderLabel = (val: any, props: any) => {
  if (!val || !props.options.length) return ''
  if (props?.multiple) {
    const data = props.options.filter((res: Options) => val.includes(res.value))
    return data.map((res: Options) => res.label).join(',')
  }
  return props.options.find((res: Options) => res.value == val)?.label
}
</script>

<style lang="scss">
.content-table {
  .row-class-name {
    background-color: #fafafa;
  }

  .row-class-name:hover {
    background-color: #fafafa;
  }

  .cell-class-name:hover {
    background-image: url('../../assets/img/icon-edit-hover.png');
    background-repeat: no-repeat;
    background-position: top 2px right 3px;
  }
}
</style>