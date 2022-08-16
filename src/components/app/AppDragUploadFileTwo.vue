<template>
  <el-upload ref="uploadApp" v-bind="$attrs" v-loading="loading" class="app-upload" drag action
    :http-request="httpRequest" :show-file-list="false" :accept="accept" :disabled="disabled">
    <el-tooltip append-to-body placement="top" :show-after="500">
      <template #content>
        <span v-if="accept">
          <span>{{ t('支持格式') }}</span>
          <span class="mx-4 text-success">{{ accept.replaceAll(',', ' ') }}</span>
        </span>
        <span v-if="sizeLimit">
          <span>{{ t('单个文件不能超过') }}</span>
          <span class="mx-4 text-danger">{{ sizeLimit }}</span>
          <span>MB</span>
        </span>
      </template>
      <template v-if="modelValue">
        <el-image v-if="isPreviewableImageUrl(modelValue)" class="absolute top-0 left-0 w-full h-full z-0" fit="contain"
          :src="modelValue"></el-image>
        <div v-else
          class="absolute top-0 left-0 w-full h-full z-0 flex flex-col items-center justify-center text-gray-500">
          <img v-if="isPDFUrl(modelValue)" class="w-48 h-48 object-contain" src="@/assets/img/pdf.svg" alt />
          <img v-else-if="isDOCUrl(modelValue)" class="w-48 h-48 object-contain" src="@/assets/img/doc.svg" alt />
          <app-svg-icon v-else class="w-36 h-36" icon-name="cloudarrowup"></app-svg-icon>
          <div class="w-full mt-12 px-12 text-12 leading-20">
            <div class="truncate">{{ fileName }}</div>
            <div>{{ t('该文件不支持预览') }}</div>
          </div>
        </div>
      </template>
      <div v-else class="absolute top-0 left-0 w-full h-full z-0 flex items-center text-gray-500">
        <!-- <app-svg-icon class="w-36 h-36" icon-name="cloudarrowup"></app-svg-icon>
        <div class="mt-12 px-24 text-12 leading-20">{{ t('将文件拖到此处或点击上传') }}</div> -->
        <div class="w-64 h-64 flex items-center justify-center">
          <app-svg-icon class="w-24 h-24" icon-name="icon-cloud-upload"></app-svg-icon>
        </div>
        <div class="flex-1 flex flex-col items-start justify-center">
          <div class="h-24 flex items-center">
            <span class="text-14 hover:cursor-pointer mr-5 upload-color-text">{{ '点击上传' }}</span>
            <span class="text-gray-700 text-14"> {{ '或将文件拖到此处' }}</span>
          </div>
          <div class="h-24 text-gray-500 text-12 flex items-center">{{ '支持格式:.jpg.png.单个文件不超过20MB' }}</div>
        </div>
      </div>
    </el-tooltip>
  </el-upload>
</template>

<script lang="ts">
import { isPreviewableImageUrl, isPDFUrl, isDOCUrl } from '@/lib/is'
import { uploadFile } from '@/lib/upload'
import messages from '@/locales/components/app/AppDragUploadFile/index'
import { ElMessage } from 'element-plus'
import type { Ref } from 'vue'
import { defineComponent, reactive, ref, toRef, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'

function useLoading() {
  const loading = ref(false)
  function openLoading() {
    loading.value = true
  }
  function closeLoading() {
    loading.value = false
  }
  return {
    loading,
    openLoading,
    closeLoading,
  }
}

export default defineComponent({
  name: 'AppDragUploadFileTwo',
  emits: ['update:modelValue'],
  props: {
    // modelValue:{
    //   type: String,
    //   required: true
    // },
    // wupeng修改2022 1.18
    modelValueWatch: {
      type: String,
      required: true,
      default: '',
    },
    // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性各论
    accept: {
      type: String,
      required: false,
      default: 'image/*',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    sizeLimit: {
      type: Number,
      required: false,
      default: 20,
    },
  },
  setup(props, { emit }) {
    const modelValue = ref<any>(null)
    const uploadApp = ref<any>(null)

    const { modelValueWatch } = toRefs(props)
    const { t } = useI18n({
      messages,
      missingWarn: false,
      fallbackWarn: false,
    })

    interface State {
      sizeLimit: Ref<number>
      fileName: string
    }
    const state = reactive<State>({
      sizeLimit: toRef(props, 'sizeLimit'),
      fileName: '', // 文件名字
    })

    const { loading, openLoading, closeLoading } = useLoading()

    watch(
      [() => modelValueWatch.value],
      val => {
        modelValue.value = val[val.length - 1]
      },
      { immediate: true }
    )
    async function upload(file: File) {
      // //console.log(file);

      if (file.size > 1024 * 1024) openLoading()
      try {
        const data: string = await uploadFile(file)
        const path = data
        state.fileName = file.name
        emit('update:modelValue', path)
        closeLoading()
      } catch {
        emit('update:modelValue', '')
        closeLoading()
      }
    }
    function httpRequest({ file }: { file: File }) {
      if (state.sizeLimit && file.size > state.sizeLimit * 1024 * 1024) {
        ElMessage({
          type: 'warning',
          message: `${t('单个文件不能超过')} ${state.sizeLimit} MB`,
        })
        return
      }
      upload(file)
    }
    // 清空上传列表
    function clerarUploadList() {
      modelValue.value = ''
      uploadApp.value.clearFiles()
    }

    return {
      t,
      uploadApp,
      modelValue,
      ...toRefs(state),

      loading,
      httpRequest,
      clerarUploadList,
      isPreviewableImageUrl,
      isPDFUrl,
      isDOCUrl,
    }
  },
})
</script>

<style lang="scss" scoped>
.upload-color-text {
  color: var(--primary) !important;
}
</style>
