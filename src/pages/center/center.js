import '@/libs/common.js';
import Vue from 'vue';
import App from './center.vue';
import router from './router';
import store from '@/store/index';
import './permission';

import Cookies from 'js-cookie';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data() {
    return {
      plat: {}
    };
  },
  mounted() {
    /* eslint-disable no-undef */
    this.plat = PLAT.info;
    document.title = this.plat.title;
    Cookies.set('platId', process.env.PLAT_ID);
    Cookies.set('platSource', this.plat.source);
  },
  created () {
    router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  }
});
