# 浅谈虚拟DOM（Virtual DOM ）

> 以vue为例子。
>
> 模版编译-->vnode类生成vdom-->通过渲染函数生成真实dom-->渲染到试图。
>
> 性能。
>
> 每次编译都会生成vdom，通过和旧的vdom做对比生成一个真实的dom。当我们利用js操作vdom要比js直接操作真实dom性能高，特别是在频繁重复渲染以及页面复杂的场景，可以起到一个缓冲作用（操作多次new vnode 和 oldvnode对比，最后生成一份真实的dom）。「操作dom有多昂贵，即使创建一个空的 div，原生 DOM 因为浏览器厂商需要实现众多的规范（各种 HTML5 属性、DOM事件）都要加上。导致性能低。 」
>
> 跨端。
>
> 现今无论是微信小程序、uniapp、taro、 app（React-Native 和 Weex） ，在基于虚拟dom，让我们可以使用vue/react 来进行开发，打包的时候自动通过weex/React-Native提供的api或者标签进行编译。

