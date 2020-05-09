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
```

### 第二个版本 node服务器+mockjs

```
晚一些回来补上
```

