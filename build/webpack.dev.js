// 开发环境

const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const webpack = require('webpack')

module.exports = merge(base, {
    mode: 'development',
    // source-map的作用是：方便你报错的时候能定位到错误代码的位置。 =====  development：使用eval-cheap-module-source-map模式，能具体定位到源码位置和源码展示，适合开发模式，体积较小
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        open: true,
        hot: true, // 热更新
    },
    plugins: [
        // 定义全局变量
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_DEV: JSON.stringify('development'),
                    // 这里可以定义你的环境变量
                    // VUE_APP_URL: JSON.stringify('https://xxx.com')
                },
            },
        }),
        new webpack.HotModuleReplacementPlugin(), // 热更新
    ]
})