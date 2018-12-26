import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout';

Vue.use(Router);

const constantRouterMap = [
  {
    path: '/',
    name: 'personalCenter',
    meta: { title: '个人中心' },
    component: Layout,
    children: [
      {
        path: '/modifyData',
        component: () => import('../views/modifyData'),
        name: 'modifyData',
        meta: { title: '修改资料' }
      }, {
        path: '/modifyPassword',
        component: () => import('../views/modifyPassword'),
        name: 'modifyPassword',
        meta: { title: '修改密码' }
      }, {
        path: '/attentionCollect',
        component: () => import('../views/attentionCollect'),
        name: 'attentionCollect',
        meta: { title: '关注收藏' }
      }, {
        path: '/myNeeds',
        component: () => import('../views/myNeeds/index'),
        name: 'myNeeds',
        meta: { title: '我的需求' },
        children: [{
          path: '/modifyDemand',
          component: () => import('../views/myNeeds/modifyDemand'),
          name: 'modifyDemand',
          meta: { title: '修改需求' }
        }, {
          path: '/examineDemand',
          component: () => import('../views/myNeeds/examineDemand'),
          name: 'examineDemand',
          meta: { title: '查看需求' }
        }, {
          path: '/myDemand',
          component: () => import('../views/myNeeds/myNeed'),
          name: 'myDemand',
          meta: { title: '我的需求' }
        }]
      }, {
        path: '/myBusiness',
        component: () => import('../views/myNeeds/index'),
        name: 'myBusiness',
        meta: { title: '我的企业' },
        children: [{
          path: '/companyInformation',
          component: () => import('../views/myBusiness/companyInformation'),
          name: 'companyInformation',
          meta: { title: '企业信息' }
        }, {
          path: '/companyProduct',
          component: () => import('../views/myBusiness/companyProduct'),
          name: 'companyProduct',
          meta: { title: '企业产品' }
        }, {
          path: '/publishProduct',
          component: () => import('../views/myBusiness/publishProduct'),
          name: 'publishProduct',
          meta: { title: '发布产品' }
        }]
      }
    ]
  }
];

// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
