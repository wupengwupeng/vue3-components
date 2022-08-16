import { pick } from 'lodash'
import { initEChartsWithTheme } from './echarts'
import { ElMessage, ElNotification } from 'element-plus'
const reClsMap: any = {}
export function matchMediaPrefersColorSchemeDark(): boolean {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
}

export function getRandomColor(): string {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 37%)`
}

export function pickAssign<T = Record<string, unknown>, K = Record<string, unknown>>(target: T, source: K): T {
  return Object.assign(target, pick(source, Object.keys(target)))
}

export const asc = (arr: number[]): number[] => arr.sort((a, b) => a - b)
export const sum = (a: number, b: number): number => a + b
export const square = (x: number): number => x ** 2
export const mean = (arr: number[]) => arr.reduce(sum) / arr.length
export function stdev(arr: number[]) {
  const m = mean(arr)
  return Math.sqrt(arr.map(x => square(x - m)).reduce(sum) / arr.length)
}

/**
 * 标准正态分布函数
 * @@param x 数据
 * @@param mean 平均数
 * @@param stdev 标准差
 */
export function normalDistributionFun(x: number, mean: number, stdev: number): number {
  return (1 / (Math.sqrt(2 * Math.PI) * stdev)) * Math.exp((-1 * (x - mean) ** 2) / (2 * stdev ** 2))
}

export function quantile(ascArr: number[], p: number): number {
  const H = (ascArr.length - 1) * p + 1
  const h = Math.floor(H)
  const v = Number(ascArr[h - 1])
  const e = H - h
  return e ? v + e * (ascArr[h] - v) : v
}

export function sliceData(data: number[], start: number, end: number): number[] {
  return data.slice(start, end + 1)
}

export function formatTableDataToJsonByKeys<T, K extends keyof T>(data: T[], keys: K[]): T[K][][] {
  return data.map(i => keys.map(key => i[key]))
}

export function initECharts(id: string) {
  const chartDom = document.getElementById(id) as HTMLElement
  return initEChartsWithTheme(chartDom)
}

// 日期格式化
export function parseTime(time: string | number, pattern?: string) {
  if (arguments.length === 0 || !time) return null;
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000;
    }
    date = new Date(time);
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };

  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    // @ts-ignore
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
}

// 这个方法有bug
export function getUrlKey(name: any) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
// 获取url地址栏上的token值。
export function getQueryString(name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return "";
}

export function showError(message: string) {
  ElMessage({
    type: 'error',
    message,
  })
}
export function showSuccess(message: string) {
  ElMessage({
    type: 'success',
    message,
  })
}


// 将文字输入图片
// export function textToImg(name: any, width: any, height: any) {
//   var fsize = 120;
//   var fontSize = 120;
//   var fontWeight = "normal";
//   var canvas = document.getElementById("head_canvas_default");
//   var img1 = document.getElementById("head_canvas_default");
//   canvas.width = width;
//   canvas.height = height;
//   var context = canvas.getContext("2d");
//   context.fillStyle = 'transparent';
//   context.fillRect(0, 0, canvas.width, canvas.height);
//   context.fillStyle = "#66CCFF";
//   context.font = fontWeight + " " + fsize + "px sans-serif";
//   context.textAlign = "left";
//   context.textBaseline = "top";
//   context.fillText(name, 0, 0);
//   return canvas.toDataURL("image/png")
// }


// 是否是空对象
export function isEmporty(obj: any) {
  if (!obj) return true;
  return !Object.keys(obj).length
}

// 复制
export function copyToClipboard(element: HTMLInputElement | HTMLTextAreaElement) {
  element.select()
  document.execCommand('Copy')
  window.getSelection()?.removeAllRanges()
}


// 基本类型数组去重
export const uniquArr = (arr: any) => {
  const newArr: any = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr
}


// 全局设置checkbox的样式
export const changeCheckboxStyle = <T extends Record<string, string>>(obj: T) => {
  Object.keys(obj).forEach((res: string) => {
    document.documentElement.style.setProperty(res, obj[res])
  })
}

export function getTypeComponets(type: string) {
  switch (type) {
    case 'number':
      return 'el-input-number'
    case 'text':
      return 'el-input'
    case 'radio':
      return 'my-radio'
    case 'multiple':
      return 'my-checkbox'
    case 'date':
      return 'el-date-picker'
    case 'range':
      return 'el-slider'
    case 'select':
      return 'my-select'
    default:
      break
  }
}

// 字符串转时间格式
export function stringToDate(val: string) {
  return new Date(val)
}


function getClsRE(cls: string) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g')
  }
  return reClsMap[cls]
}
function hasClass(elem: HTMLElement, cls: string) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls))
}

/**
 * 检查触发源是否属于目标节点
 */
export function getEventTargetNode(evnt: Event, container: HTMLElement | null, queryCls?: string, queryMethod?: Function) {
  let targetElem
  let target: any = evnt.target
  while (target && target.nodeType && target !== document) {
    if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
      targetElem = target
    } else if (target === container) {

      return { flag: queryCls ? !!targetElem : true, container, targetElem: targetElem }
    }
    target = target.parentNode
  }
  return { flag: false }
}


/**
 * json对象转json字符串
 * @param { Object } json json对象
 */
export function stringifyJson(json: { [key: string]: any }) {
  return JSON.stringify(json, (k, v) => {
    // 将正则对象转换为正则字符串
    if (v instanceof RegExp) {
      return v.toString();
    }

    return v;
  });
}

// 生成唯一的id
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 去重排序
export function uniqueSort(arr: any[], key?: string | undefined) {
  const sort = (a: number, b: number) => Number(a) - Number(b)
  if (key === undefined) return Array.from([...new Set(arr)]).sort(sort)
  const newArr = arr.map(res => res[key]).sort(sort)
  return newArr
}





