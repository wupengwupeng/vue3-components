import { reactive, ref, computed } from 'vue'

export function useElPagination() {
  const pagination = reactive({
    pageSizes: [8, 15, 20, 50, 60, 100, 200, 500], // 每页显示个数选择器的选项设置
    pageSize: 15, // 每页显示条目个数
    currentPage: 1, // 当前页数
    total: 0, // 总条目数
  })

  return pagination
}

export function useElDialog() {
  const dialogVisible = ref(false)
  const openDialog = () => (dialogVisible.value = true)
  const closeDialog = () => (dialogVisible.value = false)
  return {
    dialogVisible,

    openDialog,
    closeDialog,
  }
}

export function useElDrawer() {
  const drawerVisible = ref(false)
  const openDrawer = () => (drawerVisible.value = true)
  const closeDrawer = () => (drawerVisible.value = false)
  return {
    drawerVisible,

    openDrawer,
    closeDrawer,
  }
}

export function useElPopover() {
  const visible = ref(false)
  const openPopover = () => (visible.value = true)
  const closePopover = () => (visible.value = false)
  return {
    visible,

    openPopover,
    closePopover,
  }
}

// useLoading
export function useLoading() {
  const loading = ref(false)

  function openLoading() {
    loading.value = true
  }
  function closeLoading() {
    loading.value = false
  }
  return {
    loading,
    openLoading,
    closeLoading,
  }
}

// useModelValue
export function useModelVal(props: any, emits: any) {
  const val = computed({
    get() {
      return props.modelValue
    },
    set(v) {
      emits('update:modelValue', v)
    }
  })
  return val
}

