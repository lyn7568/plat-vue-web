'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PLAT_ID: '"9619237FAF5E4B908F0F88A5845C8C9F"',
  BASE_API: '"http://localhost:7070"',
  KX_API: '"http://192.168.3.233:81"'
})
