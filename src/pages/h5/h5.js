import '@/libs/common.js';
import App from './h5.vue';
import router from './router';

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  created () {
    router.beforeEach((to, from, next) => {
      document.title = PLAT.info.title
      if (to.meta.title) {
        document.title = to.meta.title + '-' + PLAT.info.title
      }
    })
    router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    })
  }
});
