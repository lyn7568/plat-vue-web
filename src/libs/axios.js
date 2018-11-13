import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import http from './http';

let axiosUtil = axios.create({
    baseURL: http.platUrl,
    // timeout: 30000,
    paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'});
    }
});

axiosUtil.interceptors.request.use(function (config) {
    // 配置config
    config.headers.Accept = 'application/json';
    if (config.method === 'post') {
        // if (config.url !== http.sample.list && config.url !== http.manage.kit.save) {
            config.data = qs.stringify(config.data);
            // 处理后后台无需添加RequestBody
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        // };
    };
    return config;
});

axiosUtil.interceptors.response.use(function (response) {
    let data = response.data;
    let status = response.status;
    if (status === 200) {
        if (response.data === undefined) {
            // 解决IE9数据问题
            data = response.request.responseText;
        } else {
            data = response.data;
        }
        if (!(data instanceof Object)) {
            // 判断data不是Object时，解析成Object
            data = JSON.parse(data);
        }
        return data;
    } else {
        // 业务异常
        console.log(response);
        return Promise.resolve(response);
    }
}, function (error) {
    // 系统异常(后期统一处理)
    console.log(error);
    return Promise.reject(error);
});

export default {
  install () {
    Vue.prototype.$axios = axiosUtil;
    Vue.axios = axiosUtil;
  }
};
