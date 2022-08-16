<template>
  <div>
    <TemplateDown keys="jj" title="选择导出方式" :visible="visible" :confirm-text="'导出'" @close="handlerClose"
      @handler-save="handlerSave">
      <el-form :model="ruleForm" :label-position="'top'" :rules="state.rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板管理:">
              <span class="text-blue-300 hover:cursor-pointer" @click="handlerMangerTemplate">模板管理</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板类型:" prop="templateType">
              <CustomSelect size="small" :options="options" v-model="ruleForm.templateType"></CustomSelect>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="`请输入导出数据的${showTempalteName}序号:`" prop="tableData">
              <el-table :data="ruleForm.tableData" style="width: 100%" max-height="250" @cell-click="handlerCellClick">
                <el-table-column prop="name" label="Name">
                  <template #default="{ row, $index }">
                    <el-input v-if="row.name.isShow" :ref="(el: HTMLElement) => numberRef[$index] = el" size="small"
                      v-onlyNumber v-focus placeholder="请输入循环层号" v-model="row.name.value"
                      @blur="row.name.isShow = false"></el-input>
                    <span v-else>{{ row.name.value }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="100">
                  <template #default="{ row, $index }">
                    <div class="flex justify-between">
                      <span class="text-blue-300 hover:cursor-pointer" @click="handlerClickAdd(row, $index)">添加</span>
                      <span class="text-blue-300 hover:cursor-pointer" @click="handlerClickMenu(row, $index)">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </TemplateDown>
    <TemplateManger keys="gg" v-if="visibleManger" v-model:visible="visibleManger" @handlerSaveDate="handlerSaveDate">
    </TemplateManger>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, Ref, computed } from 'vue';

import TemplateDown from '@/components/Dialog/index.vue'
import CustomSelect from '@/components/CustomSelect/index.vue'
import TemplateManger from './templateManger.vue'
import type { Key, Obj, TableRecordRow } from './index.type'

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const validatorCheck = (rule: any, value: any, callback: any) => {
  const reg = /(^\,+[\d*\,*]*)|([\d*\,*]*\,+$)|(\d+\,{2,})/g
  const isEmportyOrFlag = value.some((res: any) => {
    return !res.name.value || reg.test(res.name.value)
  })
  if (isEmportyOrFlag) {
    callback(new Error('您有未填的数据或您输入的格式不正确,正确格式为: 23,23,23,23,2,3'))
  } else {
    callback()
  }
}
const numberRef: Ref<any[]> = ref([])
const ruleForm = reactive({
  templateType: '1',
  tableData: [
    {
      name: {
        value: '',
        isShow: false
      }
    },
    {
      name: {
        value: '',
        isShow: false
      }
    },
  ],
})
const state = reactive({
  rules: {
    tableData: [
      { required: true, validator: validatorCheck, trigger: ['change', 'blur'] }
    ]
  }
})
const visibleManger: Ref<boolean> = ref(false)

const options = [
  {
    value: '1',
    label: '循环层序号'
  },
  {
    value: '2',
    label: '工步层序号'
  }
]

const showTempalteName = computed(() => {
  const obj: Record<Key, string> = {
    "1": '循环层',
    "2": '工步层'
  }
  return obj[ruleForm.templateType as keyof typeof obj]
})


const handlerClose = () => {
  emits("update:visible", false)
}

const handlerSave = () => {
  console.log(12)
}

// 添加
const handlerClickAdd = (row: any, index: number) => {
  const obj = {
    name: {
      value: '',
      isShow: false
    }
  }
  ruleForm.tableData.splice((index + 1), 0, obj)
}
// 删除
const handlerClickMenu = (row: any, index: number) => {
  console.log(2)
  if (ruleForm.tableData.length === 1) return
  ruleForm.tableData.splice(index, 1)
}

const handlerCellClick = async (row: any, column: any, cell: HTMLElement, event: Event) => {
  if (!row[column.property]) return
  row[column.property]!.isShow = true
}
const handlerMangerTemplate = () => {
  visibleManger.value = true
}

const handlerSaveDate = (data: TableRecordRow[]) => {
  console.log(data, 444)
}

</script>