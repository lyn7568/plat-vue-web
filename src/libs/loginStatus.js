/**
 * Created by luyanan on 18/12/27.
 * loginStatus
 */
import store from '@/store'
import { MessageBox } from 'element-ui'
export function loginStatus(fn) {
  if (localStorage.getItem('userid')) {
    fn()
  } else {
    MessageBox.confirm('您尚未登录，现在去登录？', '提示', {
      type: 'warning'
    }).then(() => {
      store.dispatch('FedLogOut').then(res => {
        location.href = '/#/loginPlat';
      })
    }).catch(() => {});
  }
}
