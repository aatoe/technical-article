



# 浮动

浮动为什么会和出现?

​	 为什么了解决文字环绕图片的问题. 提供一个例子 一个盒子包着n行文字里面有一张图片,这张图片给float:left|right都ok,那么就是文字环绕.

后来发现浮动不仅做适合文字环绕而且做布局也还ok.

那么现在就是主要想说,用浮动作为布局方式会带来什么样的影响.

### 浮动的原理?

怎么实现的我真不知道.我只知道用,了解他的作用.

### CSS float: left | right | none | inherit; 

具体怎么用的就不说.直接说他的作用.

接下来讨论的是 right 和left ,那么none(不浮动) inherit(继承),这些讲了没意思.自行理解

1. 当元素使用的浮动会进行模式转换.,不管是什么元素都转换为行内块.

2. 浮动元素脱离标准流,不占据标准流的位置

3. 父元素浮动会带跑子元素. 子元素浮动只能在父元素里面浮动.

4. 浮动的元素跟CSS的顺序无关,跟HTML代码有关.

5. 浮动元素不会浮到前面HTML标准流之上,只能在之后.然后后面HTML标准流可以占据浮动元素的位置,就是出现浮动元素在标准流之上,所以就是重叠了. 那么怎么----清除浮动.

   

### 清除浮动

当你使用了浮动的时候,一定要养成习惯就是清除浮动,少很多不必要的麻烦.

建议:只要一用了浮动,马上补上清除浮动的代码.

`那么为什么要清除浮动呢?`

举个例子

当父盒子(没有设置宽高,设置背景色)包着子盒子(设置宽高,设置背景色),子盒子浮动(脱离标准流).那么最后面看到的就是子盒子,然后父元素就是高度为0,原因是因为父盒子里面的子盒子脱标了,那就是他不是你的东西了.你没有东西,就是高度为0.怎么办-----清除浮动

解决办法

+ 高度法.给父元素设置高度,简单,也可以用,就是一些写死的东西,但是没意义.

+ 额外标签法: 在父元素中的追加一个元素.放在最后面  

  ```js
  <div style="clear:both"></div>
  官方推荐的方法,怎么说.挺low的,不推荐,比高度法还不好用.
  ```

+ overflow:hidden, 这个css属性也可以用.看起来也还行啊,实用性还行.也不推荐.

  ```
  overflow:这个东西他的本质工作是解决溢出的元素内容就行隐藏.
  然后再这里可以清除浮动,主要一个原因是因为触发了一个BFC(Block Formatting Context)机制.
  块级格式化上下文,当然也有IFC(Inline Formatting Context),内联格式化上下文.有空回来补上吧.
  ```

+ 双伪元素标签法

+ ```css
  .clearfix::before,
  .clearfix::after {
      content: "";
      display: block;
  }
  .clearfix::after {
      clear: both;
  }
  .clearfix {
      *zoom: 1;
  }
  双伪元素法也是一中解决办法.看起来我还是觉得下面的单伪元素标签法好用
  ```

+ 单伪元素标签法

  ```css
   /* 1.设置一个伪元素,在所有的子元素之后 */
   /* 2.设置clear:both属性 */
   .clearfix::after {
       content: ".";
       clear: both;
       display: block;
       height: 0;
       visibility: hidden;
       /* 元素是否可见 */
   }
   /* 兼容低版本浏览器 */
   .clearfix {
       *zoom: 1;
   }
  这是一套完美的解决方案,兼容各种浏览器.
  如果想什么都不兼容的,如下.
   .clearfix::after {
       content: "";
       clear: both;
       display: block;
   }
  
  ```

