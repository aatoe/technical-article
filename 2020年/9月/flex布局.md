# flex布局（弹性布局）

> 我看见阮一峰的flex布局的文章已经写的足够好了，[传送门](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

简单说一下属性吧

注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效,一般不要和定位混合一起用。

**容器属性**

```css
flex-direction: 设置主轴的方向 
取值
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。

flex-wrap：设置是否换行
取值
nowrap（默认）：不换行。
wrap：换行，第一行在上方。
wrap-reverse：换行，第一行在下方。

flex-flow:属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap,不建议使用

justify-content:属性定义了项目在主轴上的对齐方式。
取值
flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

align-items:属性定义项目在交叉轴上如何对齐。
取值
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。

align-content:属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。（多行内容的时候起作用）
取值 
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。
```

**子项目属性**

```css
order：属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。取值 整数

flex-grow:属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。取值 整数
如果flex-grow属性为1则占满剩余空间，多个则平分剩余空间

flex-shrink:属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

flex-basis :<length> | auto; /* default auto */
属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

flex:属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
一般我们会设置 flex:1,=== flex:1 1 auto;

align-self:属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```

