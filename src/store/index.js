import Vue from 'vue';
import Vuex from 'vuex';
import plat from './modules/plat';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    plat
  },
  getters
});

export default store;
