/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-08-11 13:50:41
 * @LastEditTime: 2021-08-24 18:22:16
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')
const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')
const TerserPlugin = require("terser-webpack-plugin");

const commonConfig = {
    entry: {
        main: './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                use: {
                  loader: "babel-loader",
                }
            },
            { 
                test: /\.tsx?$/, 
                // exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                loader: "ts-loader",
                // use:["ts-loader", 'eslint-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[hash][ext]'
                },
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    }, 
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]'
                },
            },
            {
                test: /\.wasm$/,
                type: 'webassembly/async',
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.wasm'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ],
    output: {
        path:path.resolve(__dirname, '../dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest',
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  name: 'vendors',
                  reuseExistingChunk: true,
                },
              },
        },
        minimizer: [
            new TerserPlugin({
                test: /\.ts(\?.*)?$/i,    //???????????????????????????
                parallel: true,   //???????????????????????????
                terserOptions: {  //Terser ????????????
                    output:{comments: false}
                },
                extractComments: true,
            }),
        ]
    },
    experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true,
    },
}

module.exports = (env) => {
    if(env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}