<template>
  <div class="h-screen flex items-center justify-center bg-white select-none">
    <img class="w-300 h-300 object-contain" src="@/assets/img/404.svg" alt />
    <div class="max-w-md px-48">
      <div class="text-72 leading-tight font-semibold font-montserrat">404</div>
      <div class="text-18">{{ t("404") }}</div>
      <!-- <router-link to="/" custom v-slot="{ navigate }">
        <el-button
          class="mt-16"
          size="medium"
          type="primary"
          @click="navigate"
          >{{ t("返回应用") }}</el-button
        >
      </router-link> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import messages from "@/locales/views/error-page/index/index";
import { useI18n } from "vue-i18n";
export default defineComponent({
  setup() {
    const { t } = useI18n({
      messages,
      missingWarn: false,
      fallbackWarn: false,
    });
    return {
      t,
    };
  },
});
</script>
