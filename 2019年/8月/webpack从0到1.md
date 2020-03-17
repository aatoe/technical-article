# webpack 从 "0" 到 1 构建

最近思考过一个问题? 为什么前端会存在,而不是后端会称霸. 

因为后端做不了我们前端比较细节的东西,比如工程化,性能优化更是一个大坑,跳进去就出不来了.

然后webpack就是属于前端的工程化,webpack原理性的东西还是比较难的,就是一个普通前端恐怕也不了解一二.更别说后端.

首先说明一下:学习webpack打包只是说方便我们以后的项目配置中能看懂,和增加其他配置,现实应该是不可能自己去配置的.除非你们公司的前端团队非常流弊.那么收回我刚刚的话,因为这样的公司不少.5%吧或者更低.

### <font color="#FF7F24">webpack是什么?</font>

可以看做一个模块化打包机，分析项目结构，处理模块化依赖，转换成为浏览器可运行的代码。

- 代码转换: TypeScript 编译成 JavaScript、CoffeeScript编译成 JavaScript、 SCSS,LESS 编译成 CSS.
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。

构建把一系列前端代码自动化去处理复杂的流程，解放生产力。

安装 `npm install webpack webpack-cli -D`

### <font color="#FF7F24">准备开始</font>

准备工作,首先我们自己要先把这些文件写好,最好可以运行的代码,以便于每次打包完可以测试代码是否可以运行,

我最后的代码会放在我的github上面.

那么一开始 目录结构搭建好,`package.json` `webpack.config.js` `css` `js`

