const webpack = require('webpack');
const {VueLoaderPlugin} = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env ={}) => ({
    mode: env.prod ? "production" : "development",
    entry: ["@babel/polyfill", "./test/main.js"],
    resolve: {
        alias:{
            vue: "vue/dist/vue.esm-bundler.js"
        }
    },
    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader", exclude: /node_modules/, },
            { test: /\.vue$/, use: "vue-loader" },
            { test: /\.css$/, use: [
                'vue-style-loader',
                "css-loader",
            ]},
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/app.css'
        }),
        new HtmlWebpackPlugin({
            template: "./test/index.html"
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        hotOnly: true,
        stats: "minimal",
        overlay: true,
        injectClient: false,
        disableHostCheck: false
      }
});