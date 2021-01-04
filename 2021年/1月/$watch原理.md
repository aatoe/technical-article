# watch原理

> watch在工作中用的还是挺多的，但是原理还是不怎么清楚，现在就来好好理解一下吧！
>
> 用法
>
> ```jsx
> 
> watch: {
>   // 第一种方式
>     watchProps(newVal, oldVal) {
>       this.xx = "111";
>       // dosomething
>     },
>   // 第二种方式，可以兼容 'watchProps.xx.yy' 以前不懂的时候一直通过 computer 把属性返回出来 
>   // 看了同事代码才幡然醒悟。😭😭
>     'watchProps':{
>       handler(newVal, oldVal) {
>           this.xx = "111";
>       		// dosomething
>       },
>        immediate: true, // 立即监听
>        	deep:true // 深度监听
>     }
>   } 
> ```

##### 顺便区分一下watch 和 computer的用法以及场景

computer 计算属性 当属性的依赖有发生变化就会触发，

场景：1.购物车计算的总金额 多个状态影响一个计算属性（多对一）。

​			2.模版渲染的状态需要比较复杂的计算。

watch 监听器，它就是监听一个状态的变化，只要变化就会触发。

场景：1.贷款月供 ，当选择还款年限，计算其他的数值并赋值（当状态变化，触发其他数值的变化，一对多）。

​			2.当组件传值，监听状态做一些相应的操作。



## 原理



## computer原理

