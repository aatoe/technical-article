# vue问答题 基于element-ui

**1.style加scoped属性的用途和原理**

```
用途：防止全局同名CSS污染
原理：在标签加上v-data-something属性，再在选择器时加上对应[v-data-something]，即CSS带属性选择器，以此完成类似作用域的选择方式
```

**2.怎么重置数据**

```
1.逐个赋值
2.使用 Object.assign(this.data, this.$options.data())
3.重置 data 中某个对象或属性，比如this.params：this.params = this.$options.data().params


重置from表单的数据 this.$refs[formName].resetFields();
```

**3.vue组件之间的通信都有哪些**

```
父子Coms
兄弟Coms
跨级Coms: 

1.props
2.$emit/$on
3.( $parents/$children ) / $refs
4.Vuex
5.Bus
6.( provide/inject )
7.( $attrs/$listeners )
```

**4.你对指令的理解**

```
1.创建编译模板的compile对象
2.编译
3.解析指令
4.调用v-xx函数(v-for除外)
5.调用节点更新的函数
6.页面更新

主要是给我们方便对dom操作
```

**5.$nextTick有什么作用**

```
在dom更新后做一些操作。
```

**6.vue渲染模板时怎么保留模板中的HTML注释**

```html
<template comments>
  ...
</template>
```

**7.vue中key的原理**

```
diff算法，根据key的值来判断。
作用的话，便于diff算法的更新，key的唯一性，能让算法更快的找到需要更新的dom，需要注意的是，key要唯一，不然会出现很隐蔽性的更新问题。
```

**10.在vue事件中传入$event，使用e.target和e.currentTarget有什么区别**

```
e.currentTarget：指向事件所绑定的元素，所以一直不变。
e.target：始终指向事件发生时的元素，会变。

一般情况下，他们是相同的，但是当存在父子关系时。在父级绑定事件。
1.当我们点击 父级时，e.currentTarget === e.target === 父级
2.当我们点击 子元素时，e.currentTarget ===  父级，e.target === 所点击的元素
```

**11.vue怎么实现强制刷新组件**

```
1.如果要在组件内部中进行强制刷新
调用this.$forceUpdate()强制重新渲染组件
2.如果是刷新某个子组件
利用v-if指令的特性
3.当组件的key 值变更时，会自动的重新渲染
```

**12.你理解keep-alive吗**

```
抽象组件 它们不向DOM呈现任何内容。他们只是添加额外的行为。
Props：
include - 字符串或正则表达式。只有名称匹配的组件名字（name属性）会被缓存。
exclude - 字符串或正则表达式。任何名称匹配的组件名字（name属性）组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例。

<keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

另外多了两个生命周期钩子 activated，退出时触发deactivated。

当我们使用抽象组件keep-alive的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
```

**13.v-model原理**

```

```

**14.计算属性，函数名和data数据源中的数据可以同名吗**

```
可以同名，但data会覆盖methods。并且本就不该同名，同名说明你命名不规范。
然后解释为什么会覆盖，因为Props、methods、data、computed、watch都是在initState函数中被初始化的。初始化顺序就是我上面给出的顺序，本质上这些都是要挂载到this上面的，你如果重名的话，后面出现的属性自然而然会覆盖之前挂载的属性了。如果你的eslint配置比较严格的话，同名是编译不通过的。
```

**15.怎么给vue定义全局的方法**

```
1、通过prototype，这个非常方便。Vue.prototype[method]=method;
2、通过插件Vue.use(plugin)；
3、通过mixin，Vue.mixin(mixins);
```

**16.vue的:class和:style有几种表示方式**

```
:class 绑定变量 绑定对象 绑定一个数组 绑定三元表达式
:style 绑定变量 绑定对象 绑定函数返回值 绑定三元表达式

以class举例
绑定变量 <div :class="{classA:a , classB: b,...}"/></div>
绑定对象 <div :class="test"></div>
绑定一个数组 <div :class="[test1,test2]"></div>
绑定三元表达式 <div :class="true?'signSpanChange':'signSpan'" ></div>
new Vue({
    el:'#app',
    data:{
        a:true,//根据true/false判断是否执行class
        b:true,
        test:{
                color:red;
                background:yellow;
        },
        test1Class:test1,
        test2Class:test2,
        

    }
})
```

**17.组件中写name选项有什么作用**

```
项目使用keep-alive时，可搭配组件name进行缓存过滤
DOM做递归组件时需要调用自身name
vue-devtools调试工具里显示的组见名称是由vue中组件name决定的
```

