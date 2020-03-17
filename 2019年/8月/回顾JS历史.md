# 回顾 JS 历史	

背景:1995年 那个时候有一家科技公司叫网景公司(Netscape),  但是后来和微软竞争输了,被别人收购了 .  但是在1995年他们家的浏览器可是占有率第一的 . 那时候的浏览器只能浏览网页 , 一点交互都没有 , 而且网景公司的软件都是付费的 , 所以肯定要登录才能使用,当时是用户输入 , 然后发送到服务器判断 .  浏览器是不知道用户到底有没有输入 . 总之就是给服务器发送用户的账号信息.**网景公司急需一种网页脚本语言，使得浏览器可以与网页互动。**" 

## javascript的诞生

​	javascript这个名字的来源,当时的java被认为是未来的趋势,网景公司和sun公司是又合作,然后又想迅速推广这门新语言,想搭上java这个顺风车,并且当时**网景公司的整个管理层，都是Java语言的信徒** 然后就取名为 JavaScript.

1995年 网景公司招聘了 Brendan Eich 当时34岁,现在58岁

![image](https://github.com/aatoe/-/blob/master/8%E6%9C%88/images/Brendan%20Eich.jpeg)

这个人可是学富五车,精通各种语言. 当时网景公司要求**未来的网页脚本语言必须"看上去与Java足够相似"，但是比Java简单，使得非专业的网页作者也能很快上手,**但是，他对Java一点兴趣也没有。为了应付公司安排的任务，他只用10天时间就把Javascript设计出来了。 

由于设计时间太短，语言的一些细节考虑得不够严谨，导致后来很长一段时间，Javascript写出来的程序混乱不堪,  所以出现js的怪异行为.

总的来说，他的设计思路是这样的：

> 　　（1）借鉴C语言的基本语法；
>
> ​		如果你学过C,你会发现JS基础语法基本可以无缝对接,但是还是有些小区别.
>
> 　　（2）借鉴Java语言的数据类型和内存管理；
>
> 　　（3）借鉴Scheme语言，将函数提升到"第一等公民"（first class）的地位；
>
> ​		当js预解析的时候变量会提升,但是函数比一般的变量优先级要高
>
> 　　（4）借鉴[Self语言](http://en.wikipedia.org/wiki/Self_(programming_language))，使用基于原型（prototype）的继承机制。

###  ECMAScript 和 JavaScript 的关系 

​	1996 年 11 月，JavaScript 的创造者  网景(Netscape) 公司，决定将 JavaScript 提交给国际标准化组织 ECMA，希望这 种语言能够成为国际标准。

​	ECMA(European Computer Manufactures   Association)欧洲计算机制造商协会。 

​	因此,ECMAScript 和 JavaScript 的关系是，前者是后者的规范或者标准，后者是前者的一种实现 

###  ECMAScript 的历史 

​	ECMA规范最终由[TC39](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Ftc39)敲定。TC39由包括浏览器厂商在内的各方组成，他们开会推动JavaScript提案沿着一条严格的发展道路前进。 从提案到入选ECMA规范主要有以下几个阶段：

- Stage 0: strawman——最初想法的提交。

- Stage 1: proposal（提案）——由TC39至少一名成员倡导的正式提案文件，该文件包括API事例。

- Stage 2: draft（草案）——功能规范的初始版本，该版本包含功能规范的两个实验实现。

- Stage 3: candidate（候选）——提案规范通过审查并从厂商那里收集反馈

- Stage 4: finished（完成）——提案准备加入ECMAScript，但是到浏览器或者Nodejs中可能需要更长的时间。

   

   	1997年 ECMAScript1.0 发布.
      	1998年6月 ECMAScript2.0 发布.
      	
      	1999年12月 ECMAScript3.0 发布,3.0的语法是比较成功的,所以奠定了Js得基本语法.
      	
      	ECMAScript4.0 在2007年10月并没有通过审核,因为语法大部分太过于激进,只有小部分通过审核,							  					所以只发布了ECMASript3.1,不久后,就改名为ECMAScript5.0,  2009年12月ESMAScript5.0正式发布,需要补充的是ES5,ES6其实大部分是ES4太过于激进的语法放在后面推出.
      	
      	2011年6月 ECMAScript5.1,版本发布,并成为ISO国际标准
      	
      	2015年 6月 ECMAScript6正式发布, 也成为ISO国际标准,ES6是一个大版本,以后的每一个版本都不会出现这么多得新属性新方法,可以看出以后的JS正在往TypeScript方向发展.
      	
      	2016年3月  ECMAScript7正式发布
      	
      	2017年6月  ECMAScript8正式发布
      	
      	2018年6月  ECMAScript9正式发布
      	
      	2019年6月  ECMAScript10正式发布

### TypeScript

TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的**静态类型和基于类的面向对象编程**。[安德斯·海尔斯伯格, C#的首席架构师，已工作于TypeScript的开发。2012年十月份，微软发布了首个公开版本的TypeScript，2013年6月19日，在经历了一个预览版之后微软正式发布了正式版TypeScript 0.9，向未来的TypeScript 1.0版迈进了很大一步。来自百度百科.

其实我觉得算是一种有严格类型要求的javascript,它是可以编译成JS的即使在TS上面报错兼容任何浏览器,

### CoffeeScript

当时ECMAScript4.0的新语法太过于激进,没有通过TC39审核,但是这些过于激进的语法却在coffeeScript中得到的体现, 我们能够更加优美地编写JS代码.  何谓优美，我认为就是能够以最少代码量去实现传统JavaScript的操作并且是可使用又易懂的.CoffeeScript还增加了许多语法糖比如class，extends等等（当然在ES6也增加了，只是CoffeeScript是在ES6之前出现的),就是说它在侧面的影响着JS.  	

建议: 没有系统学习过 JavaScript没有必要学习它们( TypeScript Coffeescript).

**总之JavaScript TypeScript Coffeescript之间的关系是:JavaScript 主力,TypeScript以及Coffeescript是辅助.**

<https://www.cnblogs.com/ranzige/p/4128434.html>  

我觉得这篇文章写得挺好的.个人喜好吧.你想你的代码写起来严谨一下,那毫无疑问是TypeScript ,但是我比较喜欢自由一些,我写不出完全没有bug的代码,我觉得使用的TypeScript会使我像困住的小鸟一样.

(完)

欢迎关注我的微信公众号:**郭教练的Web世界**

