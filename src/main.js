import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import {router} from './router/index';
import axios from 'axios';

Vue.prototype.$axios = axios;
Vue.use(ElementUI);

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
