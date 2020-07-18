# Mock

> 当公司想前端跟后端并行开发的话，往往出现后端的接口并没有写好，然而前端在等待。mock也不是说万能的，只是说在某种程度上可以提高效率。
>
> 优点：当列表上的数据，或者其他渲染的数据可以使用mock，效果相当不错。
>
> 缺点：不是说所有的接口都能用mock，比如上传，提交。
>
> 所以mock在渲染数据方面能够得到很大的用处，

下面我们来放大他的用处

### 第一个版本 Json-Server + mockJS

```js
cnpm install json-server mockjs gulp-nodemon browser-sync gulp@3.9.1 --save-dev

json-server 把json文件放到本地服务器
mockjs mock模拟数据
gulp-nodemon 自动重启
browser-sync 浏览器同步测试工具
gulp 自动化工具

上面的node包链接 在 👉 https://www.npmjs.com/

期望的功能是
我们改动mock数据之后保存，触发项目重启，并把数据渲染到页面上去。

启动项目
npm run serve
gulp mock 

使用 
axios.post(`api/project`, {})
        .then((res) => {
          console.log(res);
 })
 
 项目架构
 -mock
  ----db.js
  ----gulpfile.js
  ----routes.js
  ----server.js
 
 db.js 
// mock 语法参考 http://mockjs.com/examples.html
var Mock = require('mockjs');
module.exports = {
  project: Mock.mock({  // project 就是我们路由的路径
    data: {
      mobile: "admin",
      token: "af6146b61eff44748d294002d70b20a5"
    },
    errcode: 200,
    errmsg: "ok"
  }),
  push_comment: Mock.mock({
    data: {
      "items|5-20": [{
        id: "@integer(60, 10000)",
        name: "@cname",
        spId: 3073,
        spType: 2,
        moneyUseto: '@date("yy")',
        sex: "1",
        belongsDealer: "张三阿萨德",
        datetime:'@datetime("T")',
        province:'@province()',
        city:'@city()',
        county:'@county()',
      }],
      page: {
        currentPage: 1,
        totalPage: 10,
        totalCount: 77
      },
      errcode: 200,
      errmsg: "ok"
    }
  })
};  

routes.js 
// 匹配规则:"匹配路径（同时匹配data上面的数据）"
// eg ：/project 外面请求的路径（左边） 
// /project 对应是 db.js 上面要返回的数据（右边）
module.exports = {
  "/project": "/project",
  "/comment/add.action": "/push_comment"
}

server.js  作用就是开启一个json服务器，并且把mock数据放在上面
const jsonServer = require('json-server')
const db = require('./db.js')
const routes = require('./routes.js')
const port = 3000;

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const rewriter = jsonServer.rewriter(routes)

server.use(middlewares)
// 将 POST 请求转为 GET
server.use((request, res, next) => {
  request.method = 'GET';
  next();
})

server.use(rewriter) // 注意：rewriter 的设置一定要在 router 设置之前
server.use(router)

server.listen(port, () => {
  console.log('open mock server at localhost:' + port)
})

// gulpfile.js 自动化重启服务
const path = require('path');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const server = path.resolve(__dirname, 'mock');

// browser-sync 配置，配置里启动 nodemon 任务
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8080", // 这里的端口和 webpack 的端口一致
    port: 8080
  });
});

// browser-sync 监听文件gulp.series()
gulp.task('mock', ['browser-sync'], function() {
  gulp.watch(['./db.js', './**'], ['bs-delay']);
});

// 延时刷新
gulp.task('bs-delay', function() {
  setTimeout(function() {
    browserSync.reload();
  }, 1000);
});
// 服务器重启
gulp.task('nodemon', function(cb) {
    // 设个变量来防止重复重启
    var started = false;
    var stream = nodemon({
      script: './server.js',
      // 监听文件的后缀
      ext: "js",
      env: {
        'NODE_ENV': 'development'
      },
      // 监听的路径
      watch: [
        server
      ]
    });
    stream.on('start', function() {
      if (!started) {
        cb();
        started = true;
      }
    }).on('crash', function() {
      console.error('application has crashed!\n')
      stream.emit('restart', 10)
    })
  });

在上面的基础上还需要在webpack vue.config.js 的proxy中配置代理才能使用
```

### 第二个版本 node服务器+mockjs

