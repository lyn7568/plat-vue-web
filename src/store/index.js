import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    modules: {
      user
    },
    getters
  });
}
