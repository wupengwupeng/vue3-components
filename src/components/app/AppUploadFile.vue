<template>
  <el-upload :http-request="httpRequest" action :show-file-list="false" :accept="accept" :disabled="disabled">
    <slot></slot>
  </el-upload>
</template>

<script lang="ts">
import { uploadFile } from '@/lib/upload'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AppUploadFile',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
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
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const loading = ref(false)

    function openLoading() {
      loading.value = true
    }
    function closeLoading() {
      loading.value = false
    }

    async function upload(file: File) {
      if (file.size > 1024 * 1024) openLoading()
      try {
        const data: string = await uploadFile(file)
        closeLoading()
        const path = data
        emit('update:modelValue', path)
      } catch (error) {
        closeLoading()
        emit('update:modelValue', '')
      }
    }
    function httpRequest({ file }: { file: File }) {
      upload(file)
    }

    return {
      loading,
      httpRequest,
    }
  },
})
</script>
