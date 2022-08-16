<template>
  <div class="w-full h-full">
    <div class="h-40 w-full border-b flex items-center px-12">
      <div class="flex-1 overflow-hidden flex items-center">
        <el-button class="border-none bg-opacity-30" size="small">
          <app-svg-icon iconName="icon-arrow-left" @click="handleScroll(180)"></app-svg-icon>
        </el-button>
        <div class="flex-1 overflow-hidden px-5 flex-nowrap" ref="scrollbarDom">
          <div class="flex flex-nowrap gap-8 overflow-visible" ref="tabDom" :style="getTabStyle">
            <el-check-tag v-for="(item, index) in tagArr" :checked="item.checked"
              @change="(val: any) => tagOnChange(val, item)" :ref="'dynamic' + index" :key="index" size="small"
              class="rounded-full whitespace-nowrap">
              {{ item.name }}
            </el-check-tag>
          </div>
          <span v-if="!tagArr.length" class="text-[#6F7883] text-12">选择通道点击星号添加标签</span>
        </div>
        <el-button @click="handleScroll(-180)" class="rotate-180 border-none bg-opacity-30" size="small">
          <app-svg-icon iconName="icon-arrow-left"></app-svg-icon>
        </el-button>
      </div>
      <div class="flex items-center">
        <!-- Is click finish button ?-->
        <div v-if="!isShowFinish" class="flex items-center">
          <PopoverCustom @hide="handlerHidePopper" v-model:visible="visible" :show-arrow="false" placement="bottom-end"
            :width="420" trigger="click">
            <template #header>
              <el-button class="border-none" @click="visible = true" size="small">
                <app-svg-icon iconName="icon-star"></app-svg-icon>
              </el-button>
            </template>
            <template #default>
              <div class="p-12">
                <div class="flex flex-col" v-if="!isShowEditTag">
                  <span class="text-14 font-normal text-[#111826]">添加标签</span>
                  <div class="flex px-25 items-center h-32 w-full rounded my-10 bg-[#FFFEF5]"
                    :style="{ border: '1px solid rgba(214, 150, 0, 0.4)' }">
                    <app-svg-icon iconName="icon-info" />
                    <span class="text-[#CF9102] ml-10">请先勾选标签，在添加收藏</span>
                  </div>
                  <div class="flex items-center gap-12 mt-8 mb-16">
                    <el-input size="small" maxlength="20" clearable placeholder="请添加标签" v-model="tagName">
                      <template #prefix>
                        <app-svg-icon iconName="icon-tag"></app-svg-icon>
                      </template>
                    </el-input>
                    <el-button type="primary" size="small" :disabled="!tagName.trim().length" class="border-none"
                      @click="handlerCreateTag">创建
                    </el-button>
                  </div>
                  <div class="flex flex-wrap gap-5 max-h-200 overflow-auto">
                    <el-check-tag v-for="(item, index) in innerTagArr" :checked="item.checked"
                      @change="(val: any) => innerTagOnChange(val, item, index)" :key="index" size="small"
                      class="rounded-full whitespace-nowrap">
                      {{ item.name }}
                    </el-check-tag>
                  </div>
                  <div class="flex justify-between border-t mt-12 pt-5 items-center mt-10">
                    <el-button class="flex items-center justify-around" size="mini" @click="tagManage">
                      <span class="text-14 mr-5">标签管理</span>
                      <app-svg-icon iconName="right-line"></app-svg-icon>
                    </el-button>
                    <el-button size="mini" type="primary" :disabled="collectDisabled || isDisabledEdit"
                      @click="handlerClickCollect">
                      收藏
                    </el-button>
                  </div>
                </div>
                <div v-else class="flex flex-col">
                  <span class="text-14 font-normal text-[#111826]">标签管理</span>
                  <!-- tag管理的内容 -->
                  <div class="max-h-200 overflow-auto gap-y-5 flex flex-col mt-10">
                    <div class="flex items-center gap-x-10 justify-around" v-for="(item, index) in innerTagArr"
                      :key="index + 'ad'">
                      <app-svg-icon class="w-20 h-20" iconName="icon-drog"></app-svg-icon>

                      <el-input placeholder="请输入标签" maxlength="20" :disabled="item.disabled"
                        @blur="handlerBlurTag(item)" :input-style="{ borderRadius: '20px' }" v-model="item.name"
                        size="mini"></el-input>

                      <div class="w-60 flex gap-8 justify-around">
                        <app-svg-icon class="hover:cursor-pointer hover:text-gray-700 hover:scale-125"
                          iconName="icon-delete-tag" @click="handlerDeleteTags(item)">
                        </app-svg-icon>
                        <app-svg-icon class="hover:cursor-pointer hover:text-gray-700 hover:scale-125"
                          iconName="icon-pencil" @click="handlerEditTagName(item)">
                        </app-svg-icon>
                      </div>

                    </div>
                  </div>
                  <div class="w-full my-10 flex items-center justify-center">
                    <el-button class="w-full rounded-full" size="mini" @click="handlerClickAddNewTag">
                      <app-svg-icon iconName="icon-add-sm"></app-svg-icon>
                      <span>添加新标签</span>
                    </el-button>
                  </div>
                  <div class="h-36 flex items-center justify-end border-t mt-10 pt-14">
                    <el-button size="small" @click="handlerCansole">取消</el-button>
                  </div>
                </div>
              </div>
            </template>
          </PopoverCustom>
          <el-divider direction="vertical" />
          <el-button :disabled="isEdits || !isActiveBg.length" @click="handlerSearch" type="primary" size="small">
            搜索
          </el-button>
          <el-button class="border-none" :disabled="isEdits" size="small" @click="handlerClickEdit">编辑
          </el-button>
        </div>
        <div v-else>
          <el-button size="small" class="border-none" @click="handlerFinish">完成</el-button>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup lang="ts" name="TagHeader">
