/**
 * Created by luyanan on 18/12/27.
 * loginStatus
 */
import store from '@/store'
import { Message } from 'element-ui'
export function loginStatus(fn) {
  if (localStorage.getItem('userid')) {
    fn()
  } else {
    store.dispatch('FedLogOut').then(res => {
      Message.error('登录状态失效，请重新登录');
      location.href = '/#/loginPlat';
    })
  }
}
