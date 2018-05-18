import Main from '@/components/Main.vue';

// 全屏展示页面
export const loginRouter = {
    path: '/loginPlat',
    name: 'loginPlat',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/components/form-views/loginPlat.vue')
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
    },
    { path: 'workBench',
      title: '平台工作台',
      name: 'workBench',
      component: () => import('@/components/bench-views/ViewWorkBench.vue')
    }
  ]
};

// 作为工作台bench子页面展示
export const appRouter = [

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter
];
