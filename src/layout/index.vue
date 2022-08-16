<template>
  <div class="h-screen w-screen flex">
    <!-- <div>
      <SideBar />
    </div> -->
    <div class="flex-1 overflow-hidden">
      <router-view></router-view>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './components/sidebar/index.vue'
export default defineComponent({
  components: {
    SideBar,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
</style>


