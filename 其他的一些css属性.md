css是一门学问,这篇文章我打算一直的commit,直至世界的尽头,只剩我和css.

### 1.display(显示)

**display:none** : 这个display的功能还是挺多的. 当设置为 `display:none;就是元素消失,但是还是存在dom中的,小程序的wx:show vue中的v-show的原理都是display:none;`

display的其他属性还可以作为模式转换, 

主要用的得是 display : inline | block | inline-block;



### 2.visibility(可见)

​	**visibility**,可以设置元素的可见性,

​	属性值: 

​		`visible`:默认值,元素是可见的

​		`hidden`:元素是不可见的,当设置该属性之后,当前位置还是占据的,只是用户看不见.

### 3.overflow(溢出)	

​	属性值:

​		`overflow`,可以控制元素的内容溢出时怎么处理.	

​		`overflow: visible;`  当内容溢出了,可见.

​		`overflow:scroll;`一定会在盒子的右边底部各生成一条滚动条;

​		`overflow:auto;`比较智能一些.自适应,当超出滚动盒子就会生成滚动条,不超出不处理.

​		`overflow:hidden`;这个主要的功能是超出隐藏. 还有副业,清除浮动,解决包含塌陷.

### 4.outline(轮廓线)

```
outline : outline-color ||outline-style || outline-width ,但是写这些太麻烦了,通常直接写下面这一些.

 outline: 0;   或者  outline: none;
```

#### 5.防止拖拽文本域拖拽resize

		<textarea  style="resize: none;"></textarea>

#### 6.鼠标样式cursor

#### 设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状。

| 属性值          | 描述       |
| --------------- | ---------- |
| **default**     | 小白  默认 |
| **pointer**     | 小手       |
| **move**        | 移动       |
| **text**        | 文本       |
| **not-allowed** | 禁止       |

 鼠标放我身上查看效果哦：

```html
<ul>
  <li style="cursor:default">我是小白</li>
  <li style="cursor:pointer">我是小手</li>
  <li style="cursor:move">我是移动</li>
  <li style="cursor:text">我是文本</li>
  <li style="cursor:not-allowed">我是文本</li>
</ul>
```

#### 7.vertical-align 垂直对齐(作用与行内块元素)

- 有宽度的块级元素居中对齐，是margin: 0 auto;

- 让文字居中对齐，是 text-align: center;

- vertical-align 垂直对齐，它只针对**行内块元素**，

  <img src="image/xian.jpg" />

```
vertical-align : baseline |top |middle |bottom 
```

vertical-align 不影响块级元素中的内容对齐，它只针对于**行内块元素**，

特别是行内块元素， **通常用来控制图片/表单与文字的对齐**。

#### 使用:

​	图片、表单和文字对齐 : 我们可以通过vertical-align 控制图片和文字的垂直关系了。 默认的图片会和文字基线对齐。

解决办法: vertical-align :middle;就可以了

#### 8.去除图片底侧空白缝隙

- 原因：

  图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐。

  就是图片底侧会有一个空白缝隙。

- 解决的方法就是：  

  - 给img vertical-align:middle | top| bottom等等。  让图片不要和基线对齐。
  - 给img 添加 display：block; 转换为块级元素就不会存在问题了。

#### 9.溢出的文字省略号显示

​	white-space 设置或检索对象内文本显示方式。通常我们使用于强制一行显示内容

```css
white-space:normal ；默认处理方式,就是超出换行

white-space:nowrap ；　强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。

一行显示
/*1. 先强制一行内显示文本*/
   white-space: nowrap;
/*2. 超出的部分隐藏*/
   overflow: hidden;
/*3. 文字用省略号替代超出的部分*/
   text-overflow: ellipsis;
```

####  10.三角形

```
 div {
 	width: 0; 
    height: 0;
    line-height:0；
    font-size: 0;
	border-top: 10px solid red;
	border-right: 10px solid green;
	border-bottom: 10px solid blue;
	border-left: 10px solid #000; 
 }
1. 我们用css 边框可以模拟三角效果
2. 宽度高度为0
3. 我们4个边框都要写， 只保留需要的边框颜色，其余的不能省略，都改为 transparent 透明就好了
4. 为了照顾兼容性 低版本的浏览器，加上 font-size: 0;  line-height: 0;
```

#### 11.字体图标

http://www.iconfont.cn/

​	这个是阿里妈妈M2UX的一个icon font字体图标字库，包含了淘宝图标库和阿里妈妈图标库。可以使用AI制作图标上传生成。免费，免费！！

##### 下载兼容字体包

刚才上传完毕， 网站会给我们把UI做的svg图片转换为我们的字体格式， 然后下载下来就好了

当然，我们不需要自己专门的图标，是想网上找几个图标使用，以上2步可以直接省略了， 直接到刚才的网站上找喜欢的下载使用吧。

##### 使用: 

解压下载下来的文件,然后里面有教.推荐第一种方法，即fontclass方法，这是在三种里面相对较为简单的一种方法

#### 12.盒模型设置

```
之前学习盒子模型的时候，盒子真实宽高计算方式如下：
真实宽高 = 设置宽高 + border + padding；
这种方式，我们成为外扩模型。
受一个属性控制：box-sizing；
```

##### 12.1box-sizing：content-box;（外扩模型）

```css
div {
    box-sizing: content-box;
	width: 200px;
	height: 200px;
	border: 50px solid red;
}
```

该模型为默认值，盒子的真实宽高 = 设置的宽高 + border + padding。

##### 12.2box-sizing：border-box;（内减模型）

```css
div {
    box-sizing: border-box;
	width: 200px;
	height: 200px;
	border: 50px solid red;
}
```

该模型下，border与padding会首先去压缩内容区的空间，宽高为设置宽高。

若内容区空间已经被压缩完毕，才会向外扩张。

