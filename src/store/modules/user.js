import http from '@/libs/axios'
import { defaultSet } from '@/libs/util';

const user = {
  state: {
    account: '',
    userid: '',
    bindCompany: '',
    headPhoto: ''
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_USERID: (state, userid) => {
      state.userid = userid
    },
    SET_BINDCOMPANY: (state, bindCompany) => {
      state.bindCompany = bindCompany
    },
    SET_HEADPHOTO: (state, headPhoto) => {
      state.headPhoto = headPhoto || defaultSet.img.expert;
    }
  },

  actions: {
    // 用户名登录
    LoginByAccount({ commit }, userInfo) {
      const phone = userInfo.phone
      const pw = userInfo.pw
      return new Promise((resolve, reject) => {
        http.post('/ajax/sys/login', {
          phone, pw
        }).then(response => {
          if (response.success) {
            if (response.data !== null) {
              const dataS = response.data
              commit('SET_USERID', dataS.id);
              commit('SET_ACCOUNT', dataS.account);
              commit('SET_HEADPHOTO', dataS.head);
              commit('SET_BINDCOMPANY', dataS.bindCompany);
              localStorage.setItem('userid', dataS.id);
              localStorage.setItem('uaccount', dataS.account);
              localStorage.setItem('bcid', dataS.bindCompany);
              localStorage.setItem('curcomp', dataS.comp);
              localStorage.setItem('curphone', dataS.linkPhone);
            }
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        http.get('/ajax/sys/user').then(response => {
          if (response.data) {
            const dataS = response.data
            commit('SET_USERID', dataS.id);
            commit('SET_ACCOUNT', dataS.account);
            commit('SET_HEADPHOTO', dataS.head);
            commit('SET_BINDCOMPANY', dataS.bindCompany);
            localStorage.setItem('userid', dataS.id);
            localStorage.setItem('uaccount', dataS.account);
            localStorage.setItem('bcid', dataS.bindCompany);
            localStorage.setItem('curcomp', dataS.comp);
            localStorage.setItem('curphone', dataS.linkPhone);
          } else {
            commit('SET_USERID', '')
            commit('SET_ACCOUNT', '')
            commit('SET_HEADPHOTO', '');
            localStorage.removeItem('userid');
            localStorage.removeItem('uaccount');
            localStorage.removeItem('bcid');
            localStorage.removeItem('curcomp');
            localStorage.removeItem('curphone');
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        http.get('/ajax/sys/logout').then(response => {
          commit('SET_USERID', '')
          commit('SET_ACCOUNT', '')
          commit('SET_BINDCOMPANY', '')
          commit('SET_HEADPHOTO', '');
          localStorage.removeItem('userid');
          localStorage.removeItem('uaccount');
          localStorage.removeItem('bcid');
          localStorage.removeItem('curcomp');
          localStorage.removeItem('curphone');
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERID', '')
        commit('SET_ACCOUNT', '')
        commit('SET_BINDCOMPANY', '')
        commit('SET_HEADPHOTO', '');
        localStorage.clear()
        resolve()
      })
    }
  }
}
export default user
