import '@/libs/common.js';

import store from '@/store/index';
import App from './org.vue';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
