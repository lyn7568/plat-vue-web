import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers} from './router';

Vue.config.productionTip = false;
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

export default router;
