<template>
  <div>
    <el-dialog title="新增模板" v-model="visibleCreate" @close="handlerClose">
      adf

      <template #footer>
        <el-button size="mini" @click="handlerClose">取消</el-button>
        <el-button size="mini" @click="handlerAdd">新增</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  visibleCreate: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(["update:visibleCreate"])

const handlerClose = () => {
  emits("update:visibleCreate", false)
}
const handlerAdd = () => {
  console.log(12)
}

</script>