<template>
  <div class="relative">
    <el-button class="w-full" size="medium" :loading="isLoadingQRCode" @click="getWechatLoginQr">Continue with Wechat</el-button>
    <img class="absolute top-8 left-16 w-20 h-20" src="@/assets/img/views/login/wechat.svg" alt="Wechat" />
  </div>
  <el-dialog :width="350" append-to-body :title="t('请使用微信扫描二维码登录')" v-model="dialogVisible" @close="stopTimer">
    <div class="flex justify-center">
      <el-image class="w-300 h-300" fit="contain" :src="qrcode"></el-image>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import api from '@/api'
import { useElDialog } from '@/lib/vue-use'
import { defineComponent, onUnmounted, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  emits: ['success'],
  setup(_, { emit }) {
    const { t } = useI18n({ useScope: 'parent' })

    const state = reactive({
      isLoadingQRCode: false,
      qrcode: '', // 微信登录二维码
    })
    const { dialogVisible, openDialog, closeDialog } = useElDialog()

    let timer: number | null = null
    function stopTimer() {
      if (timer) clearInterval(timer)
    }
    // 定时检查是否登录成功
    async function getQrLoginInfo(key: string) {
      const [res] = await api.wechat.getQrLoginInfo(
        {
          key,
        },
        {
          showErrorMessage: false,
        }
      )
      if (res) {
        const data: App.LoginUser | null = res.data
        if (data) {
          emit('success', data)
          stopTimer()
          closeDialog()
        } else {
          timer = window.setTimeout(() => {
            getQrLoginInfo(key)
          }, 1000)
        }
      } else {
        timer = window.setTimeout(() => {
          getQrLoginInfo(key)
        }, 1000)
      }
    }
    // 获取微信登录二维码
    async function getWechatLoginQr() {
      state.isLoadingQRCode = true
      const [res] = await api.wechat.getWechatLoginQr()
      state.isLoadingQRCode = false
      if (res) {
        interface Data {
          key: string
          qrUrl: string
        }
        const data: Data = res.data
        state.qrcode = data.qrUrl
        getQrLoginInfo(data.key)
        openDialog()
      }
    }

    onUnmounted(stopTimer)

    return {
      t,

      dialogVisible,

      ...toRefs(state),

      getWechatLoginQr,
      stopTimer,
    }
  },
})
</script>
