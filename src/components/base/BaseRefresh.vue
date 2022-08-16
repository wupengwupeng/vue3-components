<template>
  <div>
    <div>
      <AppSvgIcon class="myClassRefresh" :style="{ 'animation-play-state': runing }" iconName="icon-refresh" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, watch, ref } from 'vue'
import AppSvgIcon from '@/components/app/AppSvgIcon.vue'
export default defineComponent({
  name: 'RefreshButton',
  components: {
    AppSvgIcon,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { loading } = toRefs(props)
    // 默认是runing
    const runing = ref<string>('paused')
    watch(
      loading,
      newVal => {
        runing.value = newVal ? 'running' : 'paused'
      },
      { immediate: true }
    )
    return {
      loading,
      runing,
    }
  },
})
</script>

<style lang="scss" scoped>
.myClassRefresh {
  width: 16px;
  height: 16px;
  animation: move 0.8s infinite ease-in-out;
}
.myClassRefresh:hover {
  cursor: pointer;
}
@keyframes move {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.actiove {
  animation-play-state: running;
}
.paused {
  animation-play-state: paused;
}
</style>