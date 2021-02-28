# 生成器

##### 什么是thunk函数

> ```
> let isString = (obj) => {
>   return Object.prototype.toString.call(obj) === '[object String]';
> };
> let isFunction = (obj) => {
>   return Object.prototype.toString.call(obj) === '[object Function]';
> };
> let isArray = (obj) => {
>   return Object.prototype.toString.call(obj) === '[object Array]';
> };
> 
> 其中出现了非常多重复的数据类型判断逻辑，平常业务开发中类似的重复逻辑的场景也同样会有很多。我们将它们做一下封装，如下所示
> 
> let isType = (type) => {
>   return (obj) => {
>     return Object.prototype.toString.call(obj) === `[object ${type}]`;
>   }
> }
> 
> // 使用
> let isString = isType('String');
> let isArray = isType('Array');
> isString("123");    // true
> isArray([1,2,3]);   // true
> 
> 相应的 isString 和 isArray 是由 isType 方法生产出来的函数，通过上面的方式来改造代码，明显简洁了不少。像 isType 这样的函数我们称为 thunk 函数，它的基本思路都是接收一定的参数，会生产出定制化的函数，最后使用定制化的函数去完成想要实现的功能。
> 
> 这样的函数在 JS 的编程过程中会遇到很多，尤其是你在阅读一些开源项目时，抽象度比较高的 JS 代码往往都会采用这样的方式。
> ```
>
> 



## 为什么会有生成器

```
它能帮我们解决什么样的问题，可以解决异步代码耗时操作，然后处理完成再继续操作（暂停），不会影响主程序。
好好利用起来 Promise + Generator 才是最后面解决问题的核心。
```

### Generator(生成器)

> Generator函数和普通的函数区别有两个。
>
>  1：function和函数名**之间有一个\*号**
>
>  2：函数体内部使用了**yield表达式**

这个如果运行的话，会返回一个Iterator实例， 然后再执行Iterator实例的**next()**方法， 那么这个函数才开始真正运行， 并把yield后面的值**包装成固定对象并返回**，直到运行到函数结尾， 最后再返回**undefined**；  

Generator函数返回的Iterator运行的过程中，如果碰到了yield， 就会把yield后面的值返回， 此时函数相当于停止了， 下次再执行next()方法的时候， 函数又会从上次退出去的地方重新开始执行； 如果后面有return 返回值=yield+return中的返回值 后面的yield不会生效,不能在非Generator函数中使用yield 

```js
Generator函数返回的Iterator执行next()方法以后， 返回值的结构为 
{
    value : "value", //value为返回的值
    done : false //done的值为一个布尔值， 如果Interator未遍历完毕， 他会返回false， 否则返回true；
}

function *gen() {
  let x = 1;
  x++;
    yield "1";
    yield "2"
}
var it = gen(); // 生成一个迭代器（Iterator实例），此时没有启动。
console.log(it);  // "Generator {  }"
console.log(it.next().value);   // 启动迭代器 执行迭代器 执行let x = 1; x++ 将yield返回出来 1 ,运行到下一个yield暂停，it.next() 调用结束,此时 *gen() 仍在运行并且是活跃的，但处于暂停状态。
console.log(it.next().value);   // 调用从暂停处恢复了生成器 *gen() 的执行 执行迭代器 将yield返回出来 2 ，运行到下一个yield暂停，如果没有yield就迭代器运行结束。
console.log(it.next().value); // 当前已经没有yield了  undefined

生成器就是一类特殊的函数，可以一次或多次启动和停止，并不一定非得要完成。

传参数的生成器
function* gen(x) {
  x++;
  x = x * (yield "1");
  // x = x * (yield); // 将会返回undefined
  return x;
}
var it = gen(1); // 生成一个迭代器，此时没有启动，将 1 传进去。
console.log(it.next()); // 启动生成器 运行代码 x++，运行到yield 把 1，返回出去。
console.log(it.next(2)); // 4

// 1.可以看出来，x像普通函数传进去正常接收
// 2.当在迭代器中传值可以在yield中接收，然后恢复代码执行。
// 3.yield 返回值出来 
// 4.return 在最后一个yield后面返回值出来。

```

