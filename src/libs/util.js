
export const ekexiuUrl = process.env.KX_API;

/**
 * default img
 */
export const defaultSet = {
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
 * expert head symbol icon
 */
export const autho = function (a, b, c) {
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
export const urlParse = function (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null;
};

export const trimStr = function(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 拼接图片链接地址
 */
export const ImageUrl = function (str, bol) {
  return bol ? (ekexiuUrl + '/images/' + str) : (ekexiuUrl + '/data/' + str);
};

/**
 * offset
 */
export const offset = function (el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return {
    left: left,
    top: top
  };
}
/**
 * 拼接用户-所在机构，所属部门，职位
 * 拼接用户-职称/职位，所在机构 bol
 */
export const formatOfft = function (str, bol) {
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

/**
 * String与Array之间的转换
 */
export const strToArr = function (str) {
  var subs = []
  if (str) {
    if (str.indexOf(',')) {
      subs = str.split(',')
    } else {
      subs[0] = str
    }
    return subs
  } else {
    return subs
  }
};
export const arrToStr = function (arr) {
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
export const getFormatCode = function(strValue) {
  return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
};

/**
 * 时间显示规则
 */
export const commenTime = function(startTime, flag) {
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

export const TimeTr = function(dealtime) {
  var myDate = new Date();
  var Fy = myDate.getFullYear();
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
    if (Number(y) !== Fy) {
      formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ';
    }
  } else {
    formatTime = m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ' + h + ':' + minute;
    if (Number(y) !== Fy) {
      formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ' + h + ':' + minute;
    }
  }
  return formatTime;
};
