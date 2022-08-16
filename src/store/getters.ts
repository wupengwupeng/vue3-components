import type { GetterTree } from 'vuex'
import type { RootState } from './type'
import { RootGetters } from './type'

const getters: GetterTree<RootState, RootState> = {
  [RootGetters.GET_USER_CONFIG_BY_KEY](state, key: string) {
    return state.configs.find(config => config.key === key)
  },
}

export default getters
