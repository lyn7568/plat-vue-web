const chat = {
  state: {
    chatDetailLocal: [],
    selectChatId: '',
    selectKxUser: '',
    ifFirstChat: false,
    kxLastTime: '0'
  },
  mutations: {
    chatDetailLocal(state, value) {
      state.chatDetailLocal = value
    },
    selectChatId(state, value) {
      state.selectChatId = value
    },
    selectKxUser(state, value) {
      state.selectKxUser = value
    },
    ifFirstChat(state, value) {
      state.ifFirstChat = value
    },
    kxLastTime(state, value) {
      state.kxLastTime = value
    }
  },

  actions: {
    chatDetailAction: ({ commit }, value) => commit('chatDetailLocal', value),
    selectSession: ({ commit }, value) => commit('selectChatId', value),
    selectKxUserAction: ({ commit }, value) => commit('selectKxUser', value),
    ifFirstChatActiion: ({ commit }, value) => commit('ifFirstChat', value),
    kxLastTimeAction: ({ commit }, value) => commit('kxLastTime', value)
  }
}

export default chat
