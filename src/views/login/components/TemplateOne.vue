<template>
  <div class="relative flex min-h-screen bg-gray-50 overflow-hidden">
    <img
      class="absolute inset-0 w-full h-full object-cover"
      src="@/assets/img/views/login/bg.svg"
      alt
    />
    <div class="flex-1 flex flex-col items-center justify-evenly px-48">
      <div></div>
      <Login />
      <footer class="text-gray-500 mix-blend-multiply">
        {{ t("版权所有") }}
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Login from "./Login/index.vue";

export default defineComponent({
  components: {
    Login,
  },
  setup() {
    const { t } = useI18n({ useScope: "parent" });

    return {
      t,
    };
  },
});
</script>
