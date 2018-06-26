'use strict'

const path = require('path')
const baseConfig = require('./webpack.config.base')
const root = path.join(__dirname, '../')
const buildPath = path.join(root, 'build')

const config = Object.assign({}, baseConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: true,
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  }
})

module.exports = config