import { ref, unref, reactive, defineProps, withDefaults, defineEmits, nextTick, computed, CSSProperties, getCurrentInstance, onMounted, watch, toRefs, Ref } from 'vue';
import api from '@/api'
import { succesMsg } from '@/components/Dialog/BoxDialog'
import { TagArr, ObjProperty, PropertyChecked, TagBackRaw, EmitDataType } from './tag.type'
import { cloneDeep } from 'lodash'
import { apiAll, MethodsKey } from './fetch'
import { changeCheckboxStyle } from '@/lib/utils'
import { DeviceDataRaw, ChennelListDataRaw, SrvInfosRaw, DeviceInfosRaw, ChilInfosRaw } from '@/views/putTask/task.type'
import PopoverCustom from '@/components/popoverCustom/index.vue'
const OBJSTYLEFINISH: ObjProperty = {
  '--check-box-checked-color': '#7C3AED',
  '--check-box-checked-bg-color': '#F5F3FF',
  '--check-box-checked-border-color': '#F5F3FF',
  '--check-box-checked-box-shadow-color': '#F5F3FF',
}
const OBJSTYLEEDIT: ObjProperty = {
  '--check-box-checked-color': '#fff',
  '--check-box-checked-bg-color': '#ab4bf5',
  '--check-box-checked-border-color': '#ab4bf5',
  '--check-box-checked-box-shadow-color': '#cd93f9',
}


type PropsType = {
  isActiveBg: string
  isDisabledEdit: boolean
  chennelListAllChecked: DeviceDataRaw[]
  edgeGuid: string
}
const props = withDefaults(defineProps<PropsType>(), {
  isActiveBg: '',
  isDisabledEdit: false,
  edgeGuid: '',
})
const emits = defineEmits(['handlerEdit', 'hanadlerFinish', 'handlerSearch'])

