<template>
  <div>
    <el-button class="border-none" size="mini" v-bind="$attrs">
      <app-svg-icon class="translate-y-2" iconName="icon-refresh" />
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Refresh',
})
</script>