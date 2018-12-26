import Vue from 'vue';
import Vuex from 'vuex';
import plat from './modules/plat';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    plat,
    user
  },
  getters
});

export default store;
