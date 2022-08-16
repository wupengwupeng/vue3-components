<template>
  <div :id="contentsEdit">
    <div :class="{ isShow: isShow }" @click="handlerClickIn">
      <div ref="editor"></div>
      <div v-if="isShow">
        <el-button size="mini" @click="handlerClickFild">字段信息</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, onBeforeUnmount, ref, toRefs, reactive, watch } from 'vue'
import WangEditor from 'wangeditor'
export default defineComponent({
  name: 'Wangeditor',
  // 设置富文本编辑器的HTML内容
  props: {
    contentsEdit: {
      type: String,
      default: 'adc',
    },
  },
  setup(props) {
    const { contentsEdit } = toRefs(props)
    const editor = ref()
    const isShow = ref<boolean>(false)
    const content: any = reactive({
      text: '',
    })

    let instance: any

    const fun = {
      handlerClickIn(e: any) {
        const a = document.getElementById(`${contentsEdit.value}`)
        if (!a?.contains(e.target)) {
          isShow.value = false
        } else {
          isShow.value = true
        }
      },
      // 初始化富文本
      initEdit() {
        instance = new WangEditor(editor.value)
        Object.assign(instance.config, {
          onchange(e: any) {
            //console.log(e, 'change')
            //console.log(instance.txt.html())
          },
          onblur(e: any) {
            //console.log(e)
            //console.log('我失去焦点了')
          },
          onfocus() {
            //console.log('focus')
          },
          menus: [],
          showFullScreen: false,
          height: 'auto',
          placeholder: '请选择或者输入信息',
        })
        instance.create()
        //console.log(instance)
      },

      // 点击推送
      handlerClickFild() {
        instance.cmd.do('insertHTML', "<p contenteditable='false' style='display: inline-block;background-color: grey;'>sdf</p>")
        //console.log(instance)
      },
    }
    watch([() => isShow.value], newVal => {
      if (newVal) {
        document.addEventListener('click', fun.handlerClickIn, true)
      } else {
        document.removeEventListener('click', fun.handlerClickIn, true)
      }
    })

    onMounted(() => {
      fun.initEdit()
    })

    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })

    return {
      editor,
      content,
      isShow,
      ...fun,
    }
  },
})
</script>

<style lang="scss" scoped>
.isShow {
  min-height: 80px;
  border: 1px solid #ab4bf5;
}
</style>