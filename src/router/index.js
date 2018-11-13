// import Main from '@/components/Main.vue';
// import WorkMain from '@/components/bench-views/WorkCommon.vue';
// // 全屏展示页面
// export const loginRouter = {
//     path: '/loginPlat',
//     name: 'loginPlat',
//     meta: {
//         title: 'Login-登录'
//     },
//     component: () => import('@/components/form-views/loginPlat.vue')
// };
// export const pwdRouter = {
//     path: '/findPwd',
//     name: 'findPwd',
//     meta: {
//         title: '找回密码'
//     },
//     component: () => import('@/components/form-views/findPwd.vue')
// };
// export const upMail = {
//     path: '/upMail',
//     name: 'upMail',
//     meta: {
//         title: '邮箱更换'
//     },
//     component: () => import('@/components/form-views/upMail.vue')
// };

// // 作为Main组件的子页面展示
// export const otherRouter = {
//   path: '/',
//   name: 'otherRouter',
//   redirect: 'home',
//   component: Main,
//   children: [
//     { path: 'home',
//       title: '首页',
//       name: 'home_index',
//       component: () => import('@/components/main-views/ViewHome.vue')
//     },
//     { path: 'platTrends',
//       title: '平台动态',
//       name: 'platTrends',
//       component: () => import('@/components/main-views/ViewPlatTrend.vue')
//     },
//     { path: 'findServe',
//       title: '找服务',
//       name: 'findServe',
//       component: () => import('@/components/main-views/ViewFindServe.vue')
//     },
//     { path: 'findResource',
//       title: '找资源',
//       name: 'findResource',
//       component: () => import('@/components/main-views/ViewFindResource.vue')
//     },
//     { path: 'expertPool',
//       title: '专家顾问',
//       name: 'expertPool',
//       component: () => import('@/components/main-views/ViewExpertPool.vue')
//     },
//     { path: 'cooperationAgency',
//       title: '合作机构',
//       name: 'cooperationAgency',
//       component: () => import('@/components/main-views/ViewCooperationAgency.vue')
//     },
//     { path: 'about',
//       title: '关于我们',
//       name: 'about',
//       component: () => import('@/components/main-views/ViewAboutUs.vue')
//     }
//   ]
// };

// // 作为工作台bench子页面展示
// export const appRouter = {
//   path: '',
//   name: 'appRouter',
//   component: WorkMain,
//   children: [
//     {
//       path: 'WorkHome',
//       titile: '平台主页',
//       component: () => import('@/components/bench-views/WorkHome.vue')
//     },
//     {
//       path: 'UpdateInfo',
//       titile: '修改资料',
//       component: () => import('@/components/form-views/UpdateInfo.vue')
//     },
//     {
//       path: 'ContentManagement',
//       titile: '内容管理',
//       component: () => import('@/components/bench-views/contentManagement/ContentManagement.vue')
//     },
//     {
//       path: 'PublishArticle',
//       titile: '文章发布及修改',
//       component: () => import('@/components/bench-views/contentManagement/PublishArticle.vue')
//     },
//     {
//       path: 'PreviewArticle',
//       titile: '文章预览',
//       component: () => import('@/components/bench-views/contentManagement/PreviewArticle.vue')
//     },
//     {
//       path: 'BusinessManagement',
//       titile: '企业管理',
//       component: () => import('@/components/bench-views/businessManagement/EnterBusiness.vue')
//     },
//     {
//       path: 'DemandSearch',
//       titile: '需求查询',
//       component: () => import('@/components/bench-views/demandSearch/DemandSearch.vue')
//     },
//     {
//       path: 'ButtService',
//       titile: '对接服务',
//       component: () => import('@/components/bench-views/abutmentService/ButtService.vue')
//     },
//     {
//       path: 'AccountSettings',
//       titile: '账户设置',
//       component: () => import('@/components/form-views/AccountSettings.vue')
//     },
//     {
//       path: 'BindAccount',
//       titile: '账号绑定',
//       component: () => import('@/components/form-views/BindAccount.vue')
//     }
//   ]
// };

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
    path: '/findServe',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/frontviews/ViewFindServe'),
      name: 'findServe',
      meta: { title: '找服务' }
    }]
  },
  {
    path: '/findResource',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/frontviews/ViewFindResource'),
      name: 'findResource',
      meta: { title: '找资源' }
    }]
  },
  {
    path: '/findResult',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/frontviews/ViewFindResult'),
      name: 'findResult',
      meta: { title: '找成果' }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        name: 'expertPool',
        redirect: '/expertPool',
        component: () => import('@/views/frontviews/ViewExpertPool/index'),
        meta: { title: '专家库' },
        children: [
          {
            path: 'expertPool',
            component: () => import('@/views/frontviews/ViewExpertPool/expert')
          },
          {
            path: 'expertShow',
            name: 'expertShow',
            component: () => import('@/views/infoshow/expertShow'),
            meta: { title: '专家姓名' }
          }
        ]
      }
    ]
  },
  {
    path: '/cooperationAgency',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/frontviews/ViewCooperationAgency'),
      name: 'cooperationAgency',
      meta: { title: '服务机构' }
    }]
  },
  {
    path: '/regAgency',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/frontviews/ViewRegAgency'),
      name: 'regAgency',
      meta: { title: '入驻企业' }
    }]
  },
  {
    path: '/about',
    component: Layout,
    children: [{
      path: '',
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
