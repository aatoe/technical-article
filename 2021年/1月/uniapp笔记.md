# uniapp笔记

##### 生命周期

```
应用生命周期 App.vue文件中
	onLaunch 当uni-app 初始化完成时触发（全局只触发一次
	onShow(){} // 切换就会触发
	onHide(){} // 切换就会触发
	onThemeChange(){} // 监听主题变化
页面生命周期 
onReady(){} // 监听页面初次渲染完成
onShow(){} // 同上
onHide(){} // 同上
onLoad(){} // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
onResize(){} // 窗口变化
onUnload(){} // 页面销毁
onPullDownRefresh(){} // 监听下拉动作
onReachBottom(){} // 触发到底部
onBackPress(){} // 监听页面返回  更多生命周期详见 https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f

组件生命周期
created(){} // 状态初始化完成
mounted(){} // 虚拟dom挂在完成
destroyed(){} // 组件销毁
```

