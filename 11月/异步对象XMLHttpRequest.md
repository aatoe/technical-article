# ajax

`AJAX（Asynchronous JavaScript and XML）`，最早出现在 2005 年的 [Google Suggest](http://google-suggest.tumblr.com/)，是在浏览器端进行网络编程（发送请求、接收响应）的技术方案，它使我们可以通过 JavaScript 直接获取服务端最新的内容而不必重新加载页面。让 Web 更能接近桌面应用的用户体验,那么他只是一个技术手段。

`AJAX 就是浏览器提供的一套 API`，可以通过 JavaScript 调用，从而实现通过代码控制请求与响应。实现通过 JavaScript 进行网络编程。	

这套api是谁？

​	XMLHttpRequest

那么现在ajax和xhr可以弄清楚了，ajax只是一个名词，正在干活的时`XMLHttpRequest`对象

这个xhr对象非常强大，现在用的axios fetch都是基于xhr，或者所有的异步请求都是基于这个东西。

#### 1.原生的xhr

```js
//我下面只写一个简单的demo,这套api非常多api，但是我现阶段研究他意义不大，能力不够。
// 1. 创建一个 XMLHttpRequest 类型的对象 —— 相当于打开了一个浏览器
var xhr = new XMLHttpRequest()
// 设置请求头，请求头可以设置多个不一样的
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
// xhr.setRequestHeader('key', 'value')
// 设置当前页面不缓存，url加戳也是一种解决方案
// res.setHeader('Cache-Control', 'no-cache')
// res.setHeader('Pragma', 'no-cache')
// res.setHeader('Expires', '-1')
// 2. 打开与一个网址之间的连接 —— 相当于在地址栏输入访问地址,第三个参数false设置同步请求，true为默认值，异	步请求
xhr.open('requestMethod', 'url',true) 
// 3. 通过连接发送一次请求 —— 相当于回车或者点击访问发送请求,null可以为其他东西，就是发送的请求体
xhr.send(null)
// 4. 指定 xhr 状态变化事件处理函数 —— 相当于处理网页呈现后的操作
xhr.onreadystatechange = function () {
  // 通过 xhr 的 readyState 判断此次请求的响应是否接收完成
  if (this.readyState === 4) {
    // 通过 xhr 的 responseText 获取到响应的响应体
    console.log(this.responseText)
    // 获取响应状态码
    console.log(this.status)
    // 获取响应状态描述
    console.log(this.statusText)
    // 获取响应头信息,这个方法坑很多的，并不能直接用的，有空回来再讲，涉及到浏览器的限制，
    // 不能随便让我拿到后端返回的头部信息。
    // 有时候一个接口返回了一张图片或者一张表格，然后图片、表格的名字就放在了头部返回来的。
    console.log(this.getResponseHeader('Content-Type')) // 指定响应头
    console.log(this.getAllResponseHeaders()) // 全部响应头
  }
}

// xhr 这种原生的请求弊端还是挺多，比如返回一个图片hui

// 当我们上传图片的时候 
let formData = new FormData();
let file = dom元素.files[0]
formData.append("key",file)
xhr.send(formData);放在请求体上面。就可以了
// 请求图片 通过responseType可以指定返回响应的类型,现在都是在json和blob之间用。
xhr.responseType = 'blob';
// 返回的结果就在状态为4的时候 xhr.response
```

**onreadystatechange**

由于 `readystatechange` 事件是在 `xhr` 对象状态变化时触发（不单是在得到响应时），也就意味着这个事件会被触发多次，所以我们有必要了解每一个状态值代表的含义,上面拿到结果的时候就是通过状态为4的时候拿到结果：

| readyState | 状态描述         | 说明                                                      |
| ---------- | ---------------- | --------------------------------------------------------- |
| 0          | unsent           | 代理（XHR）被创建，但尚未调用 `open()` 方法。             |
| 1          | opened           | `open()` 方法已经被调用，建立了连接。                     |
| 2          | headers-received | `send()` 方法已经被调用，并且已经可以获取状态行和响应头。 |
| 3          | Loading          | 响应体下载中， `responseText` 属性可能已经包含部分数据。  |
| 4          | done             | 响应体下载完成，可以直接使用 `responseText`。             |

#### 原生的写完了，先看看进阶版的

#### 2.JQuery中得ajax

jQuery 中有一套专门针对 AJAX 的封装，功能十分完善

```js
$.ajax({
  url: 'url', 
  // 默认是get
  type: 'methods',
  // 服务器返回数据进行的格式转换的格式
  dataType: 'json',
  // 请求参数
  data: { id: 1 },
  // 发送前触发，有点想统一处理的意思。但是这个比较low，下面会介绍axios，高级一些。
  beforeSend: function (xhr) {
    console.log('before send')
  },
  // 成功之后触发
  success: function (data) {
    console.log(data)
  },
  // 请求失败触发
  error: function (xhr) {
    console.log(xhr)
  },
  // 不管成功还是失败， 请求完成就会触发。
  complete: function (xhr) {
    console.log('request completed')
  }
})

// ajax 请求图片是没有这个处理的，需要自己写方法去解析返回来的流数据，我看见的都是用原生写得，要是用jquery中得ajax也是可以的，只不过需要写一个解析二进制流的方法，不难。工作中用到我再回来补吧。

```

### 3.axios

axios也是对xhr进行封装的，比jquery更加高级了

Axios是一个基于Promise（ES6中用于处理异步的）的HTTP库，用于浏览器和node.js中，[API](https://www.kancloud.cn/yunye/axios/234845)。

- 浏览器中创建XMLHttpRequests
- 从node.js中创建http请求
- 支持Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防御XSRF

##### 3.1 get请求

```js
// 直接官方的例子
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做，再也不用拼接url这种那么low的事情。
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

##### 3.2 post请求

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
 .then(function (response) {
    console.log(response);
 })
  .catch(function (error) {
   console.log(error);
});
```

##### 3.3 发送多个请求，有时候请求数据2个一起作用。才可以。就需要当请求都返回结果了，才真正返回所有结果

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

##### 3.4 创建axios实例，使用自定义配置新建一个 axios 实例

```
太多东西可以配置了。
可以根据create创建一个实例出来，然后根据自己的需求进行配置
```



### 4.跨域

> 同源策略是浏览器的一种安全策略（就是数据返回来了，给你报了一份跨域的错，其实他这样的目的就是为了安全。），所谓同源是指**域名**，**协议**，**端口**完全相同，只有同源的地址才可以相互通过 AJAX 的方式请求。
>
> 同源或者不同源说的是两个地址之间的关系，不同源地址之间请求我们称之为**跨域请求**

解决方案：

#### 4.1 JSONP

```
<script src="url?callback=foo"></script>
script为什么可以解决跨域的，就是因为他可以解决请求到这个url上面的文件，至于为什么他能去到服务器拿到这个东西，不得而知。实践证明就是他可以解决跨域。然后请求完文件之后还会去执行一下，这个动作就可以在js里面拿到数据了。

```

#### 4.1.2 JQuery对jsonp的支持

```
其实jquery对jsonp这种通过script请求的方式进行的封装，请求方式也是把dataType改为jsonp就可以了。
```

#### 4.2 CORS

Cross Origin Resource Share，跨域资源共享

```
这个是后端来做的。那么前端不需要干任何事情
```

#### 4.3 服务器反向代理

这个感觉用处也不大。我只知道他的思想，就是我们请求我们家的服务器，不存在跨域的，然后通过服务器再去请求其他服务器的资源。

#### 4.4 方案还是有很多的，但是觉得cors是比较好的方法，发现好用的方法回来补上把。