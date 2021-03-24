import Vue from 'vue';

import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    list: [
      {
        id: 1,
        done: true,
      },
      {
        id: 2,
        done: false,
      },
    ],
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
  getters: {
    doneList(state) {
      return state.list.filter(info => info.done);
    },

    doneCount(state, getter) {
      return getter.doneList.length;
    },
  },
  actions: {
    incrementAsync({ commit, state }, option) {
      setTimeout(() => {
        commit('increment');
        console.log(state.count, option);
      }, 1000);
      commit('increment');
    },
  },
});

store.commit('increment');

console.log(store.state.count);

console.log('doneList', store.getters.doneList);
console.log('doneCount', store.getters.doneCount);

store.commit('increment');

console.log(store.state.count);

store.dispatch('incrementAsync', {
  addNumber: 2,
});

console.log(store.state.count);
export default store;
