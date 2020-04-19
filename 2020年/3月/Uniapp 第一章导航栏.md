# Uniapp 导航



### 三大平台的跳转原理

- H5 通过 window.history 属性对其进行访问，改变路由记录从而实现跳转
- ios/安卓 是改变根视图或操作导航控制器出栈进栈从而实现跳转
- 小程序实现跳转采用的方式也是改变根视图或操作导航控制器出栈进栈

如果你要把用 Uniapp 开发的项目编译成 H5，那么该项目呈现的是单页面应用，单页面应用实现页面跳转是通过监测页面 url 的 hash 改变而加载不同页面。hash 模式背后的原理是 onhashchange 事件，可以在 window 对象上监听这个事件：

```js
window.location.hash = 'list/list' // 设置页面 url 的 hash，会在当前url后加上 '#list/list'

let hash = window.location.hash // '#/pages/list/list'

window.addEventListener('hashchange', function(){ 
    // 监听 hash 变化，点击浏览器的前进后退或者hash改变会触发
})
// 补充一点：路由的实现 通过hashchange onLoad 这个两个事件实现，当然里面肯定还有更复杂的东西啦！
```

如果你要用 Uniapp 开发的项目编译成微信小程序，就要注意微信小程序的页面栈的限制了，小程序中页面栈限制最多十层（微信进行了限制调整），随着页面栈的push增加，在不知道的情况下就会堆栈到十层，再用API navigateTo 去跳转页面就跳不动了，用户会跳转失效（卡死状态）。

简单化是微信小程序的开发理念的其中之一，如果你的页面栈层出现爆栈卡制，那么可以考虑一下你的产品项目的入口是不是设计的太深了，如果是，那这是多么糟糕的用户体验呀。



## Uniapp 的路由与页面跳转

Uniapp 集成多端的跳转方式，以标签 navigator 及封装 API 的形式控制应用内的跳转。

如果我想要首页跳转到列表页面并传一些参数：



```js
// 在起始页面跳转到list.vue页面并传递参数
// 该页面需要在 pages.json 注册

//编程式导航
uni.navigateTo({
    url: '/pages/list/list?id=1&name=uniapp'
});

// 或者声明形式跳转
<navigator url="/pages/list/list?id=1&name=uniapp">去列表</navigator>



// 在list.vue页面接受参数
export default {
    onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
        console.log(option.id); //打印出上个页面传递的参数。
        console.log(option.name); //打印出上个页面传递的参数。
    }
}
```



### 了解不同的跳转的意义

```js
1.uni.navigateTo(OBJECT)
// 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面，意思就是push url页面进栈， 实例在上面

2.uni.redirectTo(OBJECT)
// 关闭当前页面，跳转到应用内的某个页面。pop当前页面栈，push url页面进栈
//实例 
uni.redirectTo({
    url: 'test?id=1'
});

3.uni.reLaunch(OBJECT)
// 关闭所有页面，打开到应用内的某个页面。清空页面栈，push url页面进栈
// 实例
uni.reLaunch({
    url: 'test?id=1'
});

4.uni.switchTab(OBJECT)
// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。清空页面栈，push 新的tabBar页面
// 实例
uni.switchTab({
    url: '/pages/index/index'
});

5.uni.navigateBack(OBJECT)
// 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。pop 页面栈，
// 实例
// pop2层页面
uni.navigateBack({
    delta: 2
});

注意点
* navigateTo, redirectTo reLaunch 只能打开非 tabBar 页面。
* 页面跳转路径有层级限制，不能无限制跳转新页面
* 跳转到 tabBar 页面只能使用 switchTab 跳转
* 路由 API 的目标页面必须是在 pages.json 里注册的 vue 页面。如果想打开 web url，在 App 平台可以使用 plus.runtime.openURL 或 web-view 组件；H5 平台使用 window.open；小程序平台使用 web-view 组件（url需在小程序的联网白名单中）。在 hello uni-app 中有个组件 ulink.vue 已对多端进行封装，可参考。
```

### `open-type` 属性

```html
<navigator url="navigate/navigate?title=navigate" open-type="navigate">
    跳转到新页面
</navigator>
```

open-type 跳转方式参数对应：

```html
| 值        | 说明     |  平台差异说明  |
| --------  | :-----:  | :----:  | 
| navigate  | 对应 uni.navigateTo 的功能     |   |
| redirect  | 对应 uni.redirectTo 的功能     |   |
| switchTab | 对应 uni.switchTab 的功能       |  |
| reLaunch  | 对应 uni.reLaunch 的功能       |  头条小程序不支持 |
| navigateBack  | 对应 uni.navigateBack 的功能 |     |
```

