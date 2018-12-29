/**
 * Created by luyanan on 18/12/27.
 * loginStatus
 */
/* eslint-disable one-var */
import Vue from 'vue'
import Cookies from 'js-cookie'

export function loginStatus(fn) {
  if (Cookies.get('userid')) {
    fn()
  } else {
    Vue.$store.dispatch('FedLogOut').then(res => {
      Vue.$message.error('登录状态失效，请重新登录');
      location.href = '/#/loginPlat';
    })
  }
}
