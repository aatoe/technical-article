const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    mode: 'production', //生产模式  development开发模式
    module: {
        rules: [
            //处理css
            {
                test: /\.css$/,//，css-loader只是用于加载css文件（并没有添加到页面）
                //，而style-loader则是将打包后的css代码以<style>标签形式添加到页面头部。
                use: ['style-loader', 'css-loader']
                // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            },
            //处理html中的图片
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                            //此处的参数值  img是指html中的 <img/> 标签， src是指 img的src属性   表示 html-loader 作用于 img标签中的 src的属性
                        }
                    }
                ]
            },
            //处理图片
            {
                test: /\.(png|jpg|gif|jpeg|ttf|eot|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        // options: {
                        //     limit: 819200
                        // }
                    }
                ]
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             // options: {}
            //             options: {
            //                 name: '[name].[ext]',
            //                 publicPath: "./images/",
            //                 outputPath: "images/"
            //             }
            //         }
            //     ]
            // }


        ]
    },
    devServer: {       //webpack开启临时服务器
        contentBase: './dist', //开启服务器的访问资源
        host: 'localhost',//ip
        port: '8080', //端口号
        hot: true,   //启动热更新
    },
    // devServer: {  下面的配置和上面是一样的
    //    
    //        hot: true,   //启动热更新
    // },
    plugins: [
        new HtmlWebpackPlugin(//打包html需要用的插件,底层怎么做的,不知道.有空再去研究.
            //比如这个打包html的插件,生产环境不会用到的,那么安装的时候 npm install --save-dev html-webpack-plugin
            {
                template: './index.html',
                filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            }),
        //热更新插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
       
    ],
    devtool: 'inline-source-map', 

    // watch: true   // 监听修改自动打包
};

module.exports = config;