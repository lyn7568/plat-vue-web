import Vue from 'vue';

const plat = {
  state: {
    pinfo: ''
  },
  mutations: {
    SET_PINFO: (state, pinfo) => {
      state.pinfo = pinfo
    }
  },
  actions: {
    // 获取plat配置信息
    getPlatInfo({ commit }) {
        Vue.$axios.get('../../../static/plat-info.js', { }).then((res) => {
          console.log(res)
          commit('SET_PINFO', res);
        })
    }
  }
};

export default plat;
