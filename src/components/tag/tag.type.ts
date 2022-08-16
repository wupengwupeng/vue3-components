import { DeviceDataRaw, ChennelListDataRaw, SrvInfosRaw, DeviceInfosRaw, ChilInfosRaw } from '@/views/putTask/task.type'
export type TagArr = {
  id: string;
  name: string;
  checked: boolean;
  disabled?: boolean
}
export type PropertyChecked = '--check-box-checked-color' | '--check-box-checked-bg-color' | '--check-box-checked-border-color' | '--check-box-checked-box-shadow-color'
export type ObjProperty = {
  [k in PropertyChecked]: string
}

export type TagBackRaw = {
  Id: string
  Name: string
  checked?: boolean
  disabled?: boolean
}

export type EmitDataType = {
  isShow: boolean
  ids: Array<string>
}

export type ChennelListPayLoad<T> = {
  [key in keyof T]: T[key]
}
