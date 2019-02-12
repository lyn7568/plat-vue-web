import '@/libs/common.js';

import App from './center.vue';
import router from './router';
import store from '@/store';
import './permission';

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  created () {
    document.title = '个人中心-' + PLAT.info.title
    router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  }
});
