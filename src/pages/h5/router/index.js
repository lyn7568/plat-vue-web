import Layout from '../views/layout';
const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [{
      component: (resolve) => require(['../views/index/index.vue'], resolve),
      path: '/index',
      name: 'index',
      meta: { title: '首页' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [{
      component: (resolve) => require(['../views/search/search.vue'], resolve),
      name: 'search',
      path: '/search',
      meta: { title: '搜索' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/content',
      component: (resolve) => require(['../views/content/content.vue'], resolve),
      name: 'content',
      meta: { title: '内容' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/company',
      component: (resolve) => require(['../views/company/company.vue'], resolve),
      name: 'company',
      meta: { title: '企业' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/org',
      component: (resolve) => require(['../views/org/org.vue'], resolve),
      name: 'org',
      meta: { title: '机构' }
    }]
  }
];

// 实例化vue的时候只挂载constantRouter
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
