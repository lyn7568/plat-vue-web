import Layout from '../views/layout';

const constantRouterMap = [
  { path: '/loginPlat', meta: { title: '登录' }, component: (resolve) => require(['../views/logforms/loginPlat.vue'], resolve) },
  { path: '/findPwd', meta: { title: '找回密码' }, component: (resolve) => require(['../views/logforms/findPwd.vue'], resolve) },
  { path: '/register', meta: { title: '注册' }, component: (resolve) => require(['../views/logforms/register.vue'], resolve) },
  { path: '/enterRegister', meta: { title: '入驻平台' }, component: (resolve) => require(['../views/logforms/enteringRegister.vue'], resolve) },
  { path: '/inviteCodeLogin', meta: { title: '邀请码登录' }, component: (resolve) => require(['../views/logforms/inviteCodeLogin.vue'], resolve) },
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
  },
  {
    path: '',
    component: Layout,
    meta: { requireAuth: true },
    children: [{
      path: '/miniChat',
      component: (resolve) => require(['../views/MiniChat/index.vue'], resolve),
      name: 'miniChat',
      meta: { title: '消息' }
    }]
  },
  {
    path: '',
    component: Layout,
    meta: { requireAuth: true },
    children: [{
      path: '/inform',
      component: (resolve) => require(['../views/InformList/index.vue'], resolve),
      name: 'inform',
      meta: { title: '通知' }
    }]
  }
];

// 实例化vue的时候只挂载constantRouter
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
