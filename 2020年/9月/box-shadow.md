#### **阴影**（box-shadow）

> #### 你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色。



```
 https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow 在上面可以手动调样式看效果
 投影方式(选填 唯一取值inset) X轴偏移量 Y轴偏移量 阴影模糊半径(选填) 阴影扩展半径(选填) 阴影颜色; 
 X-offset:阴影水平偏移量，其值可以是正负值。如果值为正值，则阴影在对象的右边，其值为负值时，阴影在对象的左边；
 Y-offset:阴影垂直偏移量，其值也可以是正负值。如果为正值，阴影在对象的底部，其值为负值时，阴影在对象的顶部；
阴影模糊半径：此参数可选，，但其值只能是为正值，如果其值为0时，表示阴影不具有模糊效果，其值越大阴影的边缘就越模糊；
阴影扩展半径：此参数可选，其值可以是正负值，如果值为正，则整个阴影都延展扩大，反之值为负值时，则缩小；
阴影颜色：此参数可选。如不设定颜色，浏览器会取默认色，但各浏览器默认取色不一致,建议必填。
```



```
把以下复制到 https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow 观看效果更佳。
box-shadow: 0 0 5px 5px red; x y轴都不偏移 阴影模糊半径5px 阴影扩展半径5px，所以看见了10px的阴影。
box-shadow:inset 0 0 5px 5px red; 阴影会在里面
box-shadow: -10px 0 10px red, /*左边阴影*/ 10px 0 10px yellow,/*右边阴影*/ 0 -10px 10px blue, /*顶部阴影*/ 0 10px 10px green; /*底边阴影*/ 

大概就是这些操作，比较简单。
```