![picture](https://github.com/aatoe/-/blob/master/8%E6%9C%88/webpack-demo/images/picture.jpg)

由于我已经写了一小部分了,最开始是 js+html 就够了.  其实我们最初可以打包一个js文件的时候可以用

``webpack  文件名`` 这个命令就可以打包js文件,这个文件名里面可以引入其他js(只限js,webpack默认只能打包js,如果想打包其他后缀的文件需要loader+plugins),当然这个可以帮助我们日常压缩一些简单的js文件,他的压缩效率要比在线压缩要小一些.

<font color="#F4A460">我想先拓展一些东西,关于node包下载以及版本</font>

1. `npm install module_name -S`    即    `npm install module_name --save `   写入dependencies 以后打包放在生产环境的

2. `npm install module_name -D `   即    `npm install module_name --save-dev `写入devDependencies 打包会舍弃的

   3.`npm install module_name -g` 全局安装(命令行使用)

   4.`npm install module_name` 本地安装(将安装包放在 ./node_modules 下)

下面的会在package.json会看见版本号

   5.`~`号，：比如 bootstrap:"^3.1.7", `>=`3.1.7 &&  <3.2.0,`minor version`对应的是中间的数字1,他会更新大的版本是1这个版本的最新版本,但是到不了2------------------------------------------------------------------------兼容到小版本	

   6.`^` 号, 比如 bootstrap:"^3.3.7", `>=`3.3.7 &&  <4.0.0,就是说兼容大于3.3.7的小版本, 但是大版本不兼容.

`major version`(大版本) 就是3,他会更新大的版本是3这个版本的最新版本,但是到不了4-----兼容到大版本

(会不会很绕,其实还好)	

其实webpack打包最重要的就是只有5点.掌握了基本没什么难度了.

1.entry(入口)   2.output(出口)  3.loader(加载器) 4.plugins(插件) 5.mode(模式)

 

### <font color="#FF7F24">打包HTML</font>

``目的:`` 我们要生成一个 dist文件夹 里面有我们压缩过的js,和html页面.

``配置:`` html-webpack-plugin 下载这个包(插件),它的作用是帮我们的html和js产生依赖关系,然后输出的html中帮我们引入js

webpack.config.js中的配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//比如这个打包html的插件,生产环境不会用到的,那么安装的时候 npm install --save-dev html-webpack-plugin
const config = {
    entry: './js/index.js',  //webpack会找到这个入口 
    output: {                //出口
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'  
    },
    mode: 'production', //生产模式  development开发模式  
    plugins: [
        new HtmlWebpackPlugin(////打包html需要用的插件,底层怎么做的,不知道.有空再去研究.
            {
                template: './index.html',
                // 这个是我们自己写的文件,称为模板文件
                filename: './index.html', 
                // 输出文件【注意：这里的根路径是module.exports.output.path】
            })  
    ]
};
module.exports = config;
```

package.json的配置(npm init -y生成即可)

```json
 "scripts": { 
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js --progress"
  },
这个代码就是 当我们npm run build  终端会找到scripts中的webpack 然后用webpack 
打包webpack.config.js.再细说,他是怎么打包的,首先他会找到入口文件,将入口文件的依赖全部挖出来(东西都是放在这里的,比如css,js,等等),然后看看自己这个配置文件有没有配置好,各种loader和plugins 如果有,而且第三方包也下载好了,那就打包成功.如果没有报错.

```

当我第一次打包的时候,出现了`not find module 'webpack/lib/node/NodeTemplatePlugin`报错.

我在公司电脑同样也是这个错,所以有必要说一下解决方法. npm link webapck --save-dev  字面上的意思的连接webapck的意思.

有了上面的认知之后呢!就继续不断地打包项目需要的文件的.

### <font color="#FF7F24">打包css</font>

首先我们得有css吧,先写好. 不用我们引入到页面,`我们用import "css(URL)"`引入到入口的js文件,好了.

index.js 入口文件的配置

```
import "../css/mycss.css" //引入css
```

webpack.config.js中的配置

```js
 module: {
     rules: [
         {
             test: /\.css$/,  
             // css-loader只是用于加载css文件（并没有添加到页面）
             // style-loader则是将打包后的css代码以<style>标签形式添加到页面头部。
             use: ['style-loader', 'css-loader']
             // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
         }
     ]
 },
```

**<font color="red">最后一步安装 loader</font>**

`npm install --save-dev css-loader style-loader   `

其实使用这两个loader还可以设置很多参数,自己去webpack官网找 `<https://www.webpackjs.com/loaders/style-loader/>`

`<https://www.webpackjs.com/loaders/css-loader/>`

### <font color="#FF7F24">打包图片</font>

图片的使用本来就有很多种方法,js css html.我会以这三种的方式来说,webpack怎么打包图片

`js中使用图片`

首先js, js就比较简单了,因为他不需要loader的支持,它需要一个img对象,来储存路径就ok,说到这里,其实img标签中的也是一个对象,进而联想到其他标签也可以这样想,万物皆对象,在html也是成立的哦

```js
let img = new Image();
img.src = "../images/test2.png";
document.body.appendChild(img);
//这段代码就是把图片的决定路径存在img对象中,其实他就是img标签,然后追加的body里面的最后面.
```

`css中使用图片`

```css
.myImg{
    display: block;
    width: 200px;
    height: 200px;
    background: url("../images/test.png");
    background-size: 200px;
}
```

首先图片这个东西打包的时候webpack压根不知道这是啥,**<font color="red">还会报错,说需要相关 loader</font>**

然后我们解析图片的loader有两个 ,区别就是一个可以转换base64,.

`base64`:base64的作用是什么呢? 减少请求.  缺点就是图片的大小增大1/3.

`file-loader`: npm install --save-dev file-loader

```js
  {
      test: /\.(png|jpg|gif)$/,  //正则匹配后缀
      use: [
          {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',    //name就是我们文件的原名,ext原来的后缀
                  publicPath: "./images/", //输入的路径
                  outputPath: "images/"    //输出的路径
              }
          }
      ]
  }
```

`url-loader`: npm install --save-dev url-loader

```js
 {
     test: /\.(png|jpg|gif|jpeg)$/,
     use: [
         {
             loader: 'url-loader',
             // options:  
             //     limit: 8192  //这个选项中的如果没有选择那么,就是默认只要是图片都是转换成base64
             //那么设置了话就是小于8192 == 8k 都是转为base64. 
             // }
         }
     ]
 },
```

上面是根据你的需求选择就可以了,二者选其一.没有优劣之分.

`html中使用图片`

首先html中使用图片经过webpack打包时用不了的,你去访问他是访问不了.同样也是需要一个loader

但是他是在上面两个loader任选其一,再加上一个html-loader,才可以打包图片

`html-loader`: npm i -D html-loader

```js
 {
     test: /\.html$/,
     use: [
         {
             loader: "html-loader",
             options: {
                 attrs: ["img:src"]
//img是指html中的 <img/> 标签， src是指 img的src属性表示 html-loader 作用于 img标签中的 src的属性
             }
         }
     ]
 },
```

### <font color="#FF7F24">使用bootstrap</font>

其实这个时候使用 bootstrap的话,不需要在配置什么了,只需要配置 字体能够识别就可以了,我是这么理解的,字体图标,和图其实差不多,所以他们需要`url-loader`这个来解析.由于刚刚已经写过了,所以我们只需要添加上几个字体后缀即可.

正常的在我们的入口js中引入即可

**入口文件**

```js
import "../bootstrap-3.3.7-dist/css/bootstrap.min.css";
import "../bootstrap-3.3.7-dist/js/bootstrap.js";
```

**webpack.config.js **中配置参数

```js
 {
      test: /\.(png|jpg|gif|jpeg|ttf|eot|svg|woff|woff2)$/,
      use: [
          {
              loader: 'url-loader',
          }
           
```

### <font color="#FF7F24">热更新</font>

HMR(Hot Module Replacement) 也叫热替换,应用于开发中的,用过框架都知道,框架前1s 我们修改了代码,后一秒页面就呈现出来了.这就是热更新.

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。

首先我们想要使用的话,必须在配置一个webpack提供的开启临时服务器的包 `webpack-dev-server`

`安装`: npm install --save-dev webpack-dev-server. 

然后我们开启服务和打包不是同一命令.所以我们需要去配置一下脚本

**package.json中配置脚本**

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config webpack.config.js --progress",
  "start": "webpack-dev-server  --open"
},
```

**webpack.config.js **中配置参数

```js
devServer: {               //webpack开启临时服务器
    contentBase: './dist', //开启服务器的访问资源
    host: 'localhost',     //ip
    port: '8080',          //端口号
    hot: true,             //启动热更新
},
    
