
<template>
  <div ref="totalRef" class="w-full flex items-center relative">
    <div class="flex-1 flex items-center w-full h-full" :class="totalStyle">
      <el-tooltip :disabled="isDisabled" v-bind="$attrs" :content="content">
        <span ref="contentRef" :style="styleContent" :class="contentClass">{{ content }}</span>
      </el-tooltip>
    </div>
    <span class="absolute -right-25 top-1 cursor-pointer" :style="moreStyle" v-if="!isDisabled && isMore"
      @click="handlerMore">
      <slot>更多</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, Ref, computed, nextTick, onMounted, onUnmounted, CSSProperties, PropType } from 'vue';
import { debounce } from 'lodash'
export default defineComponent({
  name: 'ElipsisBox',
  props: {
    isMore: {
      type: Boolean,
      default: false
    },
    moreStyle: {
      type: Object as PropType<CSSProperties | any>,
      default: () => { }
    },
    content: {
      type: String,
      default: '',
    },
    contentClass: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const contentRef = ref()
    const totalRef = ref()
    const height = ref('30px')
    const { content, contentClass } = toRefs(props)
    const isDisabled: Ref<boolean> = ref(true)
    const state = reactive({
      styleContent: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: height.value },
      totalStyle: '',
    })
    const styleContent: Ref<CSSProperties | any> = computed({
      get() {
        return state.styleContent
      },
      set(v) {
        state.styleContent = v
      }
    })
    const totalStyle: Ref<string> = computed({
      get() {
        return state.totalStyle
      },
      set(v) {
        state.totalStyle = v
      }
    })
    async function watchDom() {
      await nextTick()
      const flag = contentRef.value?.scrollWidth < totalRef.value?.offsetWidth
      isDisabled.value = flag
    }
    function handlerMore() {
      height.value = 'auto'
      isDisabled.value = true
      nextTick(() => {
        styleContent.value = {}
        totalStyle.value = ''
      })
    }
    window.addEventListener('resize', debounce(watchDom, 1000), true)
    watch(content, () => {
      watchDom()
    }, { flush: 'post' })
    onMounted(watchDom)
    // 组件卸载的时候执行的钩子
    onUnmounted(() => {
      window.removeEventListener('resize', watchDom, true)
    })
    return {
      content,
      contentClass,
      contentRef,
      totalRef,
      isDisabled,

      styleContent,
      totalStyle,

      handlerMore
    }
  },
})
</script>

