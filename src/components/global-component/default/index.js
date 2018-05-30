import mydefaultPage from './default';

const defaultPage = {
  install: function(Vue) {
    Vue.component('defaultPage', mydefaultPage);
  }
};

// 导出组件
export default defaultPage;
