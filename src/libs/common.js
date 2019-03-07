import 'babel-polyfill';

import ElementUI from 'element-ui';
import '../../theme/index.css';

import request from '@/libs/request';

import '@/styles/index.scss'; // global css

import Loading from '@/components/global-component/loading';
import BackTop from '@/components/global-component/backtop';
import defaultPage from '@/components/global-component/default';

Vue.use(request);
Vue.use(ElementUI);
Vue.use(Loading);
Vue.use(BackTop);
// Vue.component('BackTop', BackTop);
Vue.use(defaultPage);
