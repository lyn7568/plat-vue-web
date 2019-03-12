import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

let axiosUtil = axios.create({
    baseURL: process.env.KX_API,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
});

axiosUtil.interceptors.request.use(function (config) {
    // 配置config
    config.headers.Accept = 'application/json';
    if (config.method === 'post') {
      config.data = qs.stringify(config.data, {arrayFormat: 'repeat'});
      // 处理后后台无需添加RequestBody
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
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
      return taR
    } else {
      Message.error('请求错误1，请重试')
      return Promise.resolve(response)
    }
}, error => {
    Message.error('服务器请求错误，请重试')
    return Promise.reject(error)
})

export default axiosUtil;
