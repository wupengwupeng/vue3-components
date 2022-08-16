import { onUnmounted, reactive, toRefs } from 'vue'

const COUNT = 60

export default function useVerCodeTimer() {
  let verCodeTimer: number | null = null

  const state = reactive({
    count: COUNT,
    isCounting: false,
  })
  function closeVerCodeTimer() {
    state.count = COUNT
    state.isCounting = false
    if (verCodeTimer) clearInterval(verCodeTimer)
  }
  function startVerCodeTimer() {
    state.isCounting = true
    verCodeTimer = window.setInterval(() => {
      state.count--
      if (state.count <= 0) closeVerCodeTimer()
    }, 1000)
  }

  onUnmounted(closeVerCodeTimer)

  return {
    ...toRefs(state),
    startVerCodeTimer,
  }
}
