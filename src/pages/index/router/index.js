import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout';

Vue.use(Router);

const constantRouterMap = [
  { path: '/loginPlat', component: (resolve) => require(['../views/logforms/loginPlat.vue'], resolve) },
  { path: '/findPwd', component: (resolve) => require(['../views/logforms/findPwd.vue'], resolve) },
  { path: '/register', component: (resolve) => require(['../views/logforms/register.vue'], resolve) },
  { path: '/enterRegister', component: (resolve) => require(['../views/logforms/enteringRegister.vue'], resolve) },
  { path: '/inviteCodeLogin', component: (resolve) => require(['../views/logforms/inviteCodeLogin.vue'], resolve) },
  {
    path: '/userAgreement',
    component: Layout,
    children: [{
      path: '',
      component: (resolve) => require(['../views/logforms/userAgreement.vue'], resolve),
      name: 'userAgreement',
      meta: { title: '用户协议' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: (resolve) => require(['../views/Dashboard/index.vue'], resolve),
      meta: { title: '首页' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/trends',
      name: 'trends',
      component: (resolve) => require(['../views/ViewPlatTrend/index.vue'], resolve),
      meta: { title: '平台动态' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        name: 'serve',
        path: '/serve',
        component: (resolve) => require(['../views/ViewFindServe/index.vue'], resolve),
        meta: { title: '找服务' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        name: 'reso',
        path: '/reso',
        component: (resolve) => require(['../views/ViewFindResource/index.vue'], resolve),
        meta: { title: '找资源' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        name: 'resu',
        path: '/resu',
        component: (resolve) => require(['../views/ViewFindResult/index.vue'], resolve),
        meta: { title: '找成果' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/exp',
        name: 'exp',
        component: (resolve) => require(['../views/ViewExpertPool/index.vue'], resolve),
        meta: { title: '专家库' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/org',
        name: 'org',
        component: (resolve) => require(['../views/ViewOrganization/index.vue'], resolve),
        meta: { title: '服务机构' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/comp',
        name: 'comp',
        component: (resolve) => require(['../views/ViewRegCompany/index.vue'], resolve),
        meta: { title: '入驻企业' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/about',
      component: (resolve) => require(['../views/ViewAboutUs.vue'], resolve),
      name: 'about',
      meta: { title: '关于平台' }
    }]
  }
];

// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