### 在看一些例子

```js
function* foo(x) {
	var y = 2 * (yield(x + 1)); 
	var z = yield(y / 3); 
	return (x + y + z); 
}

var a = foo(5);
console.log(a.next()) // x + 1 ===> 5+1 ===> 6
console.log(a.next()) // 没有参数传进去，yield接收到就是undefined y=  2 * undefined ===> NaN, NaN/3===>NaN。
console.log(a.next()) // 6 + NaN + undefined === NaN

var b = foo(5);
console.log(b.next()) // { value:6, done:false } 同上
console.log(b.next(12)) // { value:8, done:false } 当我们的next有参数就可以当做上一次yield的值,2*12/3=8
console.log(b.next(13)) // { value:42, done:true } 5+24+13 = 42
```

### 生成器委托

> yield*这种语句让我们可以在Generator函数里面再套一个Generator。
>
> 你要在一个Generator里面调用另外的Generator需要使用: **yield\* 函数()** 

```js
function* foo() {
   console.log("*foo() starting");
   yield 3;
   yield 4;
   console.log("*foo() finished");
 }
 function* bar() {
   yield 1;
   yield 2;
   yield* foo();
   yield 5;
 }
 var it = bar();
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);

// 1
// 2
// *foo() starting
// 3
// 4
// *foo() finished


// 调用foo()创建一个迭代器。然后yield *把迭代器
// 实例控制(当前 *bar() 生成器的)委托给 / 转移到了这另一个 *foo() 迭代器。
```

#### thunk函数+Generator

```js
const readFileThunk = (filename) => {
  return (callback) => {
    fs.readFile(filename, callback);
  }
}
const gen = function* () {
  const data1 = yield readFileThunk('1.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('2.txt')
  console.log(data2.toString)
}
let g = gen();
g.next().value((err, data1) => {
  g.next(data1).value((err, data2) => {
    g.next(data2);
  })
})

readFileThunk 就是一个 thunk 函数，上面的这种编程方式就让 Generator 和异步操作关联起来了。上面第三段代码执行起来嵌套的情况还算简单，如果任务多起来，就会产生很多层的嵌套，可读性不强，因此我们有必要把执行的代码封装优化一下，如下所示。

function run(gen){
  const next = (err, data) => {
    let res = gen.next(data);
    if(res.done) return;
    res.value(next);
  }
  next();
}
run(g);

改造完之后，我们可以看到 run 函数和上面的执行效果其实是一样的。代码虽然只有几行，但其包含了递归的过程，解决了多层嵌套的问题，并且完成了异步操作的一次性的执行效果。这就是通过 thunk 函数完成异步操作的情况，你可以好好体会一下。

以上介绍了 Generator 和 thunk 结合的情况，其实 Promise 也可以和 Generator 配合，以实现上面的效果，下面我们来看一下这种情况。
```



#### co 函数库

co 函数库是著名程序员 TJ 发布的一个小工具，用于处理 Generator 函数的自动执行。核心原理其实就是上面讲的通过和 thunk 函数以及 Promise 对象进行配合，包装成一个库。它使用起来非常简单，比如还是用上面那段代码，第三段代码就可以省略了，直接引用 co 函数，包装起来就可以使用了，代码如下。

```js
const co = require('co');
let g = gen();
co(g).then(res =>{
  console.log(res);
})
```

这段代码比较简单，几行就完成了之前写的递归的那些操作。那么为什么 co 函数库可以自动执行 Generator 函数，它的处理原理是什么呢？

因为 Generator 函数就是一个异步操作的容器，它需要一种自动执行机制，co 函数接受 Generator 函数作为参数，并最后返回一个 Promise 对象。

