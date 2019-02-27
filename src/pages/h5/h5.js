import '@/libs/common.js';
import App from './h5.vue';
import router from './router';

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  created () {
    router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  }
});
