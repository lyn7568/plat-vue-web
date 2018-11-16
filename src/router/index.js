import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout';

Vue.use(Router);

const constantRouterMap = [
  { path: '/loginPlat', component: () => import('@/views/logforms/loginPlat') },
  { path: '/findPwd', component: () => import('@/views/logforms/findPwd') },
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
    path: '/platTrends',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/frontviews/platTrend/ViewPlatTrend'),
      name: 'platTrends',
      meta: { title: '平台动态' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        name: 'findServe',
        path: '/findServe',
        redirect: { name: 'serve_list' },
        component: () => import('@/views/frontviews/ViewFindServe/index'),
        meta: { title: '找服务' },
        children: [
          {
            name: 'serve_list',
            path: '/serve_list',
            component: () => import('@/views/frontviews/ViewFindServe/list')
          },
          {
            path: '/serve_show',
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
        name: 'findResource',
        path: '/findResource',
        redirect: { name: 'reso_list' },
        component: () => import('@/views/frontviews/ViewFindResource/index'),
        meta: { title: '找资源' },
        children: [
          {
            name: 'reso_list',
            path: '/reso_list',
            component: () => import('@/views/frontviews/ViewFindResource/list')
          },
          {
            path: '/reso_show',
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
        name: 'findResult',
        path: '/findResult',
        redirect: { name: 'resu_list' },
        component: () => import('@/views/frontviews/ViewFindResult/index'),
        meta: { title: '找成果' },
        children: [
          {
            name: 'resu_list',
            path: '/resu_list',
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
                path: '/resu_patent',
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
        path: '/expertPool',
        name: 'expertPool',
        redirect: { name: 'exp_list' },
        component: () => import('@/views/frontviews/ViewExpertPool/index'),
        meta: { title: '专家库' },
        children: [
          {
            path: '/exp_list',
            name: 'exp_list',
            component: () => import('@/views/frontviews/ViewExpertPool/list')
          },
          {
            path: '/exp_show',
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
        path: '/CoAgency',
        name: 'CoAgency',
        redirect: { name: 'org_list' },
        component: () => import('@/views/frontviews/ViewOrganization/index'),
        meta: { title: '服务机构' },
        children: [
          {
            path: '/org_list',
            name: 'org_list',
            component: () => import('@/views/frontviews/ViewOrganization/list')
          },
          {
            path: '/org_show',
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
        path: '/regCompany',
        name: 'regCompany',
        redirect: { name: 'comp_list' },
        component: () => import('@/views/frontviews/ViewRegCompany/index'),
        meta: { title: '入驻企业' },
        children: [
          {
            path: '/comp_list',
            name: 'comp_list',
            component: () => import('@/views/frontviews/ViewRegCompany/list')
          },
          {
            path: 'comp_home',
            name: 'comp_home',
            redirect: { name: 'comp_show' },
            component: () => import('@/views/infoshow/compShow/index'),
            meta: { title: '企业名称' },
            children: [
              {
                path: '/comp_show',
                name: 'comp_show',
                component: () => import('@/views/infoshow/compShow/comp')
              },
              {
                path: '/comp_product',
                name: 'comp_product',
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
  }
];

// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
