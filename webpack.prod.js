// 生产环境配置
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'source-map', //生产环境使用，注意不是 inline-source-map
    plugins: [
        // new UglifyJSPlugin()
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        })
    ]
});