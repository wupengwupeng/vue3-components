<template>
  <component :is="template"></component>
</template>

<script lang="ts">
import messages from "@/locales/views/login/index/index";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import TemplateOne from "./components/TemplateOne.vue";

export default defineComponent({
  components: {
    TemplateOne,
  },
  setup() {
    const { t } = useI18n({
      messages,
      missingWarn: false,
      fallbackWarn: false,
    });

    const templates = ["TemplateOne"];
    const template = ref(templates[0]);

    return {
      t,

      templates,
      template,
    };
  },
});
</script>
