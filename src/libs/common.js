import 'babel-polyfill';

import Vue from 'vue';

import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';

import request from '@/libs/request';

import '@/styles/index.scss'; // global css

import Loading from '@/components/global-component/loading';
import BackTop from '@/components/global-component/backtop';
import defaultPage from '@/components/global-component/default';

Vue.use(request);
Vue.use(ElementUI);
Vue.use(Loading);
Vue.use(BackTop);
Vue.use(defaultPage);
