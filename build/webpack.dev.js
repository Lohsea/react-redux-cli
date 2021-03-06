/*
 * @Description: webpack dev config
 * @Author: lixin
 * @Date: 2021-08-06 16:08:18
 * @LastEditTime: 2021-08-13 15:29:37
 */
const webpack =  require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devConfig = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        overlay: true,
        historyApiFallback: true,
        proxy: {}
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css",
            ignoreOrder: false, 
        }),
        new webpack.HotModuleReplacementPlugin(),          
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    optimization: {
        // 开启tree-shaking
        usedExports: true,
    },
}

module.exports = devConfig