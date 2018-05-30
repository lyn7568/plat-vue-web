
import BackTop from './backtop/BackTop';
import Loading from './loading/Loading';
import defaultPage from './default/default';

const components = [
  BackTop,
  Loading,
  defaultPage
];

const install = (Vue, OPts) => {
  if (install.installed) {
    return;
  };
  components.map(item => {
    Vue.component(item.name, item);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  console.log('传入参数install方法')
  install(window.Vue);
};

export default {
  BackTop,
  Loading,
  defaultPage
};
