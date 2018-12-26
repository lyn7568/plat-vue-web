const getters = {
  pinfo: state => state.plat.pinfo,
  account: state => state.user.account,
  bindCompany: state => state.user.bindCompany,
  headPhoto: state => state.user.headPhoto
};
export default getters;
