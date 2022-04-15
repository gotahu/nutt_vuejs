import {createStore, Store, useStore as baseUseStore} from 'vuex'
import {InjectionKey} from "vue";

import * as MutationTypes from "./mutationType"

export interface GlobalState {
  modalCode: string
}

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol()

export const store = createStore({
  state: {
    modalCode: "",
    keyword: "",
    department: 20,
    subject: "全科目",
    semesters: ["I", "III"],
    types: []
  },
  getters: {
    modalCode(state) {
      return state.modalCode
    },
    keyword(state) {
      return state.keyword
    },
    department(state) {
      return state.department
    },
    subject(state) {
      return state.subject
    },
    semesters(state) {
      return state.semesters
    },
    types(state) {
      return state.types
    }
  },
  mutations: {
    [MutationTypes.CHANGE_MODAL_CODE](state, code) {
      state.modalCode = code
    },
    [MutationTypes.CHANGE_SEARCH](state, array) {
      state.keyword = array[0]
      state.department = array[1]
      state.subject = array[2]
      state.semesters = array[3]
      state.types = array[4]
    }
  },
  actions: {
  },
  modules: {
  }
})

export function useStore() {
  return baseUseStore(StateKey)
}