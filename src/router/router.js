import Main from '@/components/Main.vue';
import WorkMain from '@/components/bench-views/WorkCommon.vue';
// 全屏展示页面
export const loginRouter = {
    path: '/loginPlat',
    name: 'loginPlat',
    meta: {
        title: 'Login-登录'
    },
    component: () => import('@/components/form-views/loginPlat.vue')
};
export const pwdRouter = {
    path: '/findPwd',
    name: 'findPwd',
    meta: {
        title: '找回密码'
    },
    component: () => import('@/components/form-views/findPwd.vue')
};

// 作为Main组件的子页面展示
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'home',
      title: '首页',
      name: 'home_index',
      component: () => import('@/components/main-views/ViewHome.vue')
    },
    { path: 'platTrends',
      title: '平台动态',
      name: 'platTrends',
      component: () => import('@/components/main-views/ViewPlatTrend.vue')
    },
    { path: 'findServe',
      title: '找服务',
      name: 'findServe',
      component: () => import('@/components/main-views/ViewFindServe.vue')
    },
    { path: 'findResource',
      title: '找资源',
      name: 'findResource',
      component: () => import('@/components/main-views/ViewFindResource.vue')
    },
    { path: 'expertPool',
      title: '专家顾问',
      name: 'expertPool',
      component: () => import('@/components/main-views/ViewExpertPool.vue')
    },
    { path: 'cooperationAgency',
      title: '合作机构',
      name: 'cooperationAgency',
      component: () => import('@/components/main-views/ViewCooperationAgency.vue')
    },
    { path: 'aboutUs',
      title: '关于我们',
      name: 'aboutUs',
      component: () => import('@/components/main-views/ViewAboutUs.vue')
      // component: resolve => { require(['../components/ViewAboutUs.vue'], resolve); }
    }
  ]
};

// 作为工作台bench子页面展示
export const appRouter = {
  path: '/',
  name: 'appRouter',
  component: WorkMain,
  children: [
    {
      path: 'WorkHome',
      titile: '平台主页',
      component: () => import('@/components/bench-views/WorkHome.vue')
    },
    {
      path: 'UpdateInfo',
      titile: '修改资料',
      component: () => import('@/components/bench-views/UpdateInfo.vue')
    },
    {
      path: 'ContentManagement',
      titile: '内容管理',
      component: () => import('@/components/bench-views/contentManagement/ContentManagement.vue')
    },
    {
      path: 'PublishArticle',
      titile: '文章发布及修改',
      component: () => import('@/components/bench-views/contentManagement/PublishArticle.vue')
    },
    {
      path: 'BusinessManagement',
      titile: '企业管理',
      component: () => import('@/components/bench-views/businessManagement/EnterBusiness.vue')
    },
    {
      path: 'DemandSearch',
      titile: '需求查询',
      component: () => import('@/components/bench-views/demandSearch/DemandSearch.vue')
    },
    {
      path: 'ButtService',
      titile: '对接服务',
      component: () => import('@/components/bench-views/abutmentService/ButtService.vue')
    },
    {
      path: 'AccountSettings',
      titile: '账户设置',
      component: () => import('@/components/form-views/AccountSettings.vue')
    },
    {
      path: 'BindAccount',
      titile: '账号绑定',
      component: () => import('@/components/form-views/BindAccount.vue')
    }
  ]
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    pwdRouter,
    otherRouter,
    appRouter
];
