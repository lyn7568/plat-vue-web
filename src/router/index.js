import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/layout';
import Common from '@/views/layout/common';

Vue.use(Router);

const constantRouterMap = [
  { path: '/loginPlat', component: () => import('@/views/logforms/loginPlat') },
  { path: '/findPwd', component: () => import('@/views/logforms/findPwd') },
  { path: '/register', component: () => import('@/views/logforms/register') },
  { path: '/enterRegister', component: () => import('@/views/logforms/enteringRegister') },
  { path: '/inviteCodeLogin', component: () => import('@/views/logforms/inviteCodeLogin') },
  {
    path: '/userAgreement',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/logforms/userAgreement'),
      name: 'userAgreement',
      meta: { title: '用户协议' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      component: () => import('@/views/frontviews/Dashboard'),
      name: 'home',
      meta: { title: '首页' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/trends',
      name: 'trends',
      redirect: { name: 'con_list' },
      component: () => import('@/views/frontviews/ViewPlatTrend/index'),
      meta: { title: '平台动态' },
      children: [
        {
          name: 'con_list',
          path: 'con_list',
          component: () => import('@/views/frontviews/ViewPlatTrend/list')
        },
        {
          path: 'con_show',
          name: 'con_show',
          component: () => import('@/views/infoshow/contentShow'),
          meta: { title: '内容名称' }
        }
      ]
    }]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        name: 'serve',
        path: '/serve',
        redirect: { name: 'serve_list' },
        component: () => import('@/views/frontviews/ViewFindServe/index'),
        meta: { title: '找服务' },
        children: [
          {
            name: 'serve_list',
            path: 'serve_list',
            component: () => import('@/views/frontviews/ViewFindServe/list')
          },
          {
            path: 'serve_show',
            name: 'serve_show',
            component: () => import('@/views/infoshow/serviceShow'),
            meta: { title: '服务名称' }
          }
        ]
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
        redirect: { name: 'reso_list' },
        component: () => import('@/views/frontviews/ViewFindResource/index'),
        meta: { title: '找资源' },
        children: [
          {
            name: 'reso_list',
            path: 'reso_list',
            component: () => import('@/views/frontviews/ViewFindResource/list')
          },
          {
            path: 'reso_show',
            name: 'reso_show',
            component: () => import('@/views/infoshow/resourceShow'),
            meta: { title: '资源名称' }
          }
        ]
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
        redirect: { name: 'resu_list' },
        component: () => import('@/views/frontviews/ViewFindResult/index'),
        meta: { title: '找成果' },
        children: [
          {
            name: 'resu_list',
            path: 'resu_list',
            component: () => import('@/views/frontviews/ViewFindResult/list')
          },
          {
            name: 'resu_result',
            path: 'resu_result',
            redirect: { name: 'resu_patent' },
            component: () => import('@/views/infoshow/resultShow/index'),
            meta: { title: '专利' },
            children: [
              {
                path: 'resu_patent',
                name: 'resu_patent',
                component: () => import('@/views/infoshow/resultShow/patent'),
                meta: { title: '专利名称' }
              }
            ]
          }
        ]
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
        redirect: { name: 'exp_list' },
        component: () => import('@/views/frontviews/ViewExpertPool/index'),
        meta: { title: '专家库' },
        children: [
          {
            path: 'exp_list',
            name: 'exp_list',
            component: () => import('@/views/frontviews/ViewExpertPool/list')
          },
          {
            path: 'exp_show',
            name: 'exp_show',
            component: () => import('@/views/infoshow/expertShow'),
            meta: { title: '专家姓名' }
          }
        ]
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
        redirect: { name: 'org_list' },
        component: () => import('@/views/frontviews/ViewOrganization/index'),
        meta: { title: '服务机构' },
        children: [
          {
            path: 'org_list',
            name: 'org_list',
            component: () => import('@/views/frontviews/ViewOrganization/list')
          },
          {
            path: 'org_show',
            name: 'org_show',
            component: () => import('@/views/infoshow/orgShow'),
            meta: { title: '机构名称' }
          }
        ]
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
        redirect: { name: 'comp_list' },
        component: () => import('@/views/frontviews/ViewRegCompany/index'),
        meta: { title: '入驻企业' },
        children: [
          {
            path: 'comp_list',
            name: 'comp_list',
            component: () => import('@/views/frontviews/ViewRegCompany/list')
          },
          {
            path: 'comp_show',
            name: 'comp_show',
            redirect: { name: 'comp_desc' },
            component: () => import('@/views/infoshow/compShow/index'),
            meta: { title: '企业名称' },
            children: [
              {
                path: 'comp_desc',
                name: 'comp_desc',
                component: () => import('@/views/infoshow/compShow/comp')
              },
              {
                path: 'product_show',
                name: 'product_show',
                component: () => import('@/views/infoshow/compShow/product'),
                meta: { title: '产品名称' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/about',
      component: () => import('@/views/frontviews/ViewAboutUs'),
      name: 'about',
      meta: { title: '关于平台' }
    }]
  },
  {
    path: '',
    name: 'personalCenter',
    meta: { title: '个人中心' },
    component: Common,
      children: [{
        path: '/modifyData',
        component: () => import('@/views/personalCenter/modifyData'),
        name: 'modifyData',
        meta: { title: '修改资料' }
      }, {
        path: '/modifyPassword',
        component: () => import('@/views/personalCenter/modifyPassword'),
        name: 'modifyPassword',
        meta: { title: '修改密码' }
      }, {
        path: '/attentionCollect',
        component: () => import('@/views/personalCenter/attentionCollect'),
        name: 'attentionCollect',
        meta: { title: '关注收藏' }
      }, {
        path: '/myNeeds',
        component: () => import('@/views/personalCenter/myNeeds/index'),
        name: 'myNeeds',
        meta: { title: '我的需求' },
        children: [{
          path: '/modifyDemand',
          component: () => import('@/views/personalCenter/myNeeds/modifyDemand'),
          name: 'modifyDemand',
          meta: { title: '修改需求' }
        }, {
          path: '/examineDemand',
          component: () => import('@/views/personalCenter/myNeeds/examineDemand'),
          name: 'examineDemand',
          meta: { title: '查看需求' }
        }, {
          path: '/myDemand',
          component: () => import('@/views/personalCenter/myNeeds/myNeed'),
          name: 'myDemand',
          meta: { title: '我的需求' }
        }]
      }, {
        path: '/myBusiness',
        component: () => import('@/views/personalCenter/myNeeds/index'),
        name: 'myBusiness',
        meta: { title: '我的企业' },
        children: [{
          path: '/companyInformation',
          component: () => import('@/views/personalCenter/myBusiness/companyInformation'),
          name: 'companyInformation',
          meta: { title: '企业信息' }
        }, {
          path: '/companyProduct',
          component: () => import('@/views/personalCenter/myBusiness/companyProduct'),
          name: 'companyProduct',
          meta: { title: '企业产品' }
        }, {
          path: '/publishProduct',
          component: () => import('@/views/personalCenter/myBusiness/publishProduct'),
          name: 'publishProduct',
          meta: { title: '发布产品' }
        }]
      }]
  }
];

// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
