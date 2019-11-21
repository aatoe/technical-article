# Vue插件

 作用：允许程序员向 Vue 中添加一些内容：

​    1.0 添加全局方法或者属性。如: vue-custom-element
​    2.0 添加全局资源：指令/过滤器/过渡等。如 vue-touch
​    3.0 通过全局混入来添加一些组件选项。如 vue-router
​    4.0 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
​    5.0 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

    步骤：
        插件的定义
            1）创建一个插件的 js 文件
            2）创建一个插件对象，添加 install 方法（方法中的第一个参数是 Vue 构造器）
            3）给 Vue 添加内容
            4）将插件对象暴露给外界
        插件的使用：
            1）引入插件
            2）Vue.use(mychajian)
`封装请求`

```js
问题一：
    在 vue 中需要引入 axios，但是，我们引入的方式不是使用插件的方式
解决方案：
    将引入改为插件.
思考路线,挂载到window上面污染全局变量,那么就是挂载到vue上面就ok了.

// 第一步创建一个插件(js文件),什么样的都可以.按照这种格式写(大概模板).
// 引入 axios
import axios from 'axios'
// 创建一个插件对象
var myaxios = {}
// 添加一个 install 方法
myaxios.install = function (Vue) {
    // 统一设置请求的 API
    // axios.defaults.baseURL = 'http://192.168.1.56' +':8888/api/private/v1/'
    // 设置一个请求拦截器
    // axios.interceptors.request.use(config => {
    // 这里是一个回调函数，这个函数会在请求发送之前执行，这时，这个 axios 已经将所有的参数放到了 config 中
    //if (config.url !== 'login') {
   		// 统一设置 token
   		// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    	// 应该将 token 添加到 config 中
         // config.headers.common['Authorization'] = localStorage.getItem('token')
        // }
        // return config
    // })
}
    // 给 Vue 添加一些功能（实例方法)
    Vue.prototype.$http = axios
}
// 将插件对象暴露出去
export default myaxios

// 第二步在main.js中引入并使用.
// 使用插件形式的 axios
import myaxios from './assets/js/myaxios.js'
// use 方法会调用 myaxios 中的 install 方法，并且将 Vue 传入到这个方法中
Vue.use(myaxios)

// 真正使用的时候
// 到时候使用的时候就是 this.$http 就可以访问我们这个axios了. 
```

`过滤器`

```js
问题二

// 第一步定义
//引入第三方包
import moment from "moment"
//定义,以免到时候出现undefined
let mymoment = {};
//运用一些install方法,因为,将来的Vue.use的时候自动调用install这个方法,就不用我们操心了,
//我们需要把值处理好,再返回就好了
mymoment.install = function(Vue){
    // 一个全局过滤器,然后里面是过滤器名,然后再是一个回调函数,带一个处理好的返回值
    Vue.filter("myfilter",function(val,str){
        return moment(val).format(str);
    })
}

//将插件暴露出去
export default mymoment

// 第二步使用
import mymoment from "./assets/js/mycoment.js"
Vue.use(mymoment)

// 真正使用的时候
 <el-table-column label="创建时间">
    <template slot-scope="scope">
        {{scope.row.add_time | myfilter('YYYY-DD-MM hh:mm:ss a')}}
    </template>
 </el-table-column>
```

`一些全局插件`

```js
import Vue from "vue"

var MyPlugin = {}
MyPlugin.install = function (Vue, option) {
  Vue.prototype.$Toast = (tips) => {
      console.log(tips);
    let ToastTpl = Vue.extend({ // 1、创建构造器，定义好提示信息的模板
      template: '<div >' + tips + '</div>'
    })
    let tpl = new ToastTpl().$mount().$el // 2、创建实例，在文档之外渲染成
    document.getElementById("app").appendChild(tpl) // 3、把创建的实例添加到body中
    setTimeout(function () { // 4、延迟25秒后移除该提示
      document.getElementById("app").removeChild(tpl)
    }, 25000) 
  }
}

export default MyPlugin

import toast from "./assets/js/toast.js"
Vue.use(toast)

// 到时候使用的时候
this.$Toast("永远要相信,天道酬勤")
```

