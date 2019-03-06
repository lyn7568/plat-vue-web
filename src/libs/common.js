import 'babel-polyfill';

import ElementUI from 'element-ui';
import '../../theme/index.css';

import request from '@/libs/request';

import '@/styles/index.scss'; // global css

import Loading from '@/components/global-component/loading';
import BackTop from '@/components/global-component/backtop';
import defaultPage from '@/components/global-component/default';

Vue.use(request);
Vue.use(ElementUI);
Vue.use(Loading);
Vue.use(BackTop);
// Vue.component('BackTop', BackTop);
Vue.use(defaultPage);


function hashChange () {
  location.reload();
}
//url变化监听器
if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
// 浏览器支持onhashchange事件
    window.onhashchange = hashChange;  // TODO，对应新的hash执行的操作函数
} else {
  // 不支持则用定时器检测的办法
  setInterval(function() {
    // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
    var ischanged = isHashChanged();
    if (ischanged) {
        hashChange();  // TODO，对应新的hash执行的操作函数
    }
  }, 150);
}