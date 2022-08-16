<template>
  <div class="w-full h-full">
    <div class="ml-12 mt-12">
      <el-radio v-model="radio1" label="1">每{{ wildCard }}允许的通配符[, _ * /]</el-radio>
    </div>
    <div class="w-full h-1 bg-gray-300 mt-4"></div>
    <div v-if="!(isActive === 0 || isActive === 1)">
      <div class="ml-12 mt-12">
        <el-radio v-model="radio1" label="2">不指定</el-radio>
      </div>
      <div class="w-full h-1 bg-gray-300 mt-4"></div>
    </div>
    <div class="ml-12 mt-12 flex items-center">
      <div class="w-149">
        <el-radio v-model="radio1" label="3">周期{{ unit }}</el-radio>
      </div>
      <div class="flex-1 flex justify-between"
        v-if="isActive === 0 || isActive === 1 || isActive === 2 || isActive === 3">
        <div>
          <el-input size="mini" v-model="value1StartTime" placeholder="开始时间" clearable> </el-input>
        </div>
        <div class="ml-10">
          <el-input size="mini" clearable v-model="value1EndTime" placeholder="结束时间"> </el-input>
        </div>
      </div>
      <div v-else class="flex justify-around">
        <div class="flex px-10">
          <span
            class="w-80 flex justify-center translate-x-3 rounded rounded-r-none items-center border border-r-0 bg-gray-50">从星期</span>
          <el-input v-model="startTimeWeek" placeholder="开始日" size="mini" clearable></el-input>
        </div>
        <div>
          <el-input v-model="endTimeWeek" placeholder="结束日" size="mini" clearable></el-input>
        </div>
      </div>
    </div>
    <div class="w-full h-1 bg-gray-300 mt-4" v-if="isActive === 4"></div>
    <div class="ml-12 mt-12 flex items-center" v-if="isActive === 4">
      <div class="w-149">
        <el-radio v-model="radio1" label="9">执行周</el-radio>
      </div>
      <div class="flex-1 flex">
        <div class="flex">
          <span class="w-38 bg-gray-50 border rounded flex items-center translate-x-2 justify-center">第</span>
          <el-input v-model="firstWeek" placeholder="输入日期" size="mini" clearable></el-input>
        </div>
        <div class="flex">
          <span
            class="w-100 flex bg-gray-50 border rounded roundeditems-center justify-center translate-x-3">周的星期</span>
          <el-input v-model="weekendDay" placeholder="输入日期" size="mini" clearable></el-input>
        </div>
      </div>
    </div>

    <!-- 本月最后一个 -->
    <div class="w-full h-1 bg-gray-300 mt-4" v-if="isActive === 4"></div>
    <div class="ml-12 mt-12 flex items-center" v-if="isActive === 4">
      <div class="w-149">
        <el-radio v-model="radio1" label="10">本月最后一个</el-radio>
      </div>
      <div class="flex-1">
        <div class="flex">
          <span class="flex w-52 border rounded justify-center items-center bg-gray-50">星期</span>
          <el-input v-model="lastMonth" size="mini" class="-translate-x-3" placeholder="输入日期" clearable></el-input>
        </div>
      </div>
    </div>
    <div class="w-full h-1 bg-gray-300 mt-4" v-if="isActive !== 4"></div>
    <div class="ml-12 w-full mt-12 flex items-center" v-if="isActive !== 4">
      <div class="w-149">
        <el-radio v-model="radio1" label="4">开始{{ unit }}</el-radio>
      </div>
      <div class="flex-1 pr-12">
        <el-input size="mini" :placeholder="'请输入开始' + unit" v-model="startTime" clearable></el-input>
      </div>
    </div>
    <div class="ml-12 w-full mt-6 flex items-center" v-if="isActive !== 4">
      <div class="w-149">
        <span class="">执行间隔{{ interVal }}</span>
      </div>
      <div class="flex-1 pr-12">
        <el-input class="mt-5" size="mini" :placeholder="'请输入执行间隔' + interVal" v-model="intervalTime" clearable>
        </el-input>
      </div>
    </div>
    <div class="w-full h-1 bg-gray-300 mt-2" v-if="isActive === 2"></div>
    <div class="ml-12 w-full mt-12 flex items-start" v-if="isActive === 2">
      <div class="w-149">
        <el-radio v-model="radio1" label="7">每月</el-radio>
      </div>
      <div class="flex-1 pr-12">
        <el-input v-model="everMonth" size="mini" clearable placeholder="输入日期"></el-input>
      </div>
    </div>
    <div class="w-full h-1 bg-gray-300 mt-2" v-if="isActive === 2"></div>
    <div class="ml-12 w-full mt-12 flex items-start" v-if="isActive === 2">
      <div class="w-149">
        <el-radio v-model="radio1" label="8">本月最后一周</el-radio>
      </div>
    </div>
    <div class="w-full h-1 bg-gray-300 mt-4"></div>
    <div class="ml-12 w-full mt-12 flex items-start">
      <div class="w-149">
        <el-radio v-model="radio1" label="6">指定</el-radio>
      </div>
      <div class="flex-1">
        <div v-if="isActive === 0">
          <el-checkbox-group size="mini" v-model="checkboxGroup1">
            <el-checkbox-button v-for="(item, index) in 60" :key="index + 's'" border
              :label="`${index < 10 ? `0${index}` : index}`">{{
              index < 10 ? `0${index}` : index }}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div v-if="isActive === 1">
          <el-checkbox-group size="mini" v-model="checkboxGroup2">
            <el-checkbox-button v-for="(item, index) in 24" :key="index + 'b'" border
              :label="`${index < 10 ? `0${index}` : index}`">{{
              index < 10 ? `0${index}` : index }}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div v-if="isActive === 2">
          <el-checkbox-group size="mini" v-model="checkboxGroup3">
            <el-checkbox-button v-for="item in 31" :key="item + 'c'" border :label="`${item < 10 ? `0${item}` : item}`">
              {{ item < 10 ? `0${item}` : item }}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div v-if="isActive === 3">
          <el-checkbox-group size="mini" v-model="checkboxGroup4">
            <el-checkbox-button v-for="item in 12" :key="item + 'd'" border :label="`${item < 10 ? `0${item}` : item}`">
              {{ item < 10 ? `0${item}` : item }}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div v-if="isActive === 4">
          <el-checkbox-group size="mini" v-model="checkboxGroup5">
            <el-checkbox-button v-for="item in 7" :key="item + 'e'" border :label="`${item < 10 ? `0${item}` : item}`">
              {{ item < 10 ? `0${item}` : item }}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const wildCardArr: Array<string> = ['分钟', '小时', '日', '月', '周']
