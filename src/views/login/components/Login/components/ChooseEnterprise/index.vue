<template>
  <el-dialog
    :width="375"
    append-to-body
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="t('选择公司')"
    v-model="dialogVisible"
  >
    <el-form
      ref="refEnterprise"
      size="medium"
      label-position="top"
      :show-message="false"
      :model="enterprise"
      :rules="enterpriseRules"
    >
      <el-form-item :label="t('选择公司')" prop="id">
        <el-select
          class="w-full"
          :placeholder="t('请选择公司')"
          v-model="enterprise.id"
        >
          <el-option
            v-for="enterprise in enterprises"
            :key="enterprise.enterpriseId"
            :value="enterprise.enterpriseId"
            :label="enterprise.enterpriseName"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" type="primary" @click="validateEnterprise">{{
        $t("确定")
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import api from "@/api";
import { useElDialog } from "@/lib/vue-use";
import { defineComponent, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import useEnterprise from "./useEnterprise";

export default defineComponent({
  emits: ["choosed"],
  setup(_, { emit }) {
    const { t } = useI18n({ useScope: "parent" });

    const state = reactive({
      enterprises: [] as App.LoginUser["enterprises"], // 登录用户的所有公司
    });
    const { dialogVisible, openDialog, closeDialog } = useElDialog();
    const { refEnterprise, enterprise, enterpriseRules } = useEnterprise();

    async function setEnterpriseId() {
      const [res] = await api.account.setEnterpriseId({
        enterpriseId: enterprise.id,
      });
      if (res) {
        closeDialog();
        const data: App.LoginUser = res.data;
        emit("choosed", data);
      }
    }
    function validateEnterprise() {
      refEnterprise.value?.validate(
        (valid: boolean) => valid && setEnterpriseId()
      );
    }
    function open(enterprises: App.LoginUser["enterprises"]) {
      state.enterprises = enterprises;
      openDialog();
    }

    return {
      t,

      ...toRefs(state),

      dialogVisible,
      open,

      refEnterprise,
      enterprise,
      enterpriseRules,
      validateEnterprise,
    };
  },
});
</script>
