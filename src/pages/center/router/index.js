import Layout from '../views/layout';

const constantRouterMap = [
  {
    path: '/',
    name: 'personalCenter',
    redirect: { name: 'modifyData' },
    meta: { title: '个人中心' },
    component: Layout,
    children: [
      {
        path: '/modifyData',
        alwaysShow: true,
        component: (resolve) => require(['../views/modifyData'], resolve),
        name: 'modifyData',
        meta: { title: '修改资料', requireAuth: true }
      },
      // {
      //   path: '/myNeeds',
      //   component: (resolve) => require(['../views/myNeeds/index'], resolve),
      //   name: 'myNeeds',
      //   meta: { title: '我的需求' },
      //   children: [{
      //     path: '/modifyDemand',
      //     component: (resolve) => require(['../views/myNeeds/modifyDemand'], resolve),
      //     name: 'modifyDemand',
      //     meta: { title: '修改需求' }
      //   }, {
      //     path: '/examineDemand',
      //     component: (resolve) => require(['../views/myNeeds/examineDemand'], resolve),
      //     name: 'examineDemand',
      //     meta: { title: '查看需求' }
      //   }, {
      //     path: '/myDemand',
      //     component: (resolve) => require(['../views/myNeeds/myNeed'], resolve),
      //     name: 'myDemand',
      //     meta: { title: '我的需求' }
      //   }]
      // },
      {
        path: '/myBusiness',
        component: (resolve) => require(['../views/myNeeds/index'], resolve),
        name: 'myBusiness',
        meta: { title: '我的企业', requireAuth: true },
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
        meta: { title: '关注收藏', requireAuth: true }
      },
      {
        path: '/modifyPassword',
        alwaysShow: true,
        component: (resolve) => require(['../views/modifyPassword'], resolve),
        name: 'modifyPassword',
        meta: { title: '修改密码', requireAuth: true }
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
