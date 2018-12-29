import http from '@/libs/axios'
import Cookies from 'js-cookie'
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
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        http.get('/ajax/sys/user').then(response => {
          if (response.data) {
            const dataS = response.data
            commit('SET_USERID', dataS.id);
            commit('SET_ACCOUNT', dataS.account);
            commit('SET_HEADPHOTO', dataS.head);
            commit('SET_BINDCOMPANY', dataS.bindCompany);
            Cookies.set('userid', dataS.id);
            Cookies.set('uaccount', dataS.account);
            Cookies.set('bcid', dataS.bindCompany);
          } else {
            commit('SET_USERID', '')
            commit('SET_ACCOUNT', '')
            commit('SET_HEADPHOTO', '');
            Cookies.remove('userid')
            Cookies.remove('uaccount');
            Cookies.remove('bcid')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        http.get('/ajax/sys/logout').then(() => {
          commit('SET_USERID', '')
          commit('SET_ACCOUNT', '')
          commit('SET_BINDCOMPANY', '')
          commit('SET_HEADPHOTO', '');
          Cookies.remove('userid')
          Cookies.remove('uaccount');
          Cookies.remove('bcid')
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
        Cookies.remove('userid')
        Cookies.remove('uaccount');
        Cookies.remove('bcid')
        resolve()
      })
    }
  }
}

export default user