const timeArr: Array<string> = ['分钟(min)', '时间(h)', '日期(D)', '月份(m)', '']
const timeArrTwo: Array<string> = ['分钟数(min)', '时间(h)', '天数(D)', '月数(m)', '']
import { defineComponent, reactive, ref, toRefs, computed, watch } from 'vue'
export default defineComponent({
  name: 'Cron',
  props: {
    isActive: {
      type: Number,
      default: 0,
    },
    isBackData: {
      type: String,
      default: '*',
    },
  },
  setup(props, { emit }) {
    const { isActive } = toRefs(props)
    const radio1 = ref<string>('1')
    // 开始时间
    const value1StartTime = ref<string>('')
    const value1EndTime = ref<string>('')

    // 周的开始日
    const startTimeWeek = ref<string>('')
    const endTimeWeek = ref<string>('')

    // 周的执行周
    const firstWeek = ref<string>('')
    const weekendDay = ref<string>('')
    // 本月最后一个
    const lastMonth = ref<string>('')

    const startTime = ref<string>('')

    // 每月
    const everMonth = ref<string>('')
    // 间隔时间
    const intervalTime = ref<string>('')

    const state: any = reactive({
      expressionField: {
        min: '*',
        hour: '*',
        day: '*',
        month: '*',
        week: '*',
      },
      checkboxGroup1: [],
      checkboxGroup2: [],
      checkboxGroup3: [],
      checkboxGroup4: [],
      checkboxGroup5: [],
    })

    const min = computed(() => {
      const obj: any = {
        '1': '*',
        '2': '?',
        '3': `${value1StartTime.value}-${value1EndTime.value}`,
        '4': `${startTime.value}/${intervalTime.value}`,
        '6': `${sort(state.checkboxGroup1).join(',')}`,
      }
      return obj[radio1.value]
    })

    const hour = computed(() => {
      const obj: any = {
        '1': '*',
        '2': '?',
        '3': `${value1StartTime.value}-${value1EndTime.value}`,
        '4': `${startTime.value}/${intervalTime.value}`,
        '6': `${sort(state.checkboxGroup2).join(',')}`,
      }
      return obj[radio1.value]
    })
    const day = computed(() => {
      const obj: any = {
        '1': '*',
        '2': '?',
        '3': `${value1StartTime.value}-${value1EndTime.value}`,
        '4': `${startTime.value}/${intervalTime.value}`,
        '7': `${everMonth.value}W`,
        '8': `L`,
        '6': `${sort(state.checkboxGroup3).join(',')}`,
      }
      return obj[radio1.value]
    })
    const month = computed(() => {
      const obj: any = {
        '1': '*',
        '2': '?',
        '3': `${value1StartTime.value}-${value1EndTime.value}`,
        '4': `${startTime.value}/${intervalTime.value}`,
        '6': `${sort(state.checkboxGroup4).join(',')}`,
      }
      return obj[radio1.value]
    })
    const week = computed(() => {
      const obj: any = {
        '1': '*',
        '2': '?',
        '3': `${startTimeWeek.value}/${endTimeWeek.value}`,
        '9': `${firstWeek.value}#${weekendDay.value}`,
        '10': `${lastMonth.value}L`,
        '6': `${sort(state.checkboxGroup5).join(',')}`,
      }
      return obj[radio1.value]
    })
    watch(
      [radio1, value1StartTime, value1EndTime, startTime, intervalTime, everMonth, startTimeWeek, endTimeWeek, firstWeek, weekendDay, lastMonth],
      (newVal: any, oldVal) => {
        emit('minMethods', min)
        emit('hourMethods', hour)
        emit('dayMethods', day)
        emit('monthMethods', month)
        emit('weekMethods', week)
      },
      { deep: true }
    )

    // 接收父组件传来的值
    watch(
      () => props.isBackData,
      (newVal, oldVal) => {
        if (newVal.includes('*')) {
          radio1.value = '1'
        } else if (newVal.includes('-')) {
          radio1.value = '3'
          const arr = newVal.split('-')
          value1StartTime.value = arr[0]
          value1EndTime.value = arr[1]
        } else if (newVal.includes('/')) {
          radio1.value = '4'
          if (props.isActive !== 4) {
            const arr = newVal.split('/')
            startTime.value = arr[0]
            intervalTime.value = arr[1]
          } else {
            const arr = newVal.split('/')
            startTimeWeek.value = arr[0]
            endTimeWeek.value = arr[1]
          }
        } else if (newVal.includes(',') || newVal.includes('')) {
          radio1.value = '6'
          const arr = newVal.split(',')
          switch (props.isActive) {
            case 0:
              state.checkboxGroup1 = arr
              break
            case 1:
              state.checkboxGroup2 = arr
              // //console.log(state.checkboxGroup2);
              break
            case 2:
              state.checkboxGroup3 = arr
              break
            case 3:
              state.checkboxGroup4 = arr
              // //console.log(state.checkboxGroup4);
              break
            case 4:
              state.checkboxGroup5 = arr
              // //console.log(state.checkboxGroup5);
              break
            default:
              //console.log('nidaye')
              break
          }
        } else if (newVal.includes('?')) {
          radio1.value = '2'
        } else if (newVal.includes('W')) {
          radio1.value = '7'
          everMonth.value = newVal.substr(0, newVal.length - 1)
        } else if (newVal.includes('L')) {
          radio1.value = '8'
          if (props.isActive === 4) {
            lastMonth.value = newVal.substr(0, newVal.length - 1)
          }
        } else if (newVal.includes('#')) {
          const arr = newVal.split('#')
          firstWeek.value = arr[0]
          if (arr.length <= 1) {
            weekendDay.value = '0'
          } else {
            weekendDay.value = arr[1]
          }
        }

        // //console.log(newVal, 77777777777);
      }
    )

    // 通配符
    const wildCard = computed(() => {
      return wildCardArr[props.isActive]
    })
    // 开始时间 单位
    const unit = computed(() => {
      return timeArr[props.isActive]
    })
    // 间隔时间的单位
    const interVal = computed(() => {
      return timeArrTwo[props.isActive]
    })

    // 排序方法
    function sort(arr: any) {
      return arr.sort((x: any, y: any) => {
        return x - y
      })
    }

    return {
      radio1,
      isActive,
      ...toRefs(state),
      value1StartTime,
      value1EndTime,
      startTimeWeek,
      endTimeWeek,
      firstWeek,
      weekendDay,
      lastMonth,
      everMonth,
      startTime,
      intervalTime,
      wildCard,
      unit,
      interVal,

      min,
      hour,
      day,
      month,
      week,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-checkbox-button {
  margin-right: 10px;
  margin-bottom: 10px;

  .el-checkbox-button__inner {
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    border-radius: 6px;
    border: 1px solid #d3d8e0;
  }

  // border: 1px solid #9ca3af;
  // border-radius: 999px;
}
</style>