import router from './router'
import store from '@/store'
import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-' + PLAT.info.title
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 是否登录
    if (store.getters && store.getters.userid && localStorage.getItem('userid')) { // 判断当前用户是否已拉取完user_info信息
      next();
    } else {
      store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        if (res.success && res.data) {
          next();
        } else {
          store.dispatch('FedLogOut').then(() => {
            Message.error('登录状态失效，请重新登录');
            next('/loginPlat')
          })
        }
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(err || '登录状态失效，请重新登录');
          next('/loginPlat')
        })
      })
    }
  }
  next();
})
