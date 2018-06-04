
let http = { };

const kexiuUrl = 'http://192.168.3.233:81';
const platUrl = 'http://localhost:7070';

// const kexiuUrl = 'http://192.168.3.233'; // 跳转科袖链接地址、图片访问路径
// const platUrl = 'http://192.168.3.233:2080'; // 邮箱配置的地址

const utilUrl = platUrl + '/ajax'; // 平台访问的接口地址

http.platUrl = platUrl;
http.utilUrl = utilUrl;
http.kexiuUrl = kexiuUrl;

http.webbase = '/api/plat';

http.hQuery = {
    sign: {
      login: utilUrl + '/platform/login',
      modifypw: utilUrl + '/platform/modifypw', // 修改密码
      resetpw: utilUrl + '/platform/resetpw', // 重置密码
      reqResetPw: utilUrl + '/platform/reqResetPw', // 请求重置密码
      bindMail: utilUrl + '/platform/bindMail', // 绑定新邮箱
      reqBindMail: utilUrl + '/platform/reqBindMail' // 请求绑定新邮箱
    },
    baseInfo: {
      query: utilUrl + '/platform/info',
      update: utilUrl + '/platform/info',
      upload: utilUrl + '/platform/upload' // 上传平台图片
    },
    buttedOrgs: { // 对接平台机构
      nopq: utilUrl + '/platform/info/buttedOrgs',
      pq: utilUrl + '/platform/info/pqButtedOrgs',
      add: utilUrl + '/platform/buttedOrg',
      del: utilUrl + '/platform/buttedOrg/delete'
    },
    buttedProfessors: { // 对接专家
      nopq: utilUrl + '/platform/info/buttedProfessors',
      pq: utilUrl + '/platform/info/pqButtedProfessors',
      add: utilUrl + '/platform/buttedProfessor',
      del: utilUrl + '/platform/buttedProfessor/delete'
    },
    platNews: { // 平台新闻
      nopq: utilUrl + '/article/qa',
      pq: utilUrl + '/article/pageQuery'
    },
    orgTrends: { // 企业动态
      nopq: utilUrl + '/article/publishInPlatform',
      pq: utilUrl + '/article/pgPublishInPlatform',
      pqun: utilUrl + '/article/pgPublishNotInPlatform', // 查询未加入企业动态的入驻企业发布中的文章(分页)
      add: utilUrl + '/platform/referencedArticle',
      del: utilUrl + '/platform/referencedArticle/delete'
    },
    residentOrgs: { // 入驻企业
      nopq: utilUrl + '/platform/info/residentOrgs',
      add: utilUrl + '/platform/resident',
      del: utilUrl + '/platform/resident/delete'
    },
    demand: {
      nopq: utilUrl + '/demand/search/platform', // 查询在平台发布的需求
      add: utilUrl + '/demand/publishInPlatform' // 平台新增需求
    },
    addOrgs: utilUrl + '/platform/add/info', // 增加企业
    queryWare: utilUrl + '/platform/info/wares', // 找服务
    queryResource: utilUrl + '/platform/info/resources' // 找资源
};

http.kxQurey = {
    sign: {
      isReg: utilUrl + '/isReg', // 手机是否注册
      msgLogin: utilUrl + '/mobileLogin', // 手机登录科袖
      msgLoginVc: utilUrl + '/sendMobileForLogin', // 登录科袖所需的短信验证码
      msgVC: utilUrl + '/phoneValidCode', // 发送手机验证码
      imgVC: utilUrl + '/PictureVC' // 图形验证
    },
    demand: {
      add: utilUrl + '/demand' // 新增需求
    },
    article: {
      save: utilUrl + '/article/save', // 新增文章
      draft: utilUrl + '/article/draft', // 存草稿/预览
      timing: utilUrl + '/article/timing', // 定时发布文章
      del: utilUrl + '/article/deleteArticle', // 删除文章
      query: utilUrl + '/article/query', // 文章详细内容
      pqpublish: utilUrl + '/article/pqpublish' // 已发布的文章列表
    },
    professor: {
      query: utilUrl + '/professor/baseInfo/', // 专家基础信息
      researchArea: utilUrl + '/researchArea/' // 研究方向
    },
    org: {
      query: utilUrl + '/org/' // 企业基础信息
    },
    leaveMsg: {
      count: utilUrl + '/leavemsg/count' // 留言数量
    },
    cachedFile: utilUrl + '/cachedFileUpload', // 上传缓存地址
    qaHotKey: utilUrl + '/dataDict/qaHotKey', // 检索关键词
    editor: utilUrl + '/editor/controller' // 图文编辑访问的地址
};

export default http;
