import user from './modules/user';
import chat from './modules/chat';
import getters from './getters';

const store = new Vuex.Store({
  modules: {
    user,
    chat
  },
  getters
})

export default store
