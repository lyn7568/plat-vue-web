import '@/libs/common.js';
import Vue from 'vue';
import App from './index.vue';
import router from './router';
import store from '@/store/index';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  created () {
    router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  }
});