const { updateTags, createTags, getTagListAllApi, deleteTags, collectTags, getChannelListTags, deleteChannelListTags }: Record<MethodsKey, any> = apiAll()
const { isActiveBg, isDisabledEdit, chennelListAllChecked, edgeGuid } = toRefs(props)
const { ctx: that, refs }: any = getCurrentInstance()
const tabNavPadding = 12
const scrollbarDom = ref()
const tabDom = ref()
const translateX = ref(0)
const tagName = ref<string>('')
const isShowFinish = ref(false) // 完成
const isShowEditTag = ref(false) // 编辑新增的标签
const visible: Ref<boolean> = ref(false)
// tag标签的集合
const tagArr: Ref<TagArr[]> = ref([])
const innerTagArr: Ref<TagArr[]> = ref([])
const getTabStyle = computed((): CSSProperties => {
  return { transform: `translateX(${translateX.value}px)` };
})
// 是否可以进行编辑
const isEdits = computed(() => {
  const isFlag = unref(tagArr).some(res => res.checked)
  return !isFlag
})
// 点击tags的ids集合
const ids = computed(() => {
  return unref(tagArr).filter(res => res.checked).map(res => res.id).flat(Infinity)
})
// 点击innertags的ids集合
const innerIds = computed(() => {
  return unref(innerTagArr).filter(res => res.checked).map(res => res.id).flat(Infinity)
})
// 是否可进行收藏
const collectDisabled = computed(() => {
  return !unref(innerTagArr).some(res => res.checked)
})
const dealChennelListData = () => {
  const deviceList = unref(chennelListAllChecked).map(res => {
    return {
      SrvGuid: res.SrvGuid,
      SrvIp: res.ipName,
      DeviceInfos: res.ipList.map(r => {
        if (r.devicesChecked.length) {
          return {
            DeviceId: r.devicesName,
            ChlInfos: r.devicesChecked.map(a => {
              try {
                const parse = JSON.parse(a)
                if (Object.keys(parse).length) {
                  return {
                    ...parse,
                    LabelIds: unref(innerIds)
                  }
                }
              } catch (error) {
                console.log(error)
              }
            }).filter(Boolean)
          }
        }
      }).filter(Boolean)
    }
  }).filter(res => res.DeviceInfos.length)
  return deviceList
}
// 删除标签收藏的时候的处理数据
const dealDeleteData = () => {
  const deviceList = unref(chennelListAllChecked).map(res => {
    return {
      SrvGuid: res.SrvGuid,
      SrvIp: res.ipName,
      DeviceInfos: res.ipList.map(r => {
        return {
          DeviceId: r.devicesName,
          ChlInfos: r.devices.map(a => {
            let items = JSON.stringify({
              UnitId: a.items.UnitId,
              ChlId: a.items.ChlId,
            })
            if (a.lebelIds.length) {
              // 选中删除的
              if (!r.collectionList.includes(items)) {
                return {
                  LabelIds: a.lebelIds,
                  ChlId: a.items.ChlId,
                  UnitId: a.items.UnitId
                }
              }
            }
          }).filter(Boolean)
        }
      }).filter(Boolean).filter(res => res?.ChlInfos.length)
    }
  }).filter(res => res.DeviceInfos.length)
  return deviceList
}

const handleScroll = (offset: number) => {
  const scrollbarDomWidth = scrollbarDom.value
    ? scrollbarDom.value?.offsetWidth
    : 0;
  // It has problem if you use offsetWidth property in dialog. Pleace use scrollWidth property instead of it
  const tabDomWidth = tabDom.value ? tabDom.value.scrollWidth : 0;
  if (offset > 0) {
    translateX.value = Math.min(0, translateX.value + offset);
  } else {
    if (scrollbarDomWidth < tabDomWidth) {
      if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
        translateX.value = Math.max(
          translateX.value + offset,
          scrollbarDomWidth - tabDomWidth - 10
        );
      }
    } else {
      translateX.value = 0;
    }
  }
}
// 标签改变事件
const tagOnChange = (status: boolean, item: TagArr) => {
  item.checked = status
}
// proper里面的多选框
const innerTagOnChange = (status: boolean, item: TagArr, index: number) => {
  item.checked = status
  moveToView(index)
}
// Open popver 
const handlerHidePopper = () => {
  isShowEditTag.value = false
  nextTick(() => {
    innerTagArr.value = unref(innerTagArr).map(res => {
      return {
        ...res,
        checked: false
      }
    })
  })
}
// Tag manage
const tagManage = () => {
  isShowEditTag.value = true
}
// 收藏 list
const handlerClickCollect = async () => {
  const payLoad = {
    SrvInfos: dealChennelListData(),
    EdgeGuid: unref(edgeGuid)
  }
  await collectTags({ EdgeChlInfos: [{ ...payLoad }] })
  if (unref(ids).length) handlerSearch()
  visible.value = false


}