**18.对动态组件&&异步组件的理解**

```js
让多个组件使用同一个挂载点，并动态切换，这就是动态组件。

https://cn.vuejs.org/v2/guide/components-dynamic-async.html
https://segmentfault.com/a/1190000012138052
异步组件的功能就是，当我们的项目很大的时候，加载特别慢，可以考虑使用异步组件「不是特别重要的组件可以使用这种方式」来加载（需要的时候才去加载）。
可以减少内存开销，加快渲染速度。

使用
来自vue官网
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

**19.prop验证的type类型有哪几种**

```
title:String,
likes: Number,
isPublished: Boolean,
commentIds: Array,
author: Object,
callback: Function,
contactsPromise: Promise

校验
type,require,default,validater

// 自定义验证函数
propF: {
  type: String,
  validator: function (t) {
    // 这个值必须匹配下列字符串中的一个
    return t === 'fade' || t === 'slide'
  },
  default:'slide'
}
```

**21.说说你对vue组件的设计原则的理解**

```
第一: 命名要通俗易懂, 代码即注释。
第二: 缺省值(默认值)要有, 一般把应用较多的设为缺省值。
第三:容错处理, 这个要做好, 极端场景要考虑到, 不能我传错了一个参数你就原地爆炸。
第四: 场景化, 如一个dialog弹出, 还需要根据不同的状态封装成success, waring, 等。
第五: 一切皆可配置。
第六: 可拓展性。
第七: 颗粒化, 把组件拆分出来。 
第八: 规范化,我这个input组件。
第九: 分阶段: 不是什么都要一期开发完成看具体业务, 如果一个select, 我只是个简单的select功能,什么multi老子这个版本压根不需要, 别TM瞎折腾! 给自己加戏
第十: 有详细的文档/注释和变更历史, 能查到来龙去脉, 新版本加了什么功能是因为什么。
```

**22.diff算法的理解**

```

```

**23.vue如何优化首页的加载速度**

```

```

**24.vue能监听到数组变化的方法有哪些？为什么这些方法能监听到呢？**

```
7个方法（ 'push','pop','shift','unshift','splice','reverse','sort'）进行重新包装，
但是由于javascript底层的原因，vue无法检测到数组的变化
为什么不直接对Array.prototype的原型方法进行重新包装?
因为不应该过多地去影响全局
```

**25.表单修饰符和事件修饰符以及用途**

```
事件修饰符.stop .prevent .capture .self .once .passive
表单修饰符.number .lazy .trim
```

**26.用vue怎么实现一个换肤的功能**

```
方法一。
1.通过用户选择相应的颜色，
2.将颜色加进去到最外层的样式（style）里面，使用 !important。将后面用到的选择器都加上。

大概如下。
 style.innerHTML = ` .top-bar-container, .top-bar-container .byui-main, .side-bar-container, .logo-container-vertical, .logo-container-horizontal, .el-menu, .el-menu-item, .el-submenu.is-active.is-opened, .el-submenu__title, .el-menu-item.is-active, .el-menu-item .is-active { background-color:${menuBackground}!important; } body .el-menu--horizontal .top-bar-item-container  .el-menu-item:hover, body .el-menu--horizontal .top-bar-item-container .el-menu-item.is-active, body .app-wrapper .side-bar-container .el-submenu .el-menu-item.is-active, body .app-wrapper .side-bar-container  .el-menu-item:hover,body .side-bar-container .el-menu .el-menu-item.is-active{ background-color:${menuBackgroundActive}!important; } .tags-view-item.router-link-exact-active.router-link-active.active{ background-color: ${tagViewsBackgroundActive}!important; border: 1px solid ${tagViewsBackgroundActive}!important; } .el-button.el-button--primary{background-color: ${buttonBackground}!important;border-color: ${buttonBackground}!important;} .el-pagination.is-background .el-pager li:not(.disabled).active{background-color: ${paginationBackgroundActive}!important;border-color: ${paginationBackgroundActive}!important;}body .app-wrapper .side-bar-container .nest-menu .el-menu-item {background-color: ${menuChildrenBackground} !important;}`;

方法二。
预先配置好主题，通过切换主题即可。也可以模仿上面的操作，也可以使用 gulp-css-wrap
```

**28.vue性能优化**

```
https://juejin.im/post/6844903913410314247
```

**29.vue编程规范**

```
https://juejin.im/post/6844903652096770055
```

