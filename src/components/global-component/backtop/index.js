import BackTop from './BackTop';

/* istanbul ignore next */
BackTop.install = function(Vue) {
  Vue.component(BackTop.name, BackTop);
};
// const BackTop = {
//   install: function(Vue) {
//     Vue.component('BackTop', myBackTop);
//   }
// };

export default BackTop;
