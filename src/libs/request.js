import Vue from 'vue';
import requestP from './axios';
import requestK from './axiosk';

var ret = {
  get: function(url, data, sh, eh) {
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
  post: function(url, data, sh, eh) {
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
