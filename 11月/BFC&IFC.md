# BFC（Block Formatting context）

引入W3C CSS2.1的概念

```
它是页面中的一块渲染区域，并且有一套渲染规则. 它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
```

 块级元素 的渲染显示规则。通俗一点讲，可以把 BFC 理解为一个封闭的大箱子，，容器里面的子元素不会影响到外面的元素，容器外面的元素不会影响到容器里面的元素。

能触发BFC规则的方式，满足下面任意一条即可触发BFC规则

> body 根元素；
> 浮动元素：float 不为none的属性值；
> 绝对定位元素：position (absolute、fixed)
> display为： inline-block、table-cells、flex
> overflow 除了visible以外的值 (hidden、auto、scroll)，常用

接下来慢慢解释一下BFC的规则

 **1. 内部的盒子会在垂直方向，一个个地放置**

```
这一点理解挺容易的，块级元素默认就是占据一行的，就是不触发BFC规则也是占据一行。
```

 **2 BFC是页面上的一个隔离的独立容器**

```
当触发了BFC规则的适合，这个盒子将不会受外面影响，就是盒子外面继承属性，将不会影响到当前容器，这个感觉用的时候也没有多需要注意的问题。
```

 **3 属于同一个BFC的 两个相邻Box的 上下margin会发生重叠 **

<img src="/Users/atoe/Desktop/blog/-/static/images/margin上下重叠.png" style="zoom:30%;text-align:left" />

<img src="/Users/atoe/Desktop/blog/-/static/images/解决margin上下重叠.png" alt="解决margin上下重叠" style="zoom:33%;" />

```html
出现问题，这里2个div都是用了 margin 20px； 但是呈现出来的效果只有20px；应该出现40px才是符合要求的
<div>
 <div style=" height: 100px; width: 400px; background-color: hotpink; margin:20px;"></div>
 <div style="height: 100px; width: 400px; background-color: skyblue; margin:20px;"></div>  
</div>
解决问题，使出现重叠的盒子不在同一个BFC的容器中，那么就是要触发BFC规则就ok。
<div>
 <div style=" height: 100px; width: 400px; background-color: hotpink; margin:20px;"></div>
   <div style="overflow: hidden;">
    <div style="height: 100px; width: 400px; background-color: skyblue; margin:20px;"></div>
   </div>    
</div>
评价，这种办法解决起来在实际开发不怎么用，我平时写的话，我通常margin-bottom：40px;啥事也没有，当然肯定存在其他地方用的到这个规则的，比如封装组件。
```

##### 4.属于同一个BFC的 两个父子Box margin会发生塌陷

<img src="/Users/atoe/Desktop/blog/-/static/images/margin塌陷.png" alt="margin塌陷" style="zoom:33%;" />

<img src="/Users/atoe/Desktop/blog/-/static/images/解决margin塌陷.png" style="zoom:33%;" />

```html
问题
<div style="margin-top: 20px; height: 200px; width:500px;background-color: hotpink">
   <div style="height: 100px; width: 400px; background-color: skyblue; margin:20px;"></div>
</div>

解决问题,通过给父盒子 overflow: hidden;触发BFC规则，就可以不受外面影响。
  <div style="overflow: hidden; margin-top: 20px; height: 200px; width:500px;background-color: hotpink">
    <div style="height: 100px; width: 400px; background-color: skyblue; margin:20px;"></div>
 </div>
```

####  5 计算BFC的高度时，浮动元素也参与计算 

<img src="/Users/atoe/Desktop/blog/-/static/images/浮动导致父盒子高度为0.png" style="zoom:33%;" /><img src="/Users/atoe/Desktop/blog/-/static/images/解决浮动父盒子高度为0.png" alt="解决浮动父盒子高度为0" style="zoom:33%;" />

```
那么当我们的盒子内容都是浮动的时候，然后父盒子没有设置高度，高度没有那就会影响整体的布局。当我们触发BFC规则的时候同样可以解决这样的问题。

问题
 <div style="margin-top: 20px;width:500px;background-color: hotpink">
    <div style="float: left; height: 100px; width: 400px; background-color: skyblue;"></div>
 </div>
 
 解决问题
 <div style="overflow: hidden; margin-top: 20px;width:500px;background-color: hotpink">
   <div style="float: left; height: 100px; width: 400px; background-color: skyblue;"></div>
 </div>
```

#### 6 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此

```
这个其实也和标准流差不多。一个独立的容器包裹着。怎么跑都跑不出我的手掌心
```

####  7 BFC的区域不会与float重叠

```
标准流也是这样的。
```





# IFC（Inline Formatting Context）

感觉行内确实功能太少了，多数情况下都是用来模式装换

1. 框会从包含块的顶部开始，一个接一个地水平摆放。

2. 摆放这些框时，它们在水平方向的 内外边距+边框 所占用的空间都会被考虑； 在垂直方向上，这些框可能会以不同形式来对齐： 水平的margin、padding、border有效，垂直无效。不能指定宽高;

3. 行框的宽度是 由包含块和存在的浮动来决定; 行框的高度 由行高来决定,但是这个高度也不少真正的高度。可以挤下来。

   #### 总结：因为行内元素在布局中确实使用的时候能到就能用，而不需要写太多的样式来修饰。总而言之，多写吧。