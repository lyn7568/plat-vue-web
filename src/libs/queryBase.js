/**
 * Created by luyanan on 18/8/27.
 * professer, organization
 */
/* eslint-disable one-var */
import request from './request'
var objCache = {
  professor: {},
  organization: {}
}
var objHcache = {
  professor: {},
  organization: {}
}
var objCacheHandler = {
  professor: function(id) {
    var hc = objHcache.professor[id]
    request.getk('/ajax/professor/baseInfo/' + id, {
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
    request.getk('/ajax/org/' + id, {
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
  }
}

export default cacheModel