// Onclick Edit
const handlerClickEdit = () => {
  isShowFinish.value = true
  if (unref(isShowFinish)) {
    changeCheckboxStyle(OBJSTYLEFINISH)
  }
  const data: EmitDataType = {
    isShow: true,
    ids: unref(ids)
  }
  emits('handlerEdit', data)
}
// Onclick finish
const handlerFinish = async () => {
  await nextTick()
  changeCheckboxStyle(OBJSTYLEEDIT)
  const data: EmitDataType = {
    isShow: false,
    ids: unref(ids)
  }
  const payLoad = {
    EdgeChlInfos: [
      {
        SrvInfos: dealDeleteData(),
        EdgeGuid: unref(edgeGuid)
      }
    ]
  }
  // TODO 当没有收藏的时候不能编辑删除
  if (dealDeleteData().length) {
    await deleteChannelListTags(payLoad)
    if (unref(ids).length) handlerSearch()
  }
  emits('hanadlerFinish', data)
  isShowFinish.value = false

}
const moveToView = async (index: number) => {
  await nextTick()
  // TODO development and production is different
  let tabItemEl;
  if (process.env.NODE_ENV === 'development') {
    tabItemEl = that.$refs["dynamic" + index][0]?.$el;
  } else {
    tabItemEl = that._.refs["dynamic" + index][0]?.$el;
  }
  const tabItemElOffsetLeft = (tabItemEl as HTMLElement)?.offsetLeft;
  const tabItemOffsetWidth = (tabItemEl as HTMLElement)?.offsetWidth;

  // 标签页导航栏可视长度（不包含溢出部分）
  const scrollbarDomWidth = scrollbarDom.value
    ? scrollbarDom.value?.offsetWidth
    : 0;
  // 已有标签页总长度（包含溢出部分）
  // It has problem if you use offsetWidth property in dialog. Pleace use scrollWidth property instead of it
  const tabDomWidth = tabDom.value ? tabDom.value?.scrollWidth : 0;
  if (tabDomWidth < scrollbarDomWidth || tabItemElOffsetLeft === 0) {
    translateX.value = 0;
  } else if (tabItemElOffsetLeft < -translateX.value) {
    // 标签在可视区域左侧
    translateX.value = -tabItemElOffsetLeft + tabNavPadding;
  } else if (
    tabItemElOffsetLeft > -translateX.value &&
    tabItemElOffsetLeft + tabItemOffsetWidth <
    -translateX.value + scrollbarDomWidth
  ) {
    // 标签在可视区域
    translateX.value = Math.min(
      0,
      scrollbarDomWidth -
      tabItemOffsetWidth -
      tabItemElOffsetLeft -
      tabNavPadding
    );
  } else {
    // 标签在可视区域右侧
    translateX.value = -(tabItemElOffsetLeft - (scrollbarDomWidth - tabNavPadding - tabItemOffsetWidth));
  }

}
// 获取所有标签
const getTagListAll = async () => {
  const [res, success] = await getTagListAllApi({})
  if (success) {
    tagArr.value = res.data.map((r: TagBackRaw) => {
      return {
        id: r.Id,
        name: r.Name,
        checked: false,
      }
    })
    innerTagArr.value = res.data.map((r: TagBackRaw) => {
      return {
        id: r.Id,
        name: r.Name,
        checked: false,
        disabled: true
      }
    })

  }
}
// 创建标签
const handlerCreateTag = async () => {
  const [res, success] = await createTags({ name: unref(tagName).trim() })
  if (success) {
    getTagListAll()
    tagName.value = ''
  }
}
// 标签管理的添加新标签
const handlerClickAddNewTag = () => {
  const obj = {
    id: '',
    name: '',
    checked: false,
    disabled: false,
  }
  innerTagArr.value.unshift(obj)
}
// 删除标签
const handlerDeleteTags = async (item: TagArr) => {
  if (item.id) {
    const [res, flag] = await deleteTags({ id: item.id })
    if (flag) {
      getTagListAll()
    }
  } else {
    innerTagArr.value.shift()
  }

}
// 标签管理的编辑标签功能
const handlerEditTagName = (item: TagArr) => {
  item.disabled = false
}
// 修改标签管理
const handlerBlurTag = async (item: TagArr) => {
  if (item.id) {
    // 修改标签
    const [res, success] = await updateTags({ Id: item.id, Name: item.name })
    if (success) {
      item.disabled = true
      getTagListAll()
    }
  } else {
    if (!item.name) {
      innerTagArr.value.shift()
      return
    }
    // 新增标签
    const [res, success] = await createTags({ name: item.name })
    if (success) {
      getTagListAll()
    }
  }

}
const handlerSearch = async () => {
  const payLoad = {
    ids: unref(ids).join(',')
  }
  const [res, success] = await getChannelListTags({ ...payLoad })
  if (success) {
    emits('handlerSearch', res)

  }
}
// 取消功能
const handlerCansole = () => {
  isShowEditTag.value = false
  innerTagArr.value = innerTagArr.value.filter(item => item.id);
}

watch(isActiveBg, () => {
  if (!unref(isActiveBg).length) {

  }
})

onMounted(() => {
  getTagListAll()
})
</script>




<style lang="scss" scoped>
.tag-popper {
  padding: 0px !important;
}

.el-check-tag {
  background: white;
  border: 1px solid #E6E9ED;
  font-size: 12px;
  color: #111826;
  height: 28px;
}

.el-check-tag:hover {
  background: #F5F3FF;
  color: #7C3AED;
  border-color: #F5F3FF;
}

.is-checked {
  background: #F5F3FF;
  color: #7C3AED;
  border-color: #F5F3FF;
}
</style>