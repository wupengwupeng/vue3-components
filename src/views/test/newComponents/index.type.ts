export type Key = "1" | "2"

export type Obj = {
  [key: string]: any
}
export type KeyObj = {
  value: string
  isShow: boolean
}
export type TableRowKey = "templateType" | "name" | "sequence" | "id"
export type TableRecordRow = Record<TableRowKey, any>

export type RuleForm = {
  tableDate: TableRecordRow[]
}
export type State = {
  rules: Object
  multipleSelection: TableRecordRow[]
}