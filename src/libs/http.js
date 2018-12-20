
let http = { };

const kexiuUrl = process.env.KX_API; // 跳转科袖链接地址、图片访问路径
const platUrl = process.env.BASE_API; // api/邮箱配置的地址

http.platUrl = platUrl;
http.kexiuUrl = kexiuUrl;

http.hQuery = {
    sign: {
      login: '/ajax/platform/login',
      modifypw: '/ajax/platform/modifypw', // 修改密码
      resetpw: '/ajax/platform/resetpw', // 重置密码
      reqResetPw: '/ajax/platform/reqResetPw', // 请求重置密码
      bindMail: '/ajax/platform/bindMail', // 绑定新邮箱
      reqBindMail: '/ajax/platform/reqBindMail' // 请求绑定新邮箱
    },
    baseInfo: {
      query: '/ajax/platform/info',
      update: '/ajax/platform/info',
      upload: '/ajax/platform/upload' // 上传平台图片
    },
    buttedOrgs: { // 对接平台机构
      nopq: '/ajax/platform/info/buttedOrgs',
      pq: '/ajax/platform/info/pqButtedOrgs',
      add: '/ajax/platform/buttedOrg',
      del: '/ajax/platform/buttedOrg/delete'
    },
    buttedProfessors: { // 对接专家
      nopq: '/ajax/platform/info/buttedProfessors',
      pq: '/ajax/platform/info/pqButtedProfessors',
      add: '/ajax/platform/buttedProfessor',
      del: '/ajax/platform/buttedProfessor/delete'
    },
    platNews: { // 平台新闻
      nopq: '/ajax/article/qa',
      pq: '/ajax/article/pageQuery'
    },
    orgTrends: { // 企业动态
      nopq: '/ajax/article/publishInPlatform',
      pq: '/ajax/article/pgPublishInPlatform',
      pqun: '/ajax/article/pgPublishNotInPlatform', // 查询未加入企业动态的入驻企业发布中的文章(分页)
      add: '/ajax/platform/referencedArticle',
      del: '/ajax/platform/referencedArticle/delete'
    },
    residentOrgs: { // 入驻企业
      nopq: '/ajax/platform/info/residentOrgs',
      add: '/ajax/platform/resident',
      del: '/ajax/platform/resident/delete'
    },
    demand: {
      nopq: '/ajax/demand/search/platform', // 查询在平台发布的需求
      add: '/ajax/demand/publishInPlatform' // 平台新增需求
    },
    addOrgs: '/ajax/platform/add/info', // 增加企业
    queryWare: '/ajax/platform/info/wares', // 找服务
    queryResource: '/ajax/platform/info/resources' // 找资源
};

http.kxQurey = {
    sign: {
      isReg: '/ajax/isReg', // 手机是否注册
      msgLogin: '/ajax/mobileLogin', // 手机登录科袖
      msgLoginVc: '/ajax/sendMobileForLogin', // 登录科袖所需的短信验证码
      msgVC: '/ajax/phoneValidCode', // 发送手机验证码
      imgVC: '/ajax/PictureVC' // 图形验证
    },
    demand: {
      add: '/ajax/demand' // 新增需求
    },
    article: {
      save: '/ajax/article/save', // 新增文章
      draft: '/ajax/article/draft', // 存草稿/预览
      timing: '/ajax/article/timing', // 定时发布文章
      del: '/ajax/article/deleteArticle', // 删除文章
      query: '/ajax/article/query', // 文章详细内容
      pqpublish: '/ajax/article/pqpublish' // 已发布的文章列表
    },
    resource: {
      query: '/ajax/resource/queryOne'
    },
    server: {
      query: '/ajax/ware/qo'
    },
    patent: {
      query: '/ajax/ppatent/qo',
      author: '/ajax/ppatent/authors'
    },
    professor: {
      query: '/ajax/professor/baseInfo/', // 专家基础信息
      query2: '/ajax/professor/info/'

    },
    org: {
      query: '/ajax/org/', // 企业基础信息
      reg: '/ajax/org/regInfo' // 机构资质
    },
    leaveMsg: {
      count: '/ajax/leavemsg/count' // 留言数量
    },
    cachedFile: '/ajax/cachedFileUpload', // 上传缓存地址
    qaHotKey: '/ajax/dataDict/qaHotKey', // 检索关键词
    editor: '/ajax/editor/controller' // 图文编辑访问的地址
};

export default http;
