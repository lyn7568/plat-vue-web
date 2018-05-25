import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import {router} from './router/index';
import axiosH from './libs/axios';

import Loading from './components/global-component/loading';
// import BackTop from './components/global-component/backtop';

Vue.use(axiosH);
Vue.use(ElementUI);
Vue.use(Loading);

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
