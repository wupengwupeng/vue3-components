export interface RootStates {
  name: string
  age: string
  sex: string
}

export enum RootMutations {
  SET_LANG = 'SET_LANG',
  SET_TOKEN = 'SET_TOKEN',
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
}