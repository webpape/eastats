import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export interface IState {
   search: unknown
   searchList: unknown
   favoriteList: unknown
   blackList: unknown
   settings: unknown
}

export default store(function () {
   const Store = createStore({
      state: {
         search: '',
         searchList: {},
         favoriteList: {},
         blackList: {},
         settings: {}
      },
      getters: {
         search: (state) => state.search,
         searchList: (state) => state.searchList,
         favoriteList: (state) => state.favoriteList,
         blackList: (state) => state.blackList,
         settings: (state) => state.settings
      },
      mutations: {
         SET_SEARCH: (state: IState, payload) => (state.search = payload),
         SET_SEARCH_LIST: (state: IState, payload) => (state.searchList = payload),
         SET_FAVORITE_LIST: (state: IState, payload) => (state.favoriteList = payload),
         SET_BLACK_LIST: (state: IState, payload) => (state.blackList = payload),
         SET_SETTINGS: (state: IState, payload) => (state.settings = payload)
      },
      // enable strict mode (adds overhead!)
      // for dev mode and --debug builds only
      strict: !!process.env.DEBUGGING,
      plugins:
         process.env.NODE_ENV !== 'production'
            ? [/* createLogger(), */ createPersistedState({ storage: window.sessionStorage })]
            : [createPersistedState()]
   })

   return Store
})
