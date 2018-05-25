
let http = { };

const utilUrl = 'http://localhost:7070/ajax';

http.utilUrl = utilUrl;

let webbase = '/api/plat';
http.webbase = webbase;

let hQuery = {
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
    addOrgs: utilUrl + '/platform/add/info', // 增加企业
    addDemand: utilUrl + '/demand/publishInPlatform', // 平台新增需求
    queryWare: utilUrl + '/platform/info/wares', // 找服务
    queryResource: utilUrl + '/platform/info/resources' // 找资源
};
http.hQuery = hQuery;

// let manage = {
//     user: {
//         list: utilUrl + '/user/list.do',
//         getById: utilUrl + '/user/getById.do',
//         save: utilUrl + '/user/save.do',
//         delete: utilUrl + '/user/delete.do',
//         validate: utilUrl + '/user/validate.do',
//         setPWD: utilUrl + '/user/setPWD.do'
//     },
//     kit: {
//         list: utilUrl + '/kit/list.do',
//         getById: utilUrl + '/kit/getById.do',
//         save: utilUrl + '/kit/save.do',
//         delete: utilUrl + '/kit/delete.do'
//     }
// };

// http.manage = manage;

// let sample = {
//     list: utilUrl + '/sample/list.do',
//     getById: utilUrl + '/sample/getById.do',
//     save: utilUrl + '/sample/save.do',
//     delete: utilUrl + '/sample/delete.do'
// };

// http.sample = sample;

let status = {
    sucess: '000000'
};

http.status = status;

export default http;
