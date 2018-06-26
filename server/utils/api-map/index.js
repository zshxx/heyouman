const papayaApiMap = require('@wac/papaya-api-map')
const pathMap = require('./path-map')
const { apiPrefix, backendMap } = require('../config')
const removePrefix = require('../remove-prefix')

const mapper = papayaApiMap({
  domain: backendMap,
  pathMap
})

// ajax 请求会在接口请求路径前加上 apiPrefix，用于区分页面请求和 ajax 请求
// 计算实际路径时，清除请求路径的前缀
module.exports = path => mapper(removePrefix(path, apiPrefix))