plugins: [    //热更新插件
	new webpack.NamedModulesPlugin(), 
    //NamedModulesPlugin，更容易查看要修补(patch)的依赖,不是必须得,
	new webpack.HotModuleReplacementPlugin()
]
```

那么现在我们只需要 npm run start 就可以启动服务了.

当我们修改样式也会不刷新的改变页面,不过有点小慢,2s作用,因为需要打包时间,打包完之后把文件上传到我们的临时服务,接着加载资源,需要时间是正常.   嗯,是的,我电脑配置太低了.



从图片可以看出,就是,我们mycss.css修改了,然后webpack中的HMR帮我们热更新了.

![hot-updata](https://github.com/aatoe/-/blob/master/8%E6%9C%88/webpack-demo/images/hot-updata.png)



### <font color="#FF7F24">**source map **地图映射</font>

source map是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术。尤其是如今前端开发中大部分的代码都经过编译，打包等工程化转换。举个栗子, 比如我们的代码打包过后,是不是通常一行显示,

你根本无法判断你哪里出错了. 其实你偶尔引入的第三方模块,使用出错了,模块报了错,你去看控制台同样是压缩过的代码.  `source map `他的作用就是报错信息可以告诉我们具体哪个文件哪一行,就是和我们完全没有打包过的代码一样的看代码.  

**将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。**

**webpack.config.js **中配置参数,

```js
devtool: 'inline-source-map', 
```

为了验证这个配置是否有效,我故意写了个bug

print.js   ,并在index.js中引入和执行.

```js
export default function printMe() {
  cosnole.error('I get called from print.js!');
}
```

开启前

![no-source-map](https://github.com/aatoe/-/blob/master/8%E6%9C%88/webpack-demo/images/no-source-map.png)

开启后

![source-map](https://github.com/aatoe/-/blob/master/8%E6%9C%88/webpack-demo/images/source-map.png)

从图中我们可以看出,sourcemap 可以清楚知道那个文件那一行出错了.

其实我们是不会靠自己去配webpack这包工具的,效率这个问题上,让我们去用脚手架,因为脚手架是有人去维护的,实时更新版本,不像个人维护的,版本还要自己去摸索控制,试问精力哪里有这么多,当然公司团队强大肯定会有人去做这个事情.

(完)
欢迎关注我的公众号 郭教练的Web世界


欢迎关注我的github : <https://github.com/aatoe/->

