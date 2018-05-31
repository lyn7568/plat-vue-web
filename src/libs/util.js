import http from './http.js';

let ekexiuUrl = http.kexiuUrl;

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
    article: ekexiuUrl + '/articalList.html?articleId=',
    resource: ekexiuUrl + '/resourceShow.html?resourceId=',
    service: ekexiuUrl + '/sevriceShow.html?sevriceId=',
    demand: ekexiuUrl + '/demandShow.html?demandId='
  }
};

/**
 * 跳转序列化页面
 */
util.pageUrl = function(type, item) {
  return (ekexiuUrl + '/shtml/' + type + '/' + item.createTime.substring(0, 8) + '/' + item.shareId + '.html');
};

/**
 * 数据字典
 */
util.Dictionary = {
  durationTime: [{ // 预计合作周期
      value: '',
      label: '全部'
    }, {
      value: '1',
      label: '1个月内'
    }, {
      value: '2',
      label: '1-3个月'
    }, {
      value: '3',
      label: '3-6个月'
    }, {
      value: '4',
      label: '6-12个月'
    }, {
      value: '5',
      label: '1年以上'
    }],
  costRange: [{ // 费用预算
      value: '',
      label: '全部'
    }, {
      value: '1',
      label: '1万元以内'
    }, {
      value: '2',
      label: '1-5万元'
    }, {
      value: '3',
      label: '5-10万元'
    }, {
      value: '4',
      label: '10-20万元'
    }, {
      value: '5',
      label: '20-50万元'
    }, {
      value: '6',
      label: '50万元以上'
    }]
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
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null;
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

/*
 * 根据Value格式化为带有换行、空格格式的HTML代码
 * @param strValue {String} 需要转换的值
 * @return  {String}转换后的HTML代码
 * @example
 * getFormatCode("测\r\n\s试")  =>  “测<br/> 试”
 */
util.getFormatCode = function(strValue) {
  return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
};

/**
 * 时间显示规则
 */
util.commenTime = function(startTime, flag) {
  var nowTimg = new Date();
  var startdate = new Date();
  startdate.setFullYear(parseInt(startTime.substring(0, 4)));
  startdate.setMonth(parseInt(startTime.substring(4, 6)) - 1);
  startdate.setDate(parseInt(startTime.substring(6, 8)));
  startdate.setHours(parseInt(startTime.substring(8, 10)));
  startdate.setMinutes(parseInt(startTime.substring(10, 12)));
  startdate.setSeconds(parseInt(startTime.substring(12, 14)));
  var date3 = nowTimg.getTime() - startdate.getTime(); // 时间差的毫秒数
  var hours = parseInt((date3 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((date3 % (1000 * 60 * 60)) / (1000 * 60));
  if (date3 < 60000) {
    return '刚刚';
  } else if (date3 >= 60000 && date3 < 3600000) {
    return minutes + '分钟前';
  } else if (date3 >= 3600000 && date3 < 86400000) {
    return hours + '小时前';
  } else if (date3 >= 86400000) {
    if (nowTimg.getFullYear() === startTime.substring(0, 4)) {
      if (!flag) {
        return startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '月' + startTime.substring(6, 8).replace(/\b(0+)/gi, '') + '日 ' + startTime.substring(8, 10) + ':' + startTime.substring(10, 12);
      } else {
        return startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '/' + startTime.substring(6, 8).replace(/\b(0+)/gi, '');
      }
    } else {
      if (!flag) {
        return startTime.substring(0, 4) + '年' + startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '月' + startTime.substring(6, 8).replace(/\b(0+)/gi, '') + '日 ' + startTime.substring(8, 10) + ':' + startTime.substring(10, 12);
      } else {
        return startTime.substring(0, 4) + '/' + startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '/' + startTime.substring(6, 8).replace(/\b(0+)/gi, '');
      }
    }
  };
};

/**
 * 时间格式转换
 */
util.dateFormatter = function(str, fl, bol) { // 默认返回yyyy-MM-dd HH-mm-ss
    var hasTime = fl !== false; // 可传第二个参数false，返回yyyy-MM-dd
    var d = new Date(str);
    var year = d.getFullYear();
    var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    if (hasTime) {
      if (bol) {
        return year + month + day + hour + minute + second;
      } else {
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
      }
    } else {
      if (bol) {
        return year + month + day;
      } else {
        return [year, month, day].join('-');
      }
    }
};

export default util;
