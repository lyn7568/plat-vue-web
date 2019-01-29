import Layout from '../views/layout';

const constantRouterMap = [
  {
    path: '/',
    name: 'personalCenter',
    redirect: { name: 'modifyData' },
    meta: { title: '个人中心', requireAuth: true },
    component: Layout,
    children: [
      {
        path: '/modifyData',
        alwaysShow: true,
        component: (resolve) => require(['../views/modifyData'], resolve),
        name: 'modifyData',
        meta: { title: '修改资料' }
      },
      {
        path: '/myDemands',
        alwaysShow: true,
        component: (resolve) => require(['../views/myDemands/index'], resolve),
        name: 'myDemands',
        meta: { title: '我的需求' }
      },
      {
        path: '/myBusiness',
        component: (resolve) => require(['../views/myBusiness/index'], resolve),
        name: 'myBusiness',
        meta: { title: '我的企业' },
        children: [
          {
            path: '/companyInformation',
            component: (resolve) => require(['../views/myBusiness/companyInformation'], resolve),
            name: 'companyInformation',
            meta: { title: '企业信息' }
          }, {
            path: '/companyProduct',
            component: (resolve) => require(['../views/myBusiness/companyProduct'], resolve),
            name: 'companyProduct',
            meta: { title: '企业产品' }
          }
        ]
      },
      {
        path: '/attentionCollect',
        alwaysShow: true,
        component: (resolve) => require(['../views/attentionCollect'], resolve),
        name: 'attentionCollect',
        meta: { title: '关注收藏' }
      },
      {
        path: '/modifyPassword',
        alwaysShow: true,
        component: (resolve) => require(['../views/modifyPassword/index'], resolve),
        name: 'modifyPassword',
        meta: { title: '账户设置' },
        redirect: { name: 'index' },
        children: [
          {
            path: '/index',
            component: (resolve) => require(['../views/modifyPassword/modifyPassword'], resolve),
            name: 'index',
            meta: { title: '修改密码' }
          }
        ]
      }
    ]
  }
];

// 实例化vue的时候只挂载constantRouter
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
