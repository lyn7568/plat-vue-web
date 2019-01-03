export default() => {
  return {
    account: state => state.user.account,
    bindCompany: state => state.user.bindCompany,
    headPhoto: state => state.user.headPhoto
  }
}
