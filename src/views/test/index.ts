
export const column = [
  { type: 'selection' },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '日期',
    prop: 'date',
  },
  {
    label: '地址',
    prop: 'address',
    slot: 'address'
  },
  {
    label: 'custom',
    prop: 'name',
    slot: 'custom'
  },
  {
    label: '操作',
    prop: 'button',
    type: 'button'
  },
]