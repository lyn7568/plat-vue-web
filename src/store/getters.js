const getters = {
  account: state => state.user.account,
  bindCompany: state => state.user.bindCompany,
  headPhoto: state => state.user.headPhoto,

  chatDetailLocal: state => state.chat.chatDetailLocal,
  selectChatId: state => state.chat.selectChatId,
  selectKxUser: state => state.chat.selectKxUser,
  ifFirstChat: state => state.chat.ifFirstChat,
  kxLastTime: state => state.chat.kxLastTime
}

export default getters
