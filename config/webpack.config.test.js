'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackPluginHashOutput = require('webpack-plugin-hash-output')

const yaml = require('js-yaml')
const fs = require('fs-extra')
const baseConfig = require('./webpack.config.base')

const root = path.join(__dirname, '../')
const appConfigPath = path.join(root, 'config/app.yaml')
const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath))
const pkgJSON = require('../package.json')

let buildPath
let publicPath
if (appConfig.out) {
  // 外包资源放置到本地
  const appName = appConfig.appCode.toLowerCase()
  buildPath = path.join(root, `build/${appName}/static`)
  publicPath = `/${appName}/static/`
} else {
  buildPath = path.join(root, 'build')
  publicPath = `//test.wacdn.com/s/${pkgJSON.name}/`
}

const config = Object.assign({}, baseConfig, {
  devtool: 'inline-source-map',
  output: {
    path: buildPath,
    publicPath: publicPath,
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    hashDigestLength: 22
  }
})
config.plugins = config.plugins.concat([
  new webpack.HashedModuleIdsPlugin(),
  new WebpackPluginHashOutput()
])

module.exports = config
