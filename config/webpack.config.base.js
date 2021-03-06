'use strict'

const path = require('path')
const os = require('os')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const yaml = require('js-yaml')
const fs = require('fs')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const entry = {}
const plugins = []
const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'src/client')
const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

// const appConfigPath = path.join(root, 'config/app.yaml')
// const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath))

const pkg = require('../package.json')
const homeDir = os.homedir()
const happyTempDir = path.join(homeDir, `.happypack/${pkg.group}/${pkg.name}`)

entry.app = './app'

// 模版文件
plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'public/index.html',
    chunks: ['app']
  })
)

plugins.push(
  new HtmlWebpackPlugin({
    inject: false,
    filename: 'error.html',
    template: 'public/error.html'
  })
)

module.exports = {
  context: srcPath,
  entry,
  resolve: {
    alias: {
      common: path.join(srcPath, 'common'),
      components: path.join(srcPath, 'components'),
      pages: path.join(srcPath, 'pages'),
      utils: path.join(srcPath, 'utils'),
      assets: path.join(srcPath, 'assets')
    },
    modules: [
      srcPath,
      'components',
      'node_modules',
      'daos',
      'contants'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
        options: {
          id: 'js'
        }
      },
      {
        test: /\.tpl$/,
        loader: 'dot-tpl-loader'
      },
      {
        oneOf: [
          {
            test: /\.html$/,
            resourceQuery: /\?.*/,
            use: ['nunjucks-loader', 'extract-loader', 'html-loader']
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            resourceQuery: /\?.*/,
            loader: 'url-loader'
          },
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            loader: 'file-loader',
            options: {
              name: isDev ? '[path][name].[ext]' : '[hash:22].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'happypack/loader',
              options: {
                id: 'less'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      tempDir: happyTempDir,
      loaders: ['babel-loader'],
      verbose: isDev,
      verboseWhenProfiling: isDev
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      tempDir: happyTempDir,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            minimize: !isDev,
            sourceMap: isDev
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: isDev
          }
        }
      ],
      verbose: isDev,
      verboseWhenProfiling: isDev,
      cache: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new ExtractTextPlugin({
      filename: isDev ? '[name].css' : '[contenthash:22].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      filename: isDev ? 'app.js' : '[chunkhash].js',
      minChunks: 4
    })
  ].concat(plugins)
}
