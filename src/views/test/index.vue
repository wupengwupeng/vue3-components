<template>
  <div class="w-full h-full flex flex-col px-24 bg-white">
    <div class="h-300 w-full m-auto">
      <!-- <el-button @click="openDialog">惦记我</el-button> -->
      <!-- <CustormTable></CustormTable> -->
      <div class="w-80">
        <Button iconName="fn-search" title="按钮"></Button>
      </div>

      <!-- <TestFlush>
      </TestFlush> -->
      <!-- <el-button size="mini" @click="handlerClick">flushTest</el-button> -->
    </div>
    <!-- <div class="h-100 bg-gray-300 inline-flex">
      <div class="font-inter text-10 antialiased">
        <el-button @click="handlerOpenDialog">{{ t('点击我') }}</el-button>
        <el-button @click="handlerInternationalization">{{ t('国际化') }}|| {{ t('中文') }}</el-button>
        <el-button @click="handlerInternationalizationEN">{{ t('国际化') }}|| {{ t('英文') }}</el-button>
      </div>
    </div>
    <div class="h-300 bg-red-400 overflow-y-auto antialiased">
      {{ t('你好table') }}
      <el-upload
        action
        multiple
        :auto-upload="false"
        :on-change="beforeUpload"
        :thumbnail-mode="false"
        :show-file-list="false"
      >点击上传读取</el-upload>
    </div>-->

    <!-- <span>小型的拖拽模块框</span> -->
    <div class="flex-1 overflow-hidden mt-50 bg-red-300" id="content">
      <!-- <DateTimePiker type="daterange" :has-disable-date="true" :spacing-time="7" v-model="val"></DateTimePiker> -->

      <!-- <TestElNumberInput v-model="inputVal" placeholder="请输入" @blur="handlerBlur"></TestElNumberInput> -->



      <CustomDraggableDialog class="w-100 h-30" :content-id="'content'">
        <span class="flex bg-gray-400">点击我拖动</span>
      </CustomDraggableDialog>
    </div>

    <!-- <div class="w-full h-100 bg-red-300">asdf</div> -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="h-30 bg-yellow-200"></div>
      <div class="flex-1 overflow-hidden">
        <Page>
          <template #form>
            <div class="h-30 bg-gray-300 w-full flex items-center">
              <el-input class="w-180" size="mini" placeholder="请输入姓名"></el-input>
            </div>
          </template>
          <template #table>
            <Table border v-model="tableData" :column="column">
              <template #buttons="{ row }">
                <el-button size="mini" @click="handlerDelete(row)">删除</el-button>
              </template>
              <template #custom="{ row }">
                <span class="text-red-300">{{ row.name }}</span>
              </template>
              <template #address="{ row }">
                <span class=" bg-red-300">{{ row.address }}</span>
              </template>
            </Table>
          </template>
        </Page>
      </div>
    </div>
    <TemplateDown v-if="templateVisible" v-model:visible="templateVisible"></TemplateDown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, Ref } from 'vue'
import messages from '@/locales/views/test/index'
import { useI18n } from 'vue-i18n'
import { setLang, getLang } from '@/lib/storage'
import Page from '@/components/Page/index.vue'
import CustormTable from '@/components/CustomTable/index.vue'
import TemplateDown from './newComponents/templateDown.vue'
import CustomDraggableDialog from '@/components/CustomDragableDialog/index.vue'
import DateTimePiker from '@/components/CustomDataPicker/index.vue'
import Table from '@/components/CustomTableNews/index.vue'
import TestFlush from './newComponents/test.vue'
import { column } from './index'

const START_DEFAULT_TIME = new Date(new Date().getTime() - 6 * 1000 * 60 * 60 * 24)
const END_DEFAULT_TIME = new Date(new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * 24)
export default defineComponent({
  name: 'Test',
  components: {
    Page,
    CustormTable,
    TemplateDown,
    CustomDraggableDialog,
    DateTimePiker,
    Table,
    TestFlush,
  },
  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-03',
        name: 'Jom',
        address: 'No. 189, Grove St, Los Angeles',
      }
    ]
    const { t } = useI18n({
      messages,
      missingWarn: false,
      fallbackWarn: false,
    })
    const templateVisible: Ref<boolean> = ref(false)
    const datas = reactive({
      val: [START_DEFAULT_TIME, END_DEFAULT_TIME]
    })
    const inputVal = ref('')
    const number = ref(0)
    const methd = {
      async handlerInternationalization() {
        setLang('zh-CN')
        window.location.reload()
      },
      handlerInternationalizationEN() {
        setLang('en')
        window.location.reload()
      },
    }
    function openDialog() {
      templateVisible.value = true
    }
    function handlerOpenDialog() {
      //console.log('点击我哦')
    }
    function beforeUpload(file: any) {
      const reader = new FileReader()
      reader.readAsText(file.raw)
      reader.onload = function (e: any) {
        try {
          const txtData: any = this.result
          const a = eval('(function() { ' + txtData + '  \n return Task})()')
        } catch (error) { }
      }
    }
    function handlerDelete(row: any) {
      console.log(row)
    }
    function handlerBlur() {
      console.log(inputVal.value)
    }
    function handlerClick() {
      number.value++
    }
    return {
      t,
      tableData,
      templateVisible,
      ...toRefs(datas),
      inputVal,
      number,
      column,
      ...methd,
      handlerBlur,
      handlerOpenDialog,
      beforeUpload,
      openDialog,
      handlerDelete,
      handlerClick,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>