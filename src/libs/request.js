import Vue from 'vue';
import axiosUtil from './axios';

let requestP = axiosUtil
let requestK = axiosUtil

requestP.defaults.baseURL = process.env.BASE_API
requestK.defaults.baseURL = process.env.KX_API

var ret = {
  getp: function(url, data, sh, eh) {
    requestP({
      method: 'get',
      url: url,
      params: data
    }).then(res => {
      sh(res);
    }).catch(err => {
      if (eh) eh(err);
    });
  },
  postp: function(url, data, sh, eh) {
    requestP({
      method: 'post',
      url: url,
      data: data
    }).then(res => {
      sh(res);
    }).catch(err => {
      if (eh) eh(err);
    });
  },
  getk: function(url, data, sh, eh) {
    requestK({
      method: 'get',
      url: url,
      params: data
    }).then(res => {
      sh(res);
    }).catch(err => {
      if (eh) eh(err);
    });
  },
  postk: function(url, data, sh, eh) {
    requestK({
      method: 'post',
      url: url,
      data: data
    }).then(res => {
      sh(res);
    }).catch(err => {
      if (eh) eh(err);
    });
  }
};

export default {
  install () {
    Vue.prototype.$axios = ret;
    Vue.axios = ret;
  }
};
