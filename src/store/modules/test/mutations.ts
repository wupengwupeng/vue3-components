import { MutationTree } from "vuex";
import { SettingsState } from "./state";
import { SettingsPepole } from './mutations-type';

export type Mutations<T = SettingsState> = {
  [SettingsPepole.CHANGE_SETTING](state: T, payload: any): void
}

export const mutations: MutationTree<SettingsState> & Mutations = {
  [SettingsPepole.CHANGE_SETTING](state: SettingsState, payload: any) {
    const { name, age, sex } = payload;
    state.name = name;
    state.age = age;
    state.sex = sex;
  }
}