
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
 * 平台动态 栏目
 */
export const platTrend = [
  {
    val: '1',
    tit: '平台新闻'
  },
  {
    val: '2',
    tit: '采访专栏'
  },
  {
    val: '5',
    tit: '科技动态'
  },
  {
    val: '3',
    tit: '政策法规'
  },
  {
    val: '4',
    tit: '通知公告'
  }
]

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

export const trimStr = function (str) {
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
export const getFormatCode = function (strValue) {
  return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
};

/**
 * 时间显示规则
 */
export const commenTime = function (startTime, flag) {
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

export const TimeTr = function (dealtime, flag) {
  if (dealtime) {
    var myDate = new Date()
    var Fy = myDate.getFullYear()
    var s = dealtime
    var y = s.substr(0, 4)
    var m = s.substr(4, 2)
    var d = s.substr(6, 2)
    var h = ''
    var minute = ''
    var formatTime
    if (s.length <= 6) {
      formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月'
      if (flag) {
        formatTime = y + '/' + m.replace(/\b(0+)/gi, '')
      }
    } else if (s.length > 6 && s.length <= 8) {
      h = s.substr(8, 2)
      formatTime = m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 '
      if (flag) {
        formatTime = m.replace(/\b(0+)/gi, '') + '/' + d.replace(/\b(0+)/gi, '')
      }
      if (Number(y) !== Fy) {
        formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 '
        if (flag) {
          formatTime = y + '/' + m.replace(/\b(0+)/gi, '') + '/' + d.replace(/\b(0+)/gi, '')
        }
      }
    } else {
      h = s.substr(8, 2)
      minute = s.substr(10, 2)
      formatTime = m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ' + h + ':' + minute
      if (flag) {
        formatTime = m.replace(/\b(0+)/gi, '') + '/' + d.replace(/\b(0+)/gi, '') + ' ' + h + ':' + minute
      }
      if (Number(y) !== Fy) {
        formatTime = y + '年' + m.replace(/\b(0+)/gi, '') + '月' + d.replace(/\b(0+)/gi, '') + '日 ' + h + ':' + minute
        if (flag) {
          formatTime = y + '/' + m.replace(/\b(0+)/gi, '') + '/' + d.replace(/\b(0+)/gi, '') + ' ' + h + ':' + minute
        }
      }
    }
    return formatTime;
  }
};

export const delayDay = function (t) {
  var dateToday = new Date()
  var dateInvalid = new Date()
  dateInvalid.setFullYear(parseInt(t.substring(0, 4)))
  dateInvalid.setMonth(parseInt(t.substring(4, 6)) - 1)
  dateInvalid.setDate(parseInt(t.substring(6, 8)))

  var dateGap = dateInvalid.getTime() - dateToday.getTime() // Math.abs  delay - today
  var ifDelay = false
  if (dateGap < 7 * 24 * 60 * 60 * 1000) {
    ifDelay = true
  }
  return ifDelay
}


// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423   
// (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18 
export const DateFormat = function (fmt) {
  var that = new Date()
  var o = {
    'M+': that.getMonth() + 1,                 //月份   
    'd+': that.getDate(),                    //日   
    'h+': that.getHours(),                   //小时   
    'm+': that.getMinutes(),                 //分   
    's+': that.getSeconds(),                 //秒   
    'q+': Math.floor((that.getMonth() + 3) / 3), //季度   
    'S': that.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (that.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
} 