<template>
  <div class="w-240">
    <el-menu :default-active="activeMenu" router>
      <!-- <el-menu-item index="/test">
        <span>测试</span>
      </el-menu-item> -->
      <el-menu-item index="/capexport">
        <span>放电容量导出</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import messages from '@/locales/layout/Navbar/index'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n({
      messages,
      missingWarn: false,
      fallbackWarn: false,
    })
    const activeMenu = ref('/putTask')
    const route: any = useRoute()
    const router = useRouter()
    watch(
      [() => route.path],
      (newVal: any, oldVal: any) => {
        if (newVal[0] !== oldVal[0]) {
          activeMenu.value = newVal[0]
        } else {
          activeMenu.value = oldVal[0]
        }
      },
      { immediate: true, deep: true }
    )
    return {
      t,
      activeMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

::v-deep(.is-active) {
  background: #ede9fe;
}

::v-deep(.el-menu-item:hover) {
  background: #ede9fe;
}

::v-deep(.el-menu-item:active) {
  background: #ede9fe;
}

::v-deep(.el-menu-item:focus) {
  background: #ede9fe;
}
</style>