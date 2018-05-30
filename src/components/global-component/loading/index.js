import MyLoading from './Loading';

const Loading = {
  install: function(Vue) {
    Vue.component('Loading', MyLoading);
  }
};

// 导出组件
export default Loading;
