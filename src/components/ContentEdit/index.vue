<template>
  <div :id="contentsEdit">
    <div :class="{ isShow: isShow, relative: true }" @click="handlerClickIn">
      <div contenteditable="true" @focus="handlerFocus" @blur="handlerBlur" @input="handleSelection"
        @click="handleSelection" :id="idd" class="border rounded min-h-64 overflow-auto px-15"></div>
      <div class="absolute left-15 top-2 z-0 inline-block" v-if="isShowPlacehoder" @click="handlerClickPlaceHoder">
        <span class="text-gray-400 text-14">{{ placehoder }}</span>
      </div>
      <div v-if="isShow" id="select-popover" @mousedown="handlerClickButnMouseDown">
        <el-popover :placement="placementPover" :width="200" trigger="click" :offset="4" :show-arrow="false"
          @hide="handlerHide" @show="handlerShow">
          <template #reference>
            <el-button size="mini" class="ml-2 -translate-y-1">
              <AppSvgIcon iconName="icon-add-square" />
              <span>{{ t('数据字段') }}</span>
            </el-button>
          </template>
          <template #default>
            <div class="flex flex-col h-450">
              <div class="h-30 w-full" v-show="false">
                <el-input placeholder="搜索数据字段" v-model="searchFiled" size="mini">
                  <template #prefix>
                    <el-icon class="flex h-30 w-20 justify-center items-center">
                      <AppSvgIcon class="w-11 h-11" iconName="icon-search" />
                    </el-icon>
                  </template>
                </el-input>
              </div>
              <div class="flex h-450 w-full flex-col overflow-y-auto" @mousedown="handlerClickButnMouseDown">
                <div class="flex flex-col px-6">
                  <div class="text-gray-400 text-12 my-5">
                    {{ t('任务信息') }}
                  </div>
                  <div class="h-32 text-14 text-gray-700" v-for="(item, index) in allFiledText.taskInfo"
                    :key="index + 'a'">
                    <el-button size="mini" class="w-full" :disabled="item.disabled"
                      @mousedown="e => handlerChange(item.key, item.tag, e)">{{ item.key }}</el-button>
                  </div>
                </div>
                <div class="w-full h-1 bg-gray-100"></div>
                <div class="flex flex-col px-6 mt-5 border-t">
                  <div class="text-gray-400 text-12 my-5">
                    {{ t('测试信息') }}
                  </div>
                  <div class="h-32 text-14 text-gray-700" v-for="(item, index) in allFiledText.testInfo"
                    :key="index + 'b'">
                    <el-button size="mini" class="w-full" :disabled="item.disabled"
                      @click="handlerChange(item.key, item.tag)">{{ item.key }}</el-button>
                  </div>
                </div>
                <div class="w-full h-1 bg-gray-100"></div>
                <div class="flex flex-col px-6 mt-5 border-t">
                  <div class="text-gray-400 text-12 my-5">
                    {{ t('记录信息') }}
                  </div>
                  <div class="h-32 text-14 text-gray-700" v-for="(item, index) in allFiledText.recordInfo"
                    :key="index + 'g'">
                    <el-button size="mini" class="w-full" :disabled="item.disabled"
                      @click="handlerChange(item.key, item.tag)">{{ item.key }}</el-button>
                  </div>
                </div>
                <div class="flex flex-col px-6 mt-5 border-t">
                  <div class="text-gray-400 text-12 my-5">
                    {{ t('其他信息') }}
                  </div>
                  <div class="h-32 text-14 text-gray-700" v-for="(item, index) in allFiledText.stdInfo"
                    :key="index + 's'">
                    <el-button size="mini" class="w-full" :disabled="item.disabled"
                      @click="handlerChange(item.key, item.tag)">{{ item.key }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, onMounted, computed, nextTick, watchEffect, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from '@/locales/views/autoReport/template/index'
import { reject } from 'lodash'
export default defineComponent({
  name: 'ContentEdit',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isUpdata: {
      type: Boolean,
      default: false,
    },
    idd: {
      type: String,
      default: 'fileName',
    },
    filedAll: {
      type: Object,
      default: () => {},
    },
    content: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 200,
    },
    contentsEdit: {
      type: String,
      default: '',
    },
    placementPover: {
      type: String,
      default: 'bottom-start',
    },
    placehoder: {
      type: String,
      default: '请输入或者选择',
    },
  },
  emits: ['inputValue', 'blur'],
  setup(props, { emit }) {
    const { t } = useI18n({
      messages,
      missingWarn: false,
      fallbackWarn: false,
    })
    const { visible, idd, filedAll, content, maxlength, contentsEdit, placementPover, isUpdata, placehoder } = toRefs(props)
    const innerText = ref<string>('')
    const isShow = ref<boolean>(false)
    // 是否显示提示
    const isShowPlacehoder = ref<boolean>(true)
    // 下拉框是否显示
    const selectIsShow = ref<boolean>(false)
    const searchFiled = ref<String>('')
    const state: any = reactive({
      selection: {},
      range: {},
      textNode: {},
      rangeStartOffset: {},
      allFiledText: {},
    })

    const med = {
      handlerClickButnMouseDown(e: any) {
        state.range = getSelection()?.getRangeAt(0)
        e.preventDefault()
        e.stopPropagation()
      },
      handlerClickButn(e: any) {
        med.handleSelection(e)
        e.preventDefault()
        e.stopPropagation()
        //
      },
      // 点击placehoder的时候
      handlerClickPlaceHoder(e: any) {
        const edit: any = document.getElementById(`${idd.value}`)
        edit.focus()
      },
      // 隐藏的时候触发
      handlerHide() {
        selectIsShow.value = false
        isShow.value = false
      },
      // 显示的时候触发
      handlerShow() {
        selectIsShow.value = true
      },
      handlerFocus() {
        med.isValueInput()
      },

      // 监听值的通用方法 传值出去
      getDateEmit() {
        let inputValve = ''
        const edit: any = document.getElementById(`${idd.value}`)
        const len: any = edit?.childNodes.length
        // //console.log(edit.childNodes);
        for (let i = 0; i < len; i++) {
          // //console.log(edit?.childNodes[i], "你好");
          if (edit?.childNodes[i].nodeName === '#text') {
            // //console.log(edit?.childNodes[i].nodeValue, "nodeValue");
            inputValve += edit?.childNodes[i].nodeValue
          } else if (edit?.childNodes[i].nodeName === 'SPAN') {
            const b = edit?.childNodes[i].getAttribute('v-data')
            if (b) {
              inputValve += b
            } else {
              // 解决复制为null问题
              inputValve += edit?.childNodes[i].innerText
            }
          }
        }
        // //console.log(inputValve);
        emit('inputValue', inputValve)
      },
      handlerBlur() {
        med.getDateEmit()
        emit('blur')
      },
      // 限制编辑框内输入的长度
      // limitLength() {
      //   const edit: any = document.getElementById(`${idd.value}`);
      //   //console.log(edit.innerText.length, "gd");
      // },
      // 判断输入框是否有值
      isValueInput() {
        const edit: any = document.getElementById(`${idd.value}`)
        if (edit.innerText.length) {
          isShowPlacehoder.value = false
        } else {
          isShowPlacehoder.value = true
        }
        // med.limitLength();
      },
      handleSelection(e?: any) {
        // const a = document.getElementById(`${contentsEdit.value}`);
        // 防抖TODO 获取选定对象
        // state.selection = getSelection();
        // 光标对象
        state.range = getSelection()?.getRangeAt(0)
        med.isValueInput()
      },

      handlerClickIn(e: any) {
        // const edit: any = document.getElementById(`${idd.value}`);
        const a = document.getElementById(`${contentsEdit.value}`)
        if (!a?.contains(e.target)) {
          isShow.value = false
        } else {
          isShow.value = true
        }
      },
      handlerChange(val: string, tag: string, e: any) {
        const spanText = `<span contenteditable='false'
         v-data=${tag} style='line-height: 24px;border-radius: 6px;
        min-width:40px;height: 24px;display: inline-block;font-size: 12px;background: #E6E9ED;
        margin-right: 5px;text-align: center;'>${val}</span>${'\u200B'}`
        med.insertHtmlAtCaret(spanText)
        // 放弃这个方法先。
        // med.createImg(val, tag);
        // 失去焦点触发验证
        med.isValueInput()
        // emit("blur");
      },
      insertHtmlAtCaret(html: string) {
        let sel, range
        if (window.getSelection) {
          // IE9 and non-IE
          sel = window.getSelection()
          if (sel?.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0)
            range.deleteContents()
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            let el: any = document.createElement('div')
            el.innerHTML = html
            let frag: any = document.createDocumentFragment(),
              node,
              lastNode
            while ((node = el.firstChild)) {
              lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            // Preserve the selection
            if (lastNode) {
              range = range.cloneRange()
              range.setStartAfter(lastNode)
              range.collapse(true)
              sel.removeAllRanges()
              sel.addRange(range)
            }
          }
        } else if (document.selection && document.selection.type != 'Control') {
          // IE < 9
          document.selection.createRange().pasteHTML(html)
        }
      },
      createImg(val: string, tag: any) {
        const edit: any = document.getElementById(`${idd.value}`)
        const span: any = document.createElement('span')
        const w = document.createTextNode('\u200B')
        const name = val
        span.setAttribute('v-data', tag)
        span.innerHTML = name
        span.nodeValue = name
        const obj: any = {
          borderRadius: '6px',
          background: '#E6E9ED',
          marginRight: '5px',
          display: 'inline-block',
          textAlign: 'center',
          lineHeight: '24px',
          minWidth: '40px',
          height: '24px',
          fontSize: '12px',
        }
        Object.keys(obj).forEach((res: any) => {
          span.style[res] = obj[res]
        })
        span.setAttribute('contenteditable', 'false')
        // 在光标处插入dom
        state.range.insertNode(span)
        state.range.insertNode(w)
        // 光标开始和光标结束重叠
        state.range.collapse(false)
      },
      // 回显替换通用方法 最后调用getDateEmit实现双向绑定
      callBackMethod(content: string) {
        const a = /\{([^{}]+?)\}/g
        const dic: any[] = [...state.allFiledText.recordInfo, ...state.allFiledText.stdInfo, ...state.allFiledText.taskInfo, ...state.allFiledText.testInfo]
        const newContent = content.replace(a, x => {
          var tagItem = dic.find(t => t.tag == x)
          if (tagItem) {
            return (
              '<span style="border-radius:6px;background:#E6E9ED; margin-right:5px;display:inline-block;text-align:center; line-height:24px;min-width:40px;height:24px;font-size:12px" contenteditable="false" v-data="' +
              tagItem.tag +
              '">' +
              tagItem.key +
              '</span>'
            )
          } else {
            return x
          }
        })
        // //console.log(newContent, "新字符串");
        const edit: any = document.getElementById(`${idd.value}`)
        if (edit) {
          edit.setAttribute('contenteditable', false)
          edit.innerHTML = newContent
          edit.setAttribute('contenteditable', true)
        }
      },
      handlerInputFiled() {
        const b = computed(() => {
          let a: any = searchFiled.value
          // 不区分大小写
          const reg = new RegExp(a, 'ig')
          const obj: any = {}
          Object.keys(filedAll.value).forEach((res: any) => {
            obj[res] = filedAll.value[res].filter((item: any) => {
              if (searchFiled) {
                return item.key.match(reg)
              } else {
                return true
              }
            })
          })
          return obj
        })
        return b.value
      },
    }
    watch([() => isShow.value, () => selectIsShow.value], newVal => {
      if (newVal[0] === true) {
        if (newVal[1] === true) {
          document.removeEventListener('click', med.handlerClickIn, true)
        } else {
          document.addEventListener('click', med.handlerClickIn, true)
        }
      } else {
        document.removeEventListener('click', med.handlerClickIn, true)
      }
    })
    // watch([searchFiled], (newVal) => {
    //   state.allFiledText = med.handlerInputFiled();
    // });
    watch(
      () => filedAll.value,
      val => {
        state.allFiledText = val
      },
      { immediate: true, deep: true }
    )
    watch(
      content,
      newVal => {
        // 解决filedAll 返回比较慢的问题
        setTimeout(() => {
          // //console.log(state.allFiledText);
          if (Object.keys(state.allFiledText).length) {
            med.callBackMethod(newVal)
          }
          med.isValueInput()
        }, 10)
      },
      { deep: true }
    )

    onBeforeMount(() => {})
    return {
      t,
      isUpdata,
      contentsEdit,
      placementPover,
      searchFiled,
      visible,
      isShowPlacehoder,
      placehoder,
      maxlength,
      idd,
      isShow,
      filedAll,
      content,
      innerText,
      selectIsShow,
      ...toRefs(state),
      ...med,
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