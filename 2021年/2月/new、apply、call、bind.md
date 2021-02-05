#  new、apply、call、bind 

##### new 原理介绍

new 关键词的主要作用就是执行一个构造函数、返回一个实例对象，在 new 的过程中，根据构造函数的情况，来确定是否可以接受参数的传递。下面我们通过一段代码来看一个简单的 new 的例子。

```js
创建一个新对象；
将构造函数的作用域赋给新对象（this 指向新对象）；
执行构造函数中的代码（为这个新对象添加属性）；
返回新对象。

function Person(){
   this.name = 'Jack'; 
   return {age: 18}
}
var p = new Person(); 
console.log(p)  // {age: 18}
console.log(p.name) // undefined
console.log(p.age) // 18


new 关键字执行之后总是会返回一个对象
要么是实力对象，要么是return语句指定的对象

原生实现
	让实例可以访问到私有属性；
	让实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性；
	构造函数返回的最后结果是引用数据类型。

function _new(ctor, ...args) {
    if(typeof ctor !== 'function') {
      throw 'ctor must be a function';
    }
    let obj = new Object();
    obj.__proto__ = Object.create(ctor.prototype);
    let res = ctor.apply(obj,  [...args]);

    let isObject = typeof res === 'object' && typeof res !== null;
    let isFunction = typeof res === 'function';
    return isObject || isFunction ? res : obj;
};
```

##### apply、call、bind 

由于 apply 和 call 基本原理是差不多的，只是参数存在区别，因此我们将这两个的实现方法放在一起讲。

```js
Function.prototype.call = function (context, ...args) {
  let context = context || window;
  context.fn = this;
  let result = context.fn(...args)
  delete context.fn
  return result;
}

Function.prototype.apply = function (context, args) {
  let context = context || window;
  context.fn = this;
  let result = context.fn(...args)
  delete context.fn
  return result;
}

// func.call(thisArg, param1, param2)
// 目的就是将 func 这个方法添加到 thisArg 下面，然后执行方法，接着删除这个属性，并把这个函数执行的结果返回出来，做到和普通函数一摸一样。


Function.prototype.bind = function (context, ...args) {
    var self = this;
    var fbound = function () {
      self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }
    if(this.prototype) {
      fbound.prototype = Object.create(this.prototype);
    }
    return fbound;
}

// 间接调用了apply，返回一个函数出来，还有注意细节，将原型也要改回去


用处
1.类型判断 Object.prototype.toString.call(1) [object,Number]
2.类数组借用方法 
var arrayLike = { 
  0: 'java',
  1: 'script',
  length: 2
} 
Array.prototype.push.call(arrayLike, 'jack', 'lily'); 

3.构造函数继承 前面继承有讲的。那么需要补充的是， Parent.call(this);  其实是执行Parent 然后将Parent的属性添加一份到当前的this上面「不包含prototype的方法和属性」。
```

