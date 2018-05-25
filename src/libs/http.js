
let http = { };

const utilUrl = 'http://localhost:7070/ajax';

http.utilUrl = utilUrl;

let webbase = '/api/plat';
http.webbase = webbase;

let workbench = {
    login: utilUrl + '/platform/login',
    platBase: utilUrl + '/platform/info',
    updateInfo: utilUrl + '/platform/info',
    uploadImg: utilUrl + '/platform/upload'
};
http.workbench = workbench;

let homequery = {
    residentOrgs: utilUrl + '/platform/info/residentOrgs'
};
http.homequery = homequery;

// let manage = {
//     user: {
//         list: utilUrl + '/user/list.do',
//         getById: utilUrl + '/user/getById.do',
//         save: utilUrl + '/user/save.do',
//         delete: utilUrl + '/user/delete.do',
//         validate: utilUrl + '/user/validate.do',
//         setPWD: utilUrl + '/user/setPWD.do'
//     },
//     reagent: {
//         list: utilUrl + '/reagent/list.do',
//         getById: utilUrl + '/reagent/getById.do',
//         save: utilUrl + '/reagent/save.do',
//         delete: utilUrl + '/reagent/delete.do'
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
