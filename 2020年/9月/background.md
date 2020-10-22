## background

> **`background`** 是一种css 简写属性，用于一次性集中定义各种背景属性，包括 color,  origin 与 size, repeat, position,clip,attachment, image方式。

合并写法

```css
 background: skyblue[颜色] url(./WechatIMG1581.jpeg)[图片] 10% 10%[position] /90% 90%[size] no-repeat
有时候为了清晰分开也挺好的
```



约定基本css，background没有内容或者没有设置宽度高度无效

```css
width:200px;
height:200px;
border:1px solid #000;
```

#### color

```css
background-color: 指定背景颜色，支持英文颜色单词(red)，16进制(#ff0000) rgba(255,0,0,.1)
```

#### image

```css
background-image：url("xx")指定要使用的一个或多个背景图像

多张图片的话 url("xx"),url("yyy")，注意这两张图片大小要不一样和不能设置background-size
```

#### position

```css
background-position：x y 指定背景图像的位置, 默认值是0% 0%，在右上角。

取值 
百分比：10%
px单位：10px
方位单词：x：left，center，right；y：top，center，bottom
```

#### size

```css
background-size：w h 指定背景图片的大小，一般会使用100% 100%

取值 
百分比：10%
px单位：10px 
cover：保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。图片不变形，但是有些看不见，并且占满内容区域
contain：保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。图片不变形，全部看得见，但是出现空白的区域
```

#### repeat

```css
background-repeat ：指定如何重复背景图片

取值 repeat	默认。背景图像将在垂直方向和水平方向重复。
repeat-x	背景图像将在水平方向重复。
repeat-y	背景图像将在垂直方向重复。
no-repeat  背景图像将仅显示一次。
```

#### origin

```css
background-origin: 指定背景图像的定位区域 默认值为padding-box

取值 
content-box ：盒子模型上面的内容为起点有背景（小盒子）
padding-box：盒子模型上面的内边距为起点有背景（中盒子）
border-box：盒子模型上面的border为起点有背景（中盒子）

实例发现 padding-box 和 border-box 基本一致
```

#### clip（和origin有些类似）

```css
background-clip：指定背景图像的绘画区域 默认值为border-box

取值
content-box：盒子模型上面的内容剪裁有背景（小盒子）
padding-box：盒子模型上面的内边距剪裁有背景（中盒子）
border-box：盒子模型上面的border剪裁有背景（中盒子）

实例发现 padding-box 和 border-box 基本一致
```

#### attachment

```css
background-attachment：设置背景图批昂是否固定或者随着页面的其余部分滚动  scroll为默认值

取值：
scroll:背景图相对于元素固定，背景随页面滚动而移动，内容滚动背景固定。配合 overflow: scroll;使用
local：背景图相对于元素内容固定，内容会按照比例对应那部分背景，所以可能出现拉伸，配合 overflow: scroll;使用
fixed：背景图相对于视口固定，所以随页面滚动背景不动，相当于背景被设置在了body上。
```

