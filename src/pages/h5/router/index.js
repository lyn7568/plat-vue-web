const constantRouterMap = [
  {
    path: '/content',
    alwaysShow: true,
    component: (resolve) => require(['../views/content/content.vue'], resolve),
    name: 'content',
    meta: { title: '内容' }
  },
  {
    path: '/company',
    alwaysShow: true,
    component: (resolve) => require(['../views/company/company.vue'], resolve),
    name: 'company',
    meta: { title: '企业' }
  },
  {
    path: '/org',
    alwaysShow: true,
    component: (resolve) => require(['../views/org/org.vue'], resolve),
    name: 'org',
    meta: { title: '机构' }
  }
];

// 实例化vue的时候只挂载constantRouter
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
