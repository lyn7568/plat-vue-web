import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'

let axiosUtil = axios.create({
    baseURL: process.env.BASE_API
});

axiosUtil.interceptors.request.use(function (config) {
    // 配置config
    config.headers.Accept = 'application/json';
    if (config.method === 'post') {
      config.data = qs.stringify(config.data, {arrayFormat: 'repeat'});
      // 处理后后台无需添加RequestBody
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    };
    return config;
});

axiosUtil.interceptors.response.use(function (response) {
  let taR = response.data
  if (response && response.status === 200) {
    if (response.data === undefined) { // 解决IE9数据问题
      taR = response.request.responseText
    } else {
      taR = response.data
    }
    if (!(taR instanceof Object)) { // 判断taR不是Object时，解析成Object
      taR = JSON.parse(taR)
    }
    if (!taR.success && taR.code === 0) {
      Message.error(taR.msg || taR.detailMsg)
    }
    if (!taR.success && taR.code === 1) {
      store.dispatch('FedLogOut').then(() => {
        Message.error('登录状态失效，请重新登录')
      })
    }
    return taR
  } else {
    Message.error('请求错误1，请重试')
    return Promise.resolve(response)
  }
}, error => {
  Message.error('请求错误2，请重试')
  return Promise.reject(error)
})

export default axiosUtil;
