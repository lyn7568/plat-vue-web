import MyLoading from './Loading';

// Loading.install = function(Vue) {
//   Vue.component(Loading.name, MyLoading);
// };
const Loading = {
  install: function(Vue) {
    Vue.component('Loading', MyLoading);
  }
};

// 导出组件
export default Loading;
