<template>
  <div class="contenter">
    <div v-if="loading" ref="emporty" class="h-full w-full flex items-center justify-center">
      <BaseLoading :loading="loading" />
    </div>
    <div v-else class="h-full w-full" ref="container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch, markRaw, onUnmounted, onUpdated, nextTick } from 'vue'
import * as echarts from 'echarts'
import BaseLoading from '@/components/base/BaseLoading.vue'
interface Props {
  options?: any
  loading?: boolean
}
export default defineComponent({
  name: 'Charts',
  components: {
    BaseLoading,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const container = ref<any>(null)
    const { options, loading }: any = toRefs(props)
    const isShowLoading = ref<boolean>(false)
    // 是否要渲染
    const isRounder = ref<boolean>(true)
    const chart = ref<any>(null)
    const chartResize = () => chart.value.resize()
    function initEcharts(options: any) {
      nextTick(() => {
        chart.value = markRaw(echarts.init(container.value, 'dark'))
        chart.value.setOption(options)
        window.addEventListener('resize', chartResize)
      })
    }
    // 销毁的时候
    function distroyd() {
      chart.value.dispose()
      window.removeEventListener('resize', chartResize)
    }
    watch(
      options,
      newOptions => {
        // 解决echarts获取不到dom的问题
        setTimeout(() => {
          // 解决弹框销毁的时候会获取不到dom的问题
          if (isRounder.value) {
            initEcharts(newOptions)
          }
        }, 5)
      },
      { deep: true, immediate: true }
    )
    onUpdated(() => {
      window.removeEventListener('resize', chartResize)
    })
    onMounted(() => {
      initEcharts(props.options)
    })
    onUnmounted(() => {
      distroyd()
    })
    return {
      isRounder,
      loading,
      isShowLoading,
      container,
      chartResize,
      initEcharts,
      distroyd,
    }
  },
})
</script>

<style lang="scss" scoped>
.contenter {
  width: 100%;
  height: 100%;
}
</style>