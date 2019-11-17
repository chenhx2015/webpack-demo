const path = require('path');
const HtmlWebpacklugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

// webpack 最出色的功能之一就是：除了 javascript,还可以通过 loader 引入任何其他类型的文件
// 在 entry 添加 src/print.js 作为新的入口起点（print），然后修改 output，以便根据入口起点名称动态生成 bundle 名称
module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map', // 不要用于生产环境，将编译后的代码映射回原始源代码，为了更容易地追踪错误和警告
    // 告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件,再添加start脚本直接运行开发服务器
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            // 加载css资源，就能使用import导入使用了
            {
                test: /\.css$/, // 注意这里没有引号，是个正则
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpacklugin({
            title: 'caching'
        })
    ],
    // 请注意代码分割里面的防止重复，需要这样配置，中文官方文档还是使用老的方法在 plugins里面配置，会报错
    // @todo 此配置可仔细研究其配置的参数
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                // commons: {
                //     name: 'commons',
                //     chunks: 'initial',
                //     minChunks: 2
                // }
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    output: {
        // filename: '[name].bundle.js',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist') // todo path.resolve 方法
    }
}