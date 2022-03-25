// 生产环境

const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'production', //tree-shaking简单说作用就是：只打包用到的代码，没用到的代码不打包，而webpack5默认开启tree-shaking，当打包的mode为production时，自动开启tree-shaking进行优化
  // source-map的作用是：方便你报错的时候能定位到错误代码的位置。 ====  production：使用nosources-source-map，只能定位源码位置，不能源码展示，体积较小，适合生产模式
  devtool: 'nosources-source-map',
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify('prodction'),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
    new BundleAnalyzerPlugin(),
    // gzip  开启Gzip后，大大提高用户的页面加载速度，因为gzip的体积比原文件小很多，当然需要后端的配合
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 去重压缩css
      new TerserPlugin({ // 压缩JS代码
        terserOptions: {
          compress: {
            drop_console: true, // 去除console
          },
        },
      }), // 压缩JavaScript
    ],
  }
})