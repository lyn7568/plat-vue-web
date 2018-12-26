import '@/libs/common.js';

import Vue from 'vue';
import store from '@/store/index';
import App from './content.vue';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
