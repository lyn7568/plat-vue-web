
// let ekexiuUrl = 'https://www.ekexiu.com';
let ekexiuUrl = 'http://192.168.3.233:81';

let util = {

};

util.ekexiuUrl = ekexiuUrl;

/**
 * default img
 */
util.defaultSet = {
  img: {
    expert: '/static/comimg/default-expert.jpg',
    org: '/static/comimg/default-org.jpg',
    article: '/static/comimg/default-article.jpg',
    resource: '/static/comimg/default-resource.jpg',
    service: '/static/comimg/default-service.jpg'
  },
  link: {
    expert: ekexiuUrl + '/userInforShow.html?professorId=',
    org: ekexiuUrl + '/cmpInforShow.html?orgId=',
    article: ekexiuUrl + '/articleShow.html?articleId=',
    resource: ekexiuUrl + '/resourceShow.html?resourceId=',
    service: ekexiuUrl + '/sevriceShow.html?sevriceId='
  }
};

/**
 * expert head symbol icon
 */
util.autho = function (a, b, c) {
  if (a === 1) {
    return 'icon-pro';
  } else {
    if (b === 1) {
      return 'icon-staff';
    } else {
      if (c === 3) {
        return 'icon-real';
      };
    };
  };
};

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
util.urlParse = function (name) {
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = name.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};

/**
 * 拼接图片链接地址
 */
util.ImageUrl = function (str, bol) {
    return bol ? (ekexiuUrl + '/images/' + str) : (ekexiuUrl + '/data/' + str);
};

// util.cutOutUrl = function (str) {
//     var index = str.lastIndexOf(/\//);
//     str = str.substring(index + 1, str.length);
//     return str;
// };

/**
 * String与Array之间的转换
 */
// util.strToArr = function (str) {
//     if (str) {
//         var subs = new Array();
//         if (subs.indexOf(',')) {
//             subs = str.split(',');
//         } else {
//             subs[0] = str;
//         }
//         return subs;
//     }
// };
// util.arrToStr = function (arr) {
//     var newStr = arr.join(',');
//     return newStr;
// };

export default util;
