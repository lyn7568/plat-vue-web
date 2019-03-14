'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG:'"dev"',
  BASE_API: '""',
  PLAT_ID: '"F5DEA8EDB12E421A9FC4B701BB6176A6"',
  KX_API: '"http://192.168.3.233:81"',
  HT_API: '"http://192.168.3.233:83"',
})
