
const constantRouterMap = [
  { 
        path: '/content',
        alwaysShow: true,
        component: (resolve) => require(['../views/content/content.vue'], resolve),
        name: 'content',
        meta: { title: '修改资料' }
     
    }   
];

// 实例化vue的时候只挂载constantRouter
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