在返回的 Promise 对象里面，co 先检查参数 gen 是否为 Generator 函数。如果是，就执行该函数；如果不是就返回，并将 Promise 对象的状态改为 resolved。

co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulfilled 函数。这主要是为了能够捕捉抛出的错误。

关键的是 next 函数，它会反复调用自身。

关于 co 的内部原理，[你可以去co 的源码库学习](https://github.com/tj/co/blob/master/index.js) 。代码不是很多，也比较清晰，按照上面我所讲的思路，你可以试着去理解，这对于提升你的 JavaScript 编码能力是很有帮助的。

那么，说完了 co 函数库，我们最后就来探究异步编程的



#### 生成器 +Promise  

```js
function foo(x, y) {
  return new Promise((resolve, reject) => {
    resolve("成功了" + x + y);
  });
}
function* main() {
  try {
    var text = yield foo(11, 31);
    console.log(text);
  } catch (err) {
    console.error(err);
  }
}
let it = main();
let p = it.next().value; // 得到promise
p.then((res) => {
  console.log(res, "res");
});
```

#### 终极解决方案是async/await。

JS 的异步编程从最开始的回调函数的方式，演化到使用 Promise 对象，再到 Generator+co 函数的方式，每次都有一些改变，但又让人觉得不彻底，都需要理解底层运行机制。

而 async/await 被称为 JS 中异步终极解决方案，它既能够像 co+Generator 一样用同步的方式来书写异步代码，又得到底层的语法支持，无须借助任何第三方库。

接下来，我们就从原理的角度来看看 async/await 这个语法糖背后到底做了哪些优化和改进，使得我们用起来会更加方便。还是按照上面 Generator 和 Promise 结合的例子，使用 async/await 语法糖来进行改造，请看改造后的代码。

```js
// readFilePromise 依旧返回 Promise 对象
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  }).then(res => res);
}
// 这里把 Generator的 * 换成 async，把 yield 换成 await
const gen = async function() {
  const data1 = await readFilePromise('1.txt')
  console.log(data1.toString())
  const data2 = await readFilePromise('2.txt')
  console.log(data2.toString)
}
```

从上面的代码中可以看到，虽然我们简单地将 Generator 的 * 号换成了 async，把 yield 换成了 await，但其实 async 的内部做了不少工作。我们根据 async 的原理详细拆解一下，看看它到底做了哪些工作。

总结下来，async 函数对 Generator 函数的改进，主要体现在以下三点。

1. 内置执行器：Generator 函数的执行必须靠执行器，因为不能一次性执行完成，所以之后才有了开源的 co 函数库。但是，async 函数和正常的函数一样执行，也不用 co 函数库，也不用使用 next 方法，而 async 函数自带执行器，会自动执行。
2. 适用性更好：co 函数库有条件约束，yield 命令后面只能是 Thunk 函数或 Promise 对象，但是 async 函数的 await 关键词后面，可以不受约束。
3. 可读性更好：async 和 await，比起使用 * 号和 yield，语义更清晰明了。

说了这么多优点，我们还是通过一段简单的代码来看下 async 返回的结果，是不是使用起来更方便，请看下面的代码。

```js
async function func() {
  return 100;
}
console.log(func());
// Promise {<fulfilled>: 100}
```

从执行的结果可以看出，async 函数 func 最后返回的结果直接是 Promise 对象，比较方便让开发者继续往后处理。而之前 Generator 并不会自动执行，需要通过 next 方法控制，最后返回的也并不是 Promise 对象，而是需要通过 co 函数库来实现最后返回 Promise 对象。

这样看来，ES7 加入的 async/await 的确解决了之前的问题，使开发者在编程过程中更容易理解，语法更清晰，并且也不用再单独引用 co 函数库了。因此用 async/await 写出的代码也更加优雅，相比于之前的 Promise 和 co+Generator 的方式更容易理解，上手成本也更低，不愧是 JS 异步的终极解决方案。

