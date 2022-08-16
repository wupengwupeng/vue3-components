<template>
  <div>
    <el-dialog title="模板管理" :append-to-body="true" v-model="visible" @close="handlerClose">
      <el-form ref="ruleFormRef" :model="ruleForm" :label-position="'top'" :rules="state.rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="新增模板:">
              <el-button size="mini" @click="handlerAddTemplate">新增模板</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="删除模板:">
              <el-button :disabled="!state.multipleSelection.length" size="mini" @click="handlerDelete">删除模板</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="编辑模板 (请单击编辑)" prop="tableDate">
              <el-table :data="ruleForm.tableDate" border style="width: 100%" max-height="250"
                @cell-click="handlerCellClick" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="templateType" label="模板类型">
                  <template #default="{ row, $index }">
                    <CustomSelect v-if="row.templateType.isShow"
                      :ref="(el: HTMLElement) => templateRefSelect[$index] = el" size="mini" :options="options"
                      v-model="row.templateType.value" @visible-change="(flag: boolean) => visibleChange(flag, row)"
                      filterable @change="handlerChange" />
                    <span v-else>{{ row.templateType.value === '1' ? "循环层序号" : "工步层序号" }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="name" label="模板名称">
                  <template #default="{ row }">
                    <el-input v-if="row.name.isShow" maxLength="30" size="mini" v-focus placeholder="请输入模板名称"
                      v-model="row.name.value" @blur="row.name.isShow = false"></el-input>
                    <span v-else>{{ row.name.value }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="sequence" label="序号">
                  <template #default="{ row }">
                    <el-input v-if="row.sequence.isShow" size="mini" v-onlyNumber:[arg] v-focus
                      :placeholder="`请输入${row.templateType === '1' ? '循环' : '工步'}号`" v-model="row.sequence.value"
                      @blur="row.sequence.isShow = false"></el-input>
                    <span v-else>{{ row.sequence.value }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button size="mini" @click="handlerClose">取消</el-button>
        <el-button type="primary" :disabled="isConfirmDisabled" size="mini" @click="handlerSave">填充</el-button>
      </template>
    </el-dialog>

    <TemplateCreate v-if="visibleCreate" v-model:visible-create="visibleCreate"></TemplateCreate>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, nextTick, toRaw, unref, computed, provide } from 'vue';
import CustomSelect from '@/components/CustomSelect/index.vue'
import TemplateCreate from './templateCreate.vue'
import { stringifyJson, guid } from '@/lib/utils'
import type { RuleForm, State, TableRecordRow } from './index.type'


const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(["update:visible", "handlerSaveDate"])
const validatorCheck = (rule: any, value: TableRecordRow[], callback: any) => {
  const reg = /(^\,+[\d*\,*]*)|([\d*\,*]*\,+$)|(\d+\,{2,})/g
  const isEmportyOrFlag = value.some((res: any) => {
    return !res.sequence.value || reg.test(res.sequence.value)
  })
  if (isEmportyOrFlag) {
    callback(new Error('您有未填的序号数据或您输入的序号格式不正确,正确格式为: 23,23,23,23,2,3'))
  } else {
    callback()
  }
}

const templateRefSelect: Ref<any[]> = ref([])
const ruleFormRef: Ref<any> = ref(null)

const visibleCreate: Ref<boolean> = ref(false)

const ruleForm: RuleForm = reactive({
  tableDate: [
    {
      id: guid(),
      templateType: {
        value: '1',
        isShow: false
      },
      name: {
        value: '',
        isShow: false
      },
      sequence: {
        value: '',
        isShow: false
      }
    },
    {
      id: guid(),
      templateType: {
        value: '1',
        isShow: false
      },
      name: {
        value: '',
        isShow: false
      },
      sequence: {
        value: '',
        isShow: false
      }
    },
  ]
})
const state: State = reactive({
  rules: {
    tableDate: [
      { required: true, validator: validatorCheck, trigger: ['change', 'blur'] }
    ]
  },
  multipleSelection: []
})

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
const arg = stringifyJson({
  reg: /[^\d\,]/g
})

const isConfirmDisabled = computed(() => {
  return state.multipleSelection.length === 0 || state.multipleSelection.length > 1
})

const handlerClose = () => {
  emits('update:visible', false)
}

const handlerSave = () => {
  ruleFormRef.value.validate((valid: boolean) => {
    if (valid) {
      emits("handlerSaveDate", state.multipleSelection)
      handlerClose()
    } else {
      return false
    }
  })
}

const handlerCellClick = (row: any, column: any, cell: HTMLElement, event: Event) => {
  if (!row[column.property]) return
  row[column.property]!.isShow = true
  nextTick(() => {
    templateRefSelect.value.filter(Boolean).length && templateRefSelect.value.filter(Boolean)[0].selectRef.$el.children[0].children[0].children[0].focus()
  })
}
const visibleChange = (flag: boolean, row: TableRecordRow) => {
  if (flag) {
    nextTick(() => {
      templateRefSelect.value.filter(Boolean)[0]?.selectRef.$el.children[0].children[0].children[0].focus()
    })
  } else {
    row.templateType.isShow = false
  }
}
const handlerChange = () => {
  console.log('验证表单')
}

const handlerAddTemplate = () => {
  visibleCreate.value = true
  return
  const obj = {
    id: guid(),
    templateType: {
      value: '1',
      isShow: false
    },
    name: {
      value: '',
      isShow: false
    },
    sequence: {
      value: '',
      isShow: false
    }
  }
  ruleForm.tableDate.unshift(obj)
}
const handleSelectionChange = (val: TableRecordRow[]) => {
  state.multipleSelection = val
}
const handlerDelete = () => {
  ruleForm.tableDate = ruleForm.tableDate.filter(res => !state.multipleSelection.some(item => item.id === res.id))
}
</script>
