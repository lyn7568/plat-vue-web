import city from './CityPick';

// Loading.install = function(Vue) {
//   Vue.component(Loading.name, MyLoading);
// };
const CityPick = {
  install: function(Vue) {
    Vue.component('CityPick', city);
  }
};

// 导出组件
export default CityPick;
