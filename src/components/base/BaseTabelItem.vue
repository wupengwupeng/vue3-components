<template>
  <div class="table-content">
    <el-table :data="tableData" style="width: 100%" row-key="id" :key="isUpatate" border default-expand-all>
      <el-table-column width="360">
        <template #header>
          <div>
            <span class="mr-5">条件组合</span>
            <app-svg-icon class="hover:cursor-pointer hover:bg-gray-300 rounded w-18 h-18" iconName="icon-all-row"
              @click="handlerAddOuter" />
            <app-svg-icon class="ml-4 hover:cursor-pointer hover:bg-gray-300 rounded w-18 h-18" iconName="icon-add-row"
              @click="handlerClickInner" />
          </div>
        </template>
        <template #default="scope">
          <span>{{ scope.row.id }} </span>
          <app-svg-icon v-show="scope.row.children && scope.row.children.length"
            class="hover:cursor-pointer mx-5 hover:bg-gray-300 rounded w-18 h-18" iconName="icon-all-row"
            @click="handlerChildrenInner(scope.row)" />
          <app-svg-icon v-show="scope.row.children && scope.row.children.length"
            class="ml-4 hover:cursor-pointer hover:bg-gray-300 rounded w-18 h-18" iconName="icon-add-row"
            @click="handlerChildrenRow(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="name">
        <template #header>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column prop="a">
        <template #header>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column prop="a">
        <template #header>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column width="52">
        <template #header>
          <span>移除</span>
        </template>
        <template #default>
          <span style="font-weight: bold; color: #6b7280">移除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
// TODO

import { defineComponent, toRefs, nextTick, getCurrentInstance, onUpdated } from 'vue'
import AppSvgIcon from '../app/AppSvgIcon.vue'
export default defineComponent({
  components: { AppSvgIcon },
  name: 'TableItem',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { list } = toRefs(props)
    let { ctx: that }: any = getCurrentInstance()
    const data = {
      isUpatate: 1,
      tableData: [
        {
          id: 3,
          date: '2016-05-01',
          name: '',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: 'wangxiaohu',
            },
            {
              id: 32,
              date: '2016-05-01',
              name: 'wangxiaohu',
            },
          ],
        },
      ],
    }

    const methodMy = {
      handlerAddOuter() {
        //console.log('添加外面的按钮')
        const obj = {
          // id必须是唯一的
          id: Math.random(),
          date: '882394234',
          name: '',
          children: [
            {
              id: Math.random(),
              date: '882394234',
              name: '吴鹏',
            },
          ],
        }
        nextTick(() => {
          data.isUpatate = Math.random()
          data.tableData.push(obj)
        })
        that.$forceUpdate()
      },
      // 点击里面的按钮
      handlerClickInner() {
        const obj: any = {
          // id必须是唯一的
          id: Math.random(),
          date: '882394234',
          name: '吴鹏',
        }
        nextTick(() => {
          data.isUpatate = Math.random()
          data.tableData.push(obj)
        })
        // 需要强制刷新才可以进行一个更新
        that.$forceUpdate()
      },
      // 添加孩子中的整个
      handlerChildrenInner(row: any) {
        const obj = {
          // id必须是唯一的
          id: Math.random(),
          date: '爱的色放',
          name: '',
          children: [
            {
              id: Math.random(),
              date: '阿三顶顶发生地方',
              name: '张三的孩子',
            },
          ],
        }
        nextTick(() => {
          row.children.push(obj)
          data.isUpatate = Math.random()
        })
        that.$forceUpdate()
      },
      handlerChildrenRow(row: any) {
        //console.log(row)
      },
      expendAll() {
        const ecl = that.$el.getElementsByClassName('el-table__expand-icon')
        for (let i = 0; i < ecl.length; i++) {
          ecl[i].click()
        }
        that.$forceUpdate()
      },
    }

    onUpdated(() => {
      methodMy.expendAll()
    })
    return {
      list,
      ...toRefs(data),
      ...methodMy,
    }
  },
})
</script>

<style lang="scss">
.table-content {
  width: 100%;

  // background: red;
  .table {
    width: 100%;

    .border-item {}
  }

  .el-table th {
    background: white;
  }

  .el-table--border {
    border: none !important;
  }
}
</style>