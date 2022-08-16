<template>
  <div v-elDraggableDialog:[isDraggable]>
    <el-dialog :model-value="visible" :title="title" destroy-on-close v-bind="$attrs" @close="handlerClose">
      <slot />
      <template #footer>
        <div class="flex justify-between">
          <div>
            <slot name="footerLeft"></slot>
          </div>
          <div>
            <el-button size="small" @click="handlerCansole">{{ cancelText }}</el-button>
            <el-button :disabled="isConfirmDisabled" :loading="loading" size="small" type="primary"
              @click="handlerSave">
              {{
                  confirmText
              }}
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, inject } from 'vue'
import { useVModels } from '@vueuse/core'
export default defineComponent({
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '保存'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    isDraggable: {
      type: Boolean,
      default: true
    },
    isConfirmDisabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['handlerSave', 'close'],
  setup(props, { emit, attrs, slots }) {
    const { visible, title, confirmText, cancelText, isDraggable, loading } = useVModels(props, emit)
    function handlerClose() {
      visible.value = false
      emit('close')
    }
    function handlerCansole() {
      handlerClose()
      emit('close')
    }
    function handlerSave() {
      emit('handlerSave')
    }
    return {
      visible,
      title,
      confirmText,
      cancelText,
      isDraggable,
      loading,
      ...toRefs(attrs),
      handlerClose,
      handlerCansole,
      handlerSave,
    }
  },
})
</script>