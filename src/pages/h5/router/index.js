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
  }, 
  {
    path: '',
    component: Layout,
    children: [{
      path: '/expert',
      component: (resolve) => require(['../views/expert/expert.vue'], resolve),
      name: 'expert',
      meta: { title: '专家' }
    }]
  }, 
  {
    path: '',
    component: Layout,
    children: [{
      path: '/service',
      component: (resolve) => require(['../views/service/service.vue'], resolve),
      name: 'service',
      meta: { title: '服务' }
    }]
  }, 
  {
    path: '',
    component: Layout,
    children: [{
      path: '/resource',
      component: (resolve) => require(['../views/resource/resource.vue'], resolve),
      name: 'resource',
      meta: { title: '资源' }
    }]
  }, 
  {
    path: '',
    component: Layout,
    children: [{
      path: '/product',
      component: (resolve) => require(['../views/product/product.vue'], resolve),
      name: 'product',
      meta: { title: '产品' }
    }]
  }
];

// 实例化vue的时候只挂载constantRouter
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
