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

let buildPath
let publicPath
if (appConfig.out) {
  // 外包资源放置到本地
  const appName = appConfig.appCode.toLowerCase()
  buildPath = path.join(root, `build/${appName}/static`)
  publicPath = `/${appName}/static/`
}

const config = Object.assign({}, baseConfig, {
  devtool: false,
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
  new WebpackPluginHashOutput(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  })
])

module.exports = config
