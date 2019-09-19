const path = require('path')
const webpack = require('webpack')

function resolveSrc(_path) {
  return path.join(__dirname, _path)
}

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/myvueforgitpages/' : '/',
  chainWebpack: config => {
    config.resolve.alias.set('utils', resolveSrc('src/cores/utils.js')) // 有實體檔案 但是想簡寫的路由
  },
  lintOnSave: false,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        src: resolveSrc('src'),
        'chart.js': 'chart.js/dist/Chart.js'
      },
      extensions: ['.ts', '.js', '.vue', '.json'] // 如果import 不寫檔名 會自動收尋
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery',
        moment: 'moment'
      })
    ]
  },
  pwa: {
    name: 'Vue Light Bootstrap Dashboard',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
}
