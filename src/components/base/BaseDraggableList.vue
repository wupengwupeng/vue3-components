<!--
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-01-19 19:22:27
 * @LastEditors: WJM
 * @LastEditTime: 2021-01-22 13:56:00
-->
<template>
  <div class="board-column">
    <div :class="{ 'board-column-header': isShowHeader }" v-if="isShowHeader">
      <el-input size="mini" placeholder="搜索字段名称">
        <template #prefix>
          <div class="w-36 h-full flex items-center justify-start">
            <app-svg-icon iconName="icon-search-input" />
          </div>
        </template>
      </el-input>
    </div>
    <draggable :list="list" v-bind="$attrs" class="board-column-content" :style="'max-height:' + maxHeight">
      <div v-for="element in list" :key="element.id" class="board-item" :style="'margin:' + margind">
        <div class="flex items-center w-2/3 h-full">
          <app-svg-icon iconName="icon-draggable-item" />
          <span class="ml-6">{{ element.name }}</span>
        </div>
        <div class="flex items-center flex-1 justify-end h-full">
          <slot name="hover" :item="element" />
        </div>
      </div>
      <slot name="emporty" />
    </draggable>
  </div>
</template>

<script lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { defineComponent } from 'vue'
import AppSvgIcon from '../app/AppSvgIcon.vue'
export default defineComponent({
  components: {
    AppSvgIcon,
    draggable: VueDraggableNext,
  },
  props: {
    margind: {
      type: String,
      default: '',
    },
    isShowHeader: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    options: {
      type: Object,
      default: () => {
        return null
      },
    },
    // 最大高度 TODO
    maxHeight: {
      type: String,
      default: 'calc(100vh - 150px)',
    },
  },
  setup(props) {
    // //console.log(props);
  },
})
</script>

<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 40px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    padding: 5px 10px;
    overflow: hidden;
    text-align: center;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    overflow: scroll;
    border: 1px solid transparent;
    // max-height: calc(100vh - 150px);
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    padding: 3px 10px;

    .board-item {
      cursor: move;
      width: 100%;
      height: 32px;
      margin: 5px 12px;
      background-color: #fff;
      text-align: left;
      padding: 5px 10px;
      box-sizing: border-box;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(82, 105, 128, 0.03), 0px 2px 4px -1px rgba(82, 105, 128, 0.06), 0px 3px 6px -1px rgba(108, 122, 168, 0.09);
      display: flex;
      align-items: center;
    }

    .isHeader {
      margin: 0;
    }

    .board-item:hover {
      // TODO 优化
      // border: 1px dashed #9ca3af;
      background: rgb(230, 227, 227);
      box-shadow: 0px 1px 2px rgba(82, 105, 128, 0.03), 0px 2px 4px -1px rgba(82, 105, 128, 0.06), 0px 3px 6px -1px rgba(108, 122, 168, 0.09);
    }
  }
}
</style>
