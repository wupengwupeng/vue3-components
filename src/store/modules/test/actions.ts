import { ActionTree, ActionContext } from "vuex";
import { SettingActionsType } from './actions-type'
import { SettingsPepole } from "./mutations-type";
import { SettingsState } from "./state";

export interface Actions {
  [SettingActionsType.ACTIONG_CHANGE_SETTING]({ commit }: any, payLoad: any): void
}

export const actions: ActionTree<SettingsState, any> & Actions = {
  [SettingActionsType.ACTIONG_CHANGE_SETTING]({ commit }, payload: any) {
    commit(SettingsPepole.CHANGE_SETTING, payload)
  }
}