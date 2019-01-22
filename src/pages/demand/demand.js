import '@/libs/common.js';

import store from '@/store/index';
import App from './demand.vue';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
