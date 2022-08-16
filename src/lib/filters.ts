import dayjs from 'dayjs'

export function formatDate(time: number | string): string {
  if (!time) return ''
  return dayjs(time).format('YYYY-MM-DD')
}
export function formatDatetime(time: number | string): string {
  if (!time) return ''
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export function formatDateHour(time: number | string): string {
  if (!time) return ''
  return dayjs(time).format('HH:mm')
}

// 时分转时间戳
export function unixDateHour(time: number | string): any {
  if (!time) return '';
  return dayjs(time).unix();
}


