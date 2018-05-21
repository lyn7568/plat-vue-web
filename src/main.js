import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import {router} from './router/index';
import axios from 'axios';

import Loading from './components/global-component/loading';
import BackTop from './components/global-component/backtop';

Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(Loading);
Vue.use(BackTop);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  data: {

  },
  mounted () {

  },
  created () {

  }
});
