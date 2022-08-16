import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module
} from 'vuex'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
import { SettingsState, state } from './state'

export const test: Module<SettingsState, any> = {
  state,
  mutations,
  actions,
}



