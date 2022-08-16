<template>
  <el-image
    class="w-200 h-200 border rounded-md"
    alt
    :src="qrcode"
    v-loading="isLoadingQRCode"
  ></el-image>
</template>

<script lang="ts">
import api from "@/api";
import { ElMessage } from "element-plus";
import QRCode from "qrcode";
import { defineComponent, onUnmounted, reactive, toRefs } from "vue";

export default defineComponent({
  emits: ["success"],
  setup(_, { emit }) {
    const state = reactive({
      qrcode: "",
      isLoadingQRCode: false,
    });

    let validateLoginQRCodeTimer: number | null = null;
    function stopValidateLoginQRCodeTimer() {
      if (validateLoginQRCodeTimer) clearTimeout(validateLoginQRCodeTimer);
    }
    async function validateLoginQRCode(codeId: string) {
      const [res] = await api.account.validateLoginQRCode(
        {
          codeId,
        },
        {
          showErrorMessage: false,
        }
      );
      if (res) {
        const data: App.LoginUser | null = res.data;
        if (data) {
          stopValidateLoginQRCodeTimer();
          emit("success", data);
        } else {
          validateLoginQRCodeTimer = window.setTimeout(() => {
            validateLoginQRCode(codeId);
          }, 1000);
        }
      } else {
        validateLoginQRCodeTimer = window.setTimeout(() => {
          validateLoginQRCode(codeId);
        }, 1000);
      }
    }
    let getLoginQRCodeTimer: number | null = null;
    function stopgetLoginQRCodeTimer() {
      if (getLoginQRCodeTimer) clearTimeout(getLoginQRCodeTimer);
    }
    async function getLoginQRCode() {
      state.isLoadingQRCode = true;
      const [res] = await api.account.getLoginQRCode();
      state.isLoadingQRCode = false;
      if (res) {
        interface Data {
          codeContent: string;
          codeId: string;
          expiry: number;
        }
        const data: Data = res.data;

        // 到期自动获取新的 QRCode
        getLoginQRCodeTimer = window.setTimeout(() => {
          stopValidateLoginQRCodeTimer();
          getLoginQRCode();
        }, (data.expiry - 10) * 1000);

        try {
          state.qrcode = await QRCode.toDataURL(data.codeContent);
          validateLoginQRCode(data.codeId);
        } catch {
          ElMessage({
            type: "error",
            message: "QRCode Error",
          });
        }
      }
    }

    getLoginQRCode();

    onUnmounted(() => {
      stopValidateLoginQRCodeTimer();
      stopgetLoginQRCodeTimer();
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
