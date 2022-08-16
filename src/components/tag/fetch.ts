import { ref, reactive, unref, computed } from 'vue'
import api from '@/api'
import { succesMsg } from '@/components/Dialog/BoxDialog'
import { ApiResponse } from '@/lib/request'
export type MethodsKey = 'updateTags'
  | 'createTags'
  | 'getTagListAllApi'
  | 'deleteTags'
  | 'collectTags'
  | 'getChannelListTags'
  | 'deleteChannelListTags'
type Parems = {
  Id: string
  Name: string
}


export const apiAll = (): Record<MethodsKey, any> => {

  const dataBack = (res: ApiResponse | null, str?: string) => {
    if (res?.code === '1001') {
      if (typeof str === 'string') succesMsg(str)
      return [res, true]
    } else {
      return [, false]
    }
  }
  // 修改标签
  const updateTags = async (parems: Parems) => {
    const [res, data] = await api.task.updateTags({ ...parems })
    return dataBack(res, '修改成功')
  }

  //创建标签
  const createTags = async (parems: { name: string }) => {
    const [res, data] = await api.task.createTags({ ...parems })
    return dataBack(res, '创建成功')
  }
  // 获取所有标签
  const getTagListAllApi = async () => {
    const [res] = await api.task.getTagListAll()
    return dataBack(res)
  }

  // 删除标签
  const deleteTags = async (parems: { id: string }) => {
    const [res] = await api.task.deleteTags({ ...parems })
    return dataBack(res, '删除成功')
  }
  // 收藏标签 list
  const collectTags = async <T extends Record<string, unknown> = {}>(parems: T) => {
    const [res] = await api.task.addCollectChannelListTags({ ...parems })
    return dataBack(res, '收藏成功')
  }
  // 获取所有之前收藏的标签的通道集合
  const getChannelListTags = async<T = string>(parems: T) => {
    const [res] = await api.task.getChannelListTags({ ...parems })
    return dataBack(res)
  }
  // 删除之前收藏的标签的通道集合
  const deleteChannelListTags = async<T>(parems: T) => {
    const [res] = await api.task.deleteChannelListTags({ ...parems })
    return dataBack(res, '修改成功')
  }

  return {
    updateTags,
    createTags,
    getTagListAllApi,
    deleteTags,
    collectTags,
    getChannelListTags,
    deleteChannelListTags
  }

}