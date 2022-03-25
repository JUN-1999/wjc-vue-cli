const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
    // 模式 开发模式
    mode: 'development',
    // 入口文件
    entry: {
        main: './src/main.js'
    },
    // 输出文件
    output: {
        // 输出到dist文件夹
        path: path.resolve(__dirname, './dist'),
        // js文件下
        filename: 'js/chunk-[contenthash].js',
        // 每次打包前自动去除旧的dist
        clean: true
    },
    resolve: {
        // 路径别名
        alias: {
            '@': path.resolve('./src'),
            assets: '~/assets',
            tools: '~/tools'
        },
        //  引入文件时省略后缀
        extensions: ['.js', '.ts', '.less', '.vue']
    },
    devServer: {
        // 自定义端口号
        port:3290,
        // 自动打开浏览器
        open: true
    },
    // 插件都放 plugins 中
    plugins: [
        // 打包html，且打包后的html自动引入打包后的js文件
        new HtmlWebpackPlugin({
            // 选择模块 public/index.html
            template: './public/index.html',
            // 打包后的名字
            filename: 'index.html',
            // js 文件插入 body里
            inject: 'body'
        }),

        new MiniCssExtractPlugin({
            // 将css代码输出到 dist/styles 文件夹下
            filename: 'styles/chunk-[contenthash].css',
            ignoreOrder: true
        }),
        // 打包vue文件
        new VueLoaderPlugin()
    ],
    // loader 模块 都 写在module
    module: {
        rules: [
            {
                // 匹配文件后缀的规则 ———— 样式
                test: /\.(css|s[cs]ss)$/,
                use: [
                    // loader执行顺序是从右到左
                    MiniCssExtractPlugin.loader, // 将打包好的css写入html文件中的功能
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                // 匹配文件后缀的规则 ———— 图片
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: 'asset',
                parser: {
                    // 转base64的条件
                    dataUrlCondition: {
                        maxSize: 25 * 1024,
                    }
                },
                generator: {
                    // 打包到dist/image文件下
                    filename: 'images/[contenthash][ext][query]',
                }
            },
            {
                // 匹配js后缀文件
                test: /\.js$/,
                // 排除node_modules中的js
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                // 匹配文件名 vue
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    }
}