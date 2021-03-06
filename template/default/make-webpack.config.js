'use strict'

// @see http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
// @see https://github.com/webpack/react-starter/blob/master/make-webpack-config.js

var path = require('path')
var fs = require('fs')

var webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var srcDir = path.resolve(process.cwd(), './src')
var assets = 'build/'


var excludeFromStats = [
  /node_modules[\\\/]/
];

var projectJson = require('./package.json')

/*
 * 静态资源路径，根据需要自行修改
 * name 和 version 请写在 package.json 里面
 * 最终静态资源路径为 publicPath 和 PUBLIC_PATH 拼接
 * 比如 publicPath 为 static.yiji.com/
 * 那么最终静态资源路径为 static.yiji.com/yiji/name/version
 */
const PUBLIC_PATH = `yiji/${projectJson.name}/${projectJson.version}`

function makeConf(options) {
  options = options || {};

  var debug = options.debug !== undefined ? options.debug : true
  var entries = genEntries()
  var chunks = Object.keys(entries)
  var config = {
    mode: debug ? 'development' : 'production',
    entry: entries,
    output: {
      // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存里
      path: path.resolve(debug ? '__build' : assets),
      filename: debug ? '[name].js' : `${PUBLIC_PATH}/scripts/[name].js`,
      chunkFilename: debug ? '[chunkhash:8].chunk.js' : `${PUBLIC_PATH}/scripts/[chunkhash:8].chunk.min.js`,
      hotUpdateChunkFilename: debug ?'[id].[chunkhash:8].js' : `${PUBLIC_PATH}/scripts/[id].[chunkhash:8].min.js`,
      /** 
       * 这里很重要，请根据需要配置发布路径
       * 若上线到服务端项目中，应配置为在项目中的web路径（以/开头，避免图片路径问题）
       * 若上线到资源服务器，请配置为'资源服务器地址/项目名称/项目版本/'，参照以下
       */

      /* 发布的资源放到项目内 */
      // publicPath: debug ? '/__build/' : './'

      /* 发布的资源放到测试资源服务器 */
      publicPath: debug ? '/__build/' : '//shouyt.yijifu.net/'

      /* 发布的资源放到线上资源服务器 */
      // publicPath: debug ? '/__build/' : '//static.yiji.com/'
    },
    externals:{
      'jQuery':'window.jQuery',
      '$':'window.jQuery',
      'jquery': 'window.jQuery'
    },

    resolve: {
      modules: [
        srcDir,
        path.join(__dirname, 'src'),
        path.resolve(process.cwd(), './node_modules'),
        'node_modules'
      ],
      alias: {
        '@': path.join(__dirname, 'src')
      },
      extensions: ['.js', '.css', '.scss', '.tpl', '.png', '.jpg']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              interpolate: true,
              minimize: true
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            debug ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1,
              mimetype: 'image/jpg',
              name: `${PUBLIC_PATH}/images/[name]_[hash].[ext]`
            }
          }
        },
        {
          test: /\.(woff2?|eot|ttf)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: `${PUBLIC_PATH}/fonts/[name].[ext]`
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\manifest.json$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: `${PUBLIC_PATH}/static/[name].[ext]`
            }
          }
        }
      ]
    },

    optimization: {
      splitChunks: {
        name: 'common',
        chunks: 'all',
        // Modules must be shared between all entries
        minChunks: chunks.length // 提取所有chunks共同依赖的模块
      }
    },

    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: `${PUBLIC_PATH}/css/[name].css`,
        chunkFilename: `${PUBLIC_PATH}/css/[id].css`,
      })
    ],

    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats,
        colors: true
      }
    }
  };

  var pages = fs.readdirSync(srcDir)

  var links = [];
  pages.forEach(function(filename) {
    var m = filename.match(/(.+)\.html$/)
    if(m) {

      var fileContent = fs.readFileSync(
        path.resolve(srcDir, filename), 'utf-8')
      var injectReg = /\<meta\s[^\<\>]*name=\"no-need-script\"[^\<\>]*\>/
      var inject = injectReg.test(fileContent) ? false : 'body'
      var title = (/<title>[^<>]*<\/title>/i).exec(fileContent)[0]

      title = title.replace(/<\/?title>/g, '')
      links.push(`<li><a href="${config.output.publicPath}${m[0]}">${title}-${filename}</a></li>`)

      // @see https://github.com/kangax/html-minifier
      var conf = {
        template: path.resolve(srcDir, filename),
        filename: filename
      }

      if (m[1] in config.entry) {
        conf.inject = inject
        conf.chunks = ['common', m[1]]
      }

      config.plugins.push(new HtmlWebpackPlugin(conf))

      // 自动生成对应的 js 文件
      var jsPath = path.resolve(srcDir, 'scripts/', filename.replace('.html', '.js'))
      if(!injectReg.test(fileContent) && !fs.existsSync(jsPath)) {
        var fd = fs.openSync(jsPath, 'a')
        fs.appendFileSync(jsPath, '/**\n* '+filename+'的入口文件\n*/\n', {encoding: 'utf-8'})
        fs.closeSync(fd)
      }

    }
  });

  if (debug) {
    config.plugins.push(new HtmlWebpackPlugin({
      templateContent: function() {
        return `<!DOCTYPE html><html>
        <style>a {background: transparent none repeat scroll 0 0;color: #2db7f5;outline: medium none;transition: color 0.3s ease 0s;}</style>
        <head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>目录</title><meta name="no-need-script">
        </head><body><div>
        <ul>${links.join('')}</ul>
        </body></html>`
      },
      inject: false,
      filename: '__menu.html'
    }))
  } else {

    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }))

    config.plugins.push(new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          properties: false,
          warnings: false
        },
        output: {
          beautify: true,
          quote_keys: true
        },
        ie8: true
      },
      sourceMap: true
    }))

  }

  return config
}

function genEntries() {
  var jsDir = path.resolve(srcDir, 'scripts')
  var names = fs.readdirSync(jsDir)
  var map = {}

  names.forEach(function(name) {
    var m = name.match(/(.+)\.js$/)
    var entry = m ? m[1] : ''
    var entryPath = entry ? path.resolve(jsDir, name) : ''

    if(entry) map[entry] = entryPath
  })
  return map
}

module.exports = makeConf