```js
这个版本的mock的兼容性应该是最好的，他本质上是相当于服务器，不需要在项目里面下载包，扰乱项目架构。
其实最重要的一点是，我们小程序是基于uniapp，能嵌入mock，没必要，太麻烦。
有了node写的服务器，那就非常舒服了，多端兼容，不再需要多个项目都弄。
越想越舒服。越想上面好像有点low。

express + mockjs + cors + nodemon
项目在GitHub 同级目录
功能：只需要修改router路径和mock数据就可以，且具有自动重启功能。
使用 npm run server 


app.js
const express = require("express");
const router = require("./router.js");
const app = express();
const cors = require("cors");

//设置允许跨域访问该服务.
app.use(cors());

// 添加路由
app.use(router);


const server = app.listen(3000, "localhost", function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

router.js
// 路由判断： 用来设置路由
const express = require("express");
const mock = require("./mock.js");

const router = express.Router();

// 设置路由
// 处理提交修改数据的路由
router.get("/", (req, res) => {
  let data = mock.project;
  res.send(data);
});
router.post("/post", (req, res) => {
  let data = mock.push_comment;
  console.log("收到请求");

  res.send(data);
});
module.exports = router;

const Mock = require("mockjs");
module.exports = {
  project: Mock.mock({
    // project 就是我们路由的路径
    data: {
      mobile: "admin",
      token: "af6146b61eff44748d294002d70b20a5",
    },
    errcode: 200,
    errmsg: "ok",
  }),
  push_comment: Mock.mock({
    data: {
      "items|5-20": [
        {
          id: "@integer(60, 10000)",
          name: "@cname",
          spId: 3073,
          spType: 2,
          moneyUseto: '@date("yy")',
          sex: "1",
          belongsDealer: "张三阿萨德",
          datetime: '@datetime("T")',
          province: "@province()",
          city: "@city()",
          county: "@county()",
        },
      ],
      page: {
        currentPage: 1,
        totalPage: 10,
        totalCount: 77,
      },
      errcode: 200,
      errmsg: "ok",
    },
  }),
};

mock.js
const Mock = require("mockjs");
module.exports = {
  project: Mock.mock({
    // project 就是我们路由的路径
    data: {
      mobile: "admin",
      token: "af6146b61eff44748d294002d70b20a5",
    },
    errcode: 200,
    errmsg: "ok",
  }),
  push_comment: Mock.mock({
    data: {
      "items|5-20": [
        {
          id: "@integer(60, 10000)",
          name: "@cname",
          spId: 3073,
          spType: 2,
          moneyUseto: '@date("yy")',
          sex: "1",
          belongsDealer: "张三阿萨德",
          datetime: '@datetime("T")',
          province: "@province()",
          city: "@city()",
          county: "@county()",
        },
      ],
      page: {
        currentPage: 1,
        totalPage: 10,
        totalCount: 77,
      },
      errcode: 200,
      errmsg: "ok",
    },
  }),
};

{
  // 随机生成一个大区。
  region:"@region",
  // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
  province:"@province",
  // 随机生成一个（中国）市。
  city:"@city",
  // 随机生成一个（中国）县。
  county：:"@county",
  // 随机生成一个邮政编码（六位数字）。
  zip:"@zip",
  // 返回一个随机的布尔值。
  boolean:"@boolean",
  // 返回一个随机的自然数（大于等于 0 的整数）。
  natural:"@natural",
  // 返回一个随机的整数。
  integer:"@integer",
  // 返回一个随机的浮点数。
  float:"@float",
  // 返回一个随机字符。
  character:"@character",
  // 返回一个随机字符串。
  string:"@string",
  // 返回一个整型数组。
  range:"@range",
  // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
  color:"@color",
  // #DAC0DE
  hex:"@hex",
  // rgb(128,255,255)
  rgb:"@rgb",
  // rgba(128,255,255,0.3)
  rgba:"@rgba",
  // hsl(300,80%,90%)
  hsl:"@hsl",
  // 随机生成一个有吸引力的颜色。
  _goldenRatioColor:"@_goldenRatioColor",
  // 日期占位符集合。
  _patternLetters:"@_patternLetters",
  // 日期占位符正则。
  _rformat:"@_rformat",
  // 格式化日期。
  _formatDate:"@_formatDate",
  // 生成一个随机的 Date 对象。
  _randomDate:"@_randomDate",
  // 返回一个随机的日期字符串。
  date:"@date",
  // 返回一个随机的时间字符串。
  time:"@time",
  // 返回一个随机的日期和时间字符串。
  datetime:"@datetime",
  // 返回当前的日期和时间字符串。
  now:"@now",
  // 常见的广告宽高
  _adSize:"@_adSize",
  // 常见的屏幕宽高
  _screenSize:"@_screenSize",
  // 常见的视频宽高
  _videoSize:"@_videoSize",
  //生成一个随机的图片地址。
  image:"@image",
  //大牌公司的颜色集合
  _brandColors:"@_brandColors",
  //  生成一段随机的 Base64 图片编码。
  dataImage:"@dataImage",
  //随机生成一个 GUID。
  guid:"@guid",
  // 随机生成一个 18 位身份证。
  id:"@id",
  // 生成一个全局的自增整数。
  increment:"@increment",
  // 随机生成一个常见的英文名。
  first:"@first"
  // 随机生成一个常见的英文姓。
  last:"@last",
  // 随机生成一个常见的英文姓名。
  name:"@name",
  // 随机生成一个常见的中文姓。
  cfirst:"@cfirst",
  // 随机生成一个常见的中文名。
  clast:"@clast",
  // 随机生成一个常见的中文姓名。
  cname:"@cname",
  // 随机生成一段文本。
  paragraph:"@paragraph",
  // 随机生成一个句子，第一个单词的首字母大写。
  sentence:"@sentence",
  // 随机生成一个中文句子。
  csentence:"@csentence",
  // 随机生成一个单词。
  word:"@word",
  // 随机生成一个或多个汉字。
  cword:"@cword",
  // 随机生成一句标题，其中每个单词的首字母大写。
  title:"@title",
  // 随机生成一句中文标题。
  ctitle:"@ctitle",
  //  随机生成一个 URL。
  url:"@url",
  // 随机生成一个 URL 协议。
  protocol:"@protocol",
  // 随机生成一个域名。
  domain:"@domain",
   //  随机生成一个顶级域名。
  tld:"@tld",
  // 随机生成一个邮件地址。
  email:"@email",
  // 随机生成一个 IP 地址。
  ip:"@ip",
}
```

