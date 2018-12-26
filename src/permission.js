import router from './router'
import store from './store'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'

const whiteList = ['/publishProduct', '/companyProduct', '/companyInformation', '/myDemand', '/examineDemand', '/modifyDemand', '/modifyData', '/modifyPassword', '/attentionCollect'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (Cookies.get('userid')) {
    if (to.path === '/loginPlat') {
      next({ path: '/home' });
    } else {
      if (!store.getters.account) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          if (res.success && res.data) {
            next();
          } else {
            store.dispatch('FedLogOut').then(() => {
              if (whiteList.indexOf(to.path) !== -1) {
                Message.error('登录状态失效，请重新登录');
                router.push({ path: '/loginPlat' });
              } else {
                next();
              }
            })
          }
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '登录状态失效，请重新登录');
            next({ path: '/loginPlat' })
          })
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      router.push({ path: '/loginPlat' });
    } else {
      next();
    }
  }
})
