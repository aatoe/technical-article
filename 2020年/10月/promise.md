# Promise

> Promise 非常好，请使用。它们解决了我们因只用回调的代码而备受困扰的控制反转问题。
>
> 它们并没有摈弃回调，只是把回调的安排转交给了一个位于我们和其他工具之间的可信任 的中介机制。
>
> Promise 链也开始提供(尽管并不完美)以顺序的方式表达异步流的一个更好的方法，这 有助于我们的大脑更
>
> 好地计划和维护异步 JavaScript 代码。
>
> 总儿言之：promise帮我们解决使用复杂回调函数的方案，并且可以信任结果的。

#### 状态

```
一个 Promise有以下几种状态:
(1) pending: 意味着操作正在进行。「处于等待」
(2) fulfilled: 意味着操作成功。「可以执行then中的第一个回调函数」
(3) rejected: 意味着操作失败。「可以执行then中的第二个回调函数或者catch」
状态不可逆转。
```

## then(..) 和 catch(..)

```js
then(..) 和 catch(..) 也会创建并返回一个新的 promise，这个 promise 可以用于实现 Promise 链式流程控制。如果完成或拒绝回调中抛出异常，返回的 promise 是被拒绝的。如 果任意一个回调返回非 Promise、非 thenable 的立即值，这个值会被用作返回 promise 的完 成值。如果完成处理函数返回一个 promise 或 thenable，那么这个值会被展开，并作为返回 promise 的决议值。

then(..) 接受一个或两个参数:第一个用于完成回调，第二个用于拒绝回调。如果两者中的任何一个被省略或者作为非函数值传入的话，就会替换为相应的默认回调。默认完成回调只是把消息传递下去，而默认拒绝回调则只是重新抛出(传播)其接收到的出错原因。
catch(..) 只接受一个拒绝回调作为参数，并自动替换默认完成 回调。换句话说，它等价于 then(null,..)

p.then( fulfilled );
p.then( fulfilled, rejected );
p.catch( rejected ); // 或者p.then( null, rejected )
```



## 使用

```js
const p = new Promise( function(resolve,reject){ 
  resolve() // 用于决议/完成这个promise
  // 1.如果传给 resolve(..) 的是一个非 Promise、非 thenable(对象具有then方法) 的立即值，这 个 promise 就会用这个值完成。
  // 2.如果传给 resolve(..) 的是一个真正的 Promise 或 thenable 值，这个值就会被递归展 开，并且(要构造的)promise 将取用其最终决议值或状态。
  reject() //用于拒绝这个promise
} );


1.普通用法，resolve 返回普通数值
const p = new Promise(function (resolve, reject) {
      console.log("同步代码1");
      resolve(1);
      console.log("同步代码2");
    });
p.then((value) => { // 这里的代码是异步的
  console.log(value);
});

// 同步代码1
// 同步代码2
// 1


const p = new Promise(function (resolve, reject) {
      console.log("同步代码1");
      reject(new Error("这是一个错误"));
      console.log("同步代码2");
    });

p.catch((err) => {
  console.log(err);
});

// 同步代码1
// 同步代码2
// Error: 这是一个错误

有一种快捷的写法 
const p1 = Promise.resolve(1);
const p2 = Promise.reject("这是一个错误");

p1.then((value) => {
  console.log(value); // 1
}, null);

// catch的写法
p2.then(null, (value) => {
  console.log(value); // 这是一个错误
});
p2.catch((err) => {
  console.log(err); // 这是一个错误
});


// 2.resolve 返回 promise
const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("这是一个错误"));
          // resolve(1);
        }, 1000);
      });

const p2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(p1), 1000);
      });

      p2.then(
        (result) => console.log(result),
        (error) => console.log(error) 
        // 如果写了里面这个捕获错误的，外面的catch就不会捕获到了。所以一般then 有多层的是很好，或者习惯，都是在外层使用catch捕获错误。
      ) // 1
        .catch((error) => console.log(error)); // 这是一个错误

这种代码尽量少写，存在风险，p2可能很慢，p1报错了，浏览器由报错，然后变成捕获错误，
说到底还是捕获错误是一门技术活。

p2中的resolve返回出去的是 p1 ，然后 p1的状态决定p2的状态。 p2.then获取状态。


p2的resolve方法将p1作为参数，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
注意：resolve函数传递不同参数生成Promise对象的不同情况可以参考Promise.resolve的用法。reject函数传递不同参数生成Promise对象的不同情况可以参考Promise.reject的用法。

```



#### Promise.all([ .. ]) 和 Promise.race([ .. ])

```js
都会创建一个 Promise 作为它的返回值。这个 promise 的决议完全由传入的 promise 数组控制。

只有传入的所有promise都完成，返回promise才能完成。
1.如果有任何 promise 被拒绝，返回的主 promise 就立即会被拒绝(抛弃任何其他 promise的结果)，对于拒绝的情况，你只会得到第一个拒绝 promise 的拒绝理由值。
2.如果完成的话，你会得到一个数组，其中包含传入的所有 promise 的完成值。

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(p1);
const p3 = Promise.resolve("Hello World");
const p4 = Promise.reject("Oops");
Promise.race([p1, p2, p3, p4]).then(function (msg) {
  console.log(msg);
});
Promise.all([p1, p2, p3, p4]).catch(function (err) {
  console.error(err);
});
Promise.all([p1, p2, p3]).then(function (msgs) {
  console.log(msgs);
});
 Promise.all([]).then(function (msgs) {
  console.log(msgs); // [] 传入空数组，它会立即完成
});
 Promise.race([]).then(function (msg) {
  console.log(msg); // 会挂住，且永远不会决议。
 });
// [] 
// 1
// "Oops"	
// [1,1,"Hello World"]
```

#### Promise.allSettled([ .. ]) 

Promise.allSettled 的语法及参数跟 Promise.all 类似，其参数接受一个 Promise 的数组，返回一个新的 Promise。唯一的不同在于，执行完之后不会失败，也就是说当 Promise.allSettled 全部处理完成后，我们可以拿到每个 Promise 的状态，而不管其是否处理成功。

```js
const resolved = Promise.resolve(2);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(function (results) {
  console.log(results);
});
// 返回结果：
// [
//    { status: 'fulfilled', value: 2 },
//    { status: 'rejected', reason: -1 }
// ]
```

从上面代码中可以看到，Promise.allSettled 最后返回的是一个数组，记录传进来的参数中每个 Promise 的返回值，这就是和 all 方法不太一样的地方。你也可以根据 all 方法提供的业务场景的代码进行改造，其实也能知道多个请求发出去之后，Promise 最后返回的是每个参数的最终状态。

#### Promise.any([ .. ]) 

any 方法返回一个 Promise，只要参数 Promise 实例有一个变成 fulfilled 状态，最后 any 返回的实例就会变成 fulfilled 状态；如果所有参数 Promise 实例都变成 rejected 状态，包装实例就会变成 rejected 状态。

```js
const resolved = Promise.resolve(2);
const resolved3 = Promise.resolve(3);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.any([resolved，resolved3，rejected]);
allSettledPromise
  .then(function (results) {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });
// 返回结果：
// 2
```

从改造后的代码中可以看出，只要其中一个 Promise 变成 fulfilled 状态，那么 any 最后就返回这个 Promise。由于上面 resolved 这个 Promise 已经是 resolve 的了，后面resolved3，rejected都不会继续执行，故最后返回结果为 2。

#### Promise 的性能

```
promise 与传统回调比较的话，确实浪费一些时间，因为promise里面做了很多动作，所以性能稍微低一点的，但是带来的是编程效率的提高。显然promise是值得推荐的。
```

