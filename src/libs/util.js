import httpUrl from './http.js';

let ekexiuUrl = httpUrl.kexiuUrl;

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
    service: '/static/comimg/default-service.jpg',
    patent: '/static/comimg/default-patent.jpg',
    product: '/static/comimg/default-product.jpg',
    plat: '/static/comimg/default-plat.jpg'
  }
};

/**
 * 跳转序列化页面
 */
util.pageUrl = function(type, item) {
  return (ekexiuUrl + '/shtml/' + type + '/' + item.createTime.substring(0, 8) + '/' + item.shareId + '.html');
};

/**
 * 正则匹配邮箱、手机
 * flag === 'mail' 是邮箱, flag === 'tel' 是手机
 */
util.regular = function(str, flag) {
  if (flag === 'mail') {
    var regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return regMail.test(str);
  } else if (flag === 'tel') {
    var regTel = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return regTel.test(str);
  };
};

/**
 * 邮箱mailHash
 */
util.mailHash = {
  'qq.com': 'http://mail.qq.com',
  'gmail.com': 'http://mail.google.com',
  'sina.com': 'http://mail.sina.com.cn',
  '163.com': 'http://mail.163.com',
  '126.com': 'http://mail.126.com',
  'yeah.net': 'http://www.yeah.net/',
  'sohu.com': 'http://mail.sohu.com/',
  'tom.com': 'http://mail.tom.com/',
  'sogou.com': 'http://mail.sogou.com/',
  '139.com': 'http://mail.10086.cn/',
  'hotmail.com': 'http://www.hotmail.com',
  'live.com': 'http://login.live.com/',
  'live.cn': 'http://login.live.cn/',
  'live.com.cn': 'http://login.live.com.cn',
  '189.com': 'http://webmail16.189.cn/webmail/',
  'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
  'yahoo.cn': 'http://mail.cn.yahoo.com/',
  'eyou.com': 'http://www.eyou.com/',
  '21cn.com': 'http://mail.21cn.com/',
  '188.com': 'http://www.188.com/',
  'ustb.edu.cn': 'http://mail.ustb.edu.cn/',
  'foxmail.coom': 'http://www.foxmail.com'
};

/**
 * 数据字典
 */
util.Dictionary = {
  durationTime: [{
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
  costRange: [{
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
 * 数据字典
 */
util.workComm = {
  durationTime: [{ // 费用预算
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

/**
 * 拼接用户-所在机构，所属部门，职位
 * 拼接用户-职称/职位，所在机构 bol
 */
util.formatOfft = function (str, bol) {
  var proOther = '';
  var proOtherBol = '';
  if (!bol) {
    if (str.orgName) {
      if (str.department) {
        if (str.office) {
          proOther = str.orgName + '，' + str.department + '，' + str.office;
        } else {
          proOther = str.orgName + '，' + str.department;
        };
      } else {
        if (str.office) {
          proOther = str.orgName + '，' + str.office;
        } else {
          proOther = str.orgName;
        };
      };
    } else {
      if (str.department) {
        if (str.office) {
          proOther = str.department + '，' + str.office;
        } else {
          proOther = str.department;
        };
      } else {
        if (str.office) {
          proOther = str.office;
        };
      };
    };
  } else {
    if (str.title) {
      if (str.orgName) {
        proOtherBol = str.title + '，' + str.orgName;
      } else {
        proOtherBol = str.title;
      }
    } else {
      if (str.office) {
        if (str.orgName) {
          proOtherBol = str.office + '，' + str.orgName;
        } else {
          proOtherBol = str.office;
        }
      } else {
        proOtherBol = '';
      }
    }
  }
  return bol ? proOtherBol : proOther;
};

// util.cutOutUrl = function (str) {
//     var index = str.lastIndexOf(/\//);
//     str = str.substring(index + 1, str.length);
//     return str;
// };

/**
 * String与Array之间的转换
 */
util.strToArr = function (str) {
  if (str) {
    var subs = [];
    if (str.indexOf(',')) {
        subs = str.split(',');
    } else {
        subs[0] = str;
    }
    return subs;
  }
};
util.arrToStr = function (arr) {
  var strs = ''
  if (arr) {
    strs = arr.join(',')
    return strs
  } else {
    return strs
  }
};

/*
 * 根据Value格式化为带有换行、空格格式的HTML代码
 * @param strValue {String} 需要转换的值
 * @return  {String}转换后的HTML代码
 * @example
 * getFormatCode('测\r\n\s试')  =>  “测<br/> 试”
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

util.dateChange = function(startTime) { // 默认返回yyyy月MM日dd HH:mm
    var nowTimg = new Date();
    if (nowTimg.getFullYear() !== startTime.substring(0, 4)) {
        return startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '月' + startTime.substring(6, 8).replace(/\b(0+)/gi, '') + '日 ' + startTime.substring(8, 10) + ':' + startTime.substring(10, 12);
    } else {
        return startTime.substring(0, 4) + '年' + startTime.substring(4, 6).replace(/\b(0+)/gi, '') + '月' + startTime.substring(6, 8).replace(/\b(0+)/gi, '') + '日 ' + startTime.substring(8, 10) + ':' + startTime.substring(10, 12);
    }
};

util.TimeTr = function(dealtime) {
  var myDate = new Date();
  var s = dealtime;
  var y = s.substr(0, 4);
  var m = s.substr(4, 2);
  var d = s.substr(6, 2);
  var h = s.substr(8, 2);
  var minute = s.substr(10, 2);
  var formatTime;
  if (s.length <= 6) {
    formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月';
  } else if (s.length > 6 && s.length <= 8) {
    formatTime = m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ';
    if (y !== myDate.getFullYear()) {
      formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ';
    }
  } else {
    formatTime = m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ' + h + ':' + minute;
    if (y !== myDate.getFullYear()) {
      formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ' + h + ':' + minute;
    }
  }
  return formatTime;
};

export default util;
