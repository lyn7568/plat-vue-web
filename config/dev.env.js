'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG:'"dev"',
  BASE_API: '""',
  KX_API: '"http://192.168.3.233:81"',
  HT_API: '"http://192.168.3.233:83"',
})
