/**
 * Created by luyanan on 18/8/27.
 * professer, organization
 */
/* eslint-disable one-var */
var objCache = {
  professor: {},
  organization: {},
  company: {},
  pUser: {},
}
var objHcache = {
  professor: {},
  organization: {},
  company: {},
  pUser: {}
}
var objCacheHandler = {
  professor: function(id) {
    var hc = objHcache.professor[id]
    Vue.axios.getk('/ajax/professor/baseInfo/' + id, {
    }, function(data) {
      delete objHcache.professor[id]
      if (data.success) {
        objCache.professor[id] = data.data
        for (let i = 0; i < hc.length; ++i) {
          hc[i](true, data.data)
        }
      } else {
        for (let i = 0; i < hc.length; ++i) {
          hc[i](false)
        }
      }
    }, function() {
      for (let i = 0; i < hc.length; ++i) {
        hc[i](false)
      }
    })
  },
  organization: function(id) {
    var hc = objHcache.organization[id]
    Vue.axios.getk('/ajax/org/' + id, {
    }, function(data) {
      delete objHcache.organization[id]
      if (data.success) {
        objCache.organization[id] = data.data
        for (let i = 0; i < hc.length; ++i) {
          hc[i](true, data.data)
        }
      } else {
        for (let i = 0; i < hc.length; ++i) {
          hc[i](false)
        }
      }
    }, function() {
      for (let i = 0; i < hc.length; ++i) {
        hc[i](false)
      }
    })
  },
  company: function(id) {
    var hc = objHcache.company[id]
    Vue.axios.get('/ajax/company/qo', {
      id: id
    }, function(data) {
      delete objHcache.company[id]
      if (data.success) {
        objCache.company[id] = data.data
        for (let i = 0; i < hc.length; ++i) {
          hc[i](true, data.data)
        }
      } else {
        for (let i = 0; i < hc.length; ++i) {
          hc[i](false)
        }
      }
    }, function() {
      for (let i = 0; i < hc.length; ++i) {
        hc[i](false)
      }
    })
  },
  pUser: function(id) {
    var hc = objHcache.pUser[id]
    Vue.axios.get('/ajax/sys/user/get', {
      id: id
    }, function(data) {
      delete objHcache.pUser[id]
      if (data.success) {
        objCache.pUser[id] = data.data
        for (let i = 0; i < hc.length; ++i) {
          hc[i](true, data.data)
        }
      } else {
        for (let i = 0; i < hc.length; ++i) {
          hc[i](false)
        }
      }
    }, function() {
      for (let i = 0; i < hc.length; ++i) {
        hc[i](false)
      }
    })
  }
}
var cacheModel = {
  getProfessor: function(id, handler) {
    var data = objCache.professor[id]
    if (data) {
      handler(true, data)
    } else {
      if (objHcache.professor[id]) {
        objHcache.professor[id].push(handler)
      } else {
        objHcache.professor[id] = []
        objHcache.professor[id].push(handler)
        objCacheHandler.professor(id)
      }
    }
  },
  getOrganization: function(id, handler) {
    var data = objCache.organization[id]
    if (data) {
      handler(true, data)
    } else {
      if (objHcache.organization[id]) {
        objHcache.organization[id].push(handler)
      } else {
        objHcache.organization[id] = []
        objHcache.organization[id].push(handler)
        objCacheHandler.organization(id)
      }
    }
  },
  getCompany: function(id, handler) {
    var data = objCache.company[id]
    if (data) {
      handler(true, data)
    } else {
      if (objHcache.company[id]) {
        objHcache.company[id].push(handler)
      } else {
        objHcache.company[id] = []
        objHcache.company[id].push(handler)
        objCacheHandler.company(id)
      }
    }
  },
  getPUser: function(id, handler) {
    var data = objCache.pUser[id]
    if (data) {
      handler(true, data)
    } else {
      if (objHcache.pUser[id]) {
        objHcache.pUser[id].push(handler)
      } else {
        objHcache.pUser[id] = []
        objHcache.pUser[id].push(handler)
        objCacheHandler.pUser(id)
      }
    }
  }
}

export default cacheModel
