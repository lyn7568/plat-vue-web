import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import {router} from './router/index';
import axiosH from './libs/axios';

import Loading from './components/global-component/loading';
import BackTop from './components/global-component/backtop';
import defaultPage from './components/global-component/default';
import CityPick from './components/global-component/CityPick';

import '../static/ueditor/ueditor.config.js';
import '../static/ueditor/ueditor.all.js';
import '../static/ueditor/lang/zh-cn/zh-cn.js';
import '../static/ueditor/ueditor.parse.js';

import Cookies from 'js-cookie';
import '../static/plat-info';

Vue.use(axiosH);
Vue.use(ElementUI);
Vue.use(Loading);
Vue.use(BackTop);
Vue.use(defaultPage);
Vue.use(CityPick);

var PLAT = global.PLAT;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  data() {
    return {
      plat: {}
    };
  },
  mounted() {
    this.plat = PLAT.info;
    document.title = this.plat.title;
    Cookies.set('platId', this.plat.id);
    Cookies.set('platSource', this.plat.source);
  },
  created () {
    router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  }
});
