# 浏览器端eventEmitter 

> vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的。
>
> vue eventBus采用的是 发布者-订阅者模式的方式来实现的。
>
> eventEmitter 采用的是 发布者-订阅者模式的方式来实现的。
>
> 原生dom事件触发使用的是 观察者模式。
>
> 发布者-订阅模式 和观察区的区别是什么？
>
> 发布者-订阅模式，有一个发布者（on），调度者（调度对象），订阅者（emit）。
>
> 通过 调度者将两者联系起来。
>
> 观察者模式，以原生事件触发为例子 js就是观察者， dom对象就是被观察者，当dom对象发生改变，触发js。
>
> 区别：调度者。观察者模式 1 对 1 ， 发布者-订阅者模式 多对多。
>
>  **其实发布-订阅模式其实是观察者模式的一种变形**



```js
function EventEmitter() {
    this.__events = {}
}

on 方法的核心思路就是，当调用订阅一个自定义事件的时候，只要该事件通过校验合法之后，就把该自定义事件 push 到 this.__events 这个对象中存储，等需要出发的时候，则直接从通过获取 __events 中对应事件的 listener 回调函数，而后直接执行该回调方法就能实现想要的效果。
EventEmitter.prototype.on = function(eventName, listener){
	  if (!eventName || !listener) return;
      // 判断回调的 listener 是否为函数
	  if (!isValidListener(listener)) {
	       throw new TypeError('listener must be a function');
	  }
	   var events = this.__events;
	   var listeners = events[eventName] = events[eventName] || [];
	   var listenerIsWrapped = typeof listener === 'object';
       // 不重复添加事件，判断是否有一样的
       if (indexOf(listeners, listener) === -1) {
           listeners.push(listenerIsWrapped ? listener : {
               listener: listener,
               once: false
           });
       }
	   return this;
};
// 判断是否是合法的 listener
 function isValidListener(listener) {
     if (typeof listener === 'function') {
         return true;
     } else if (listener && typeof listener === 'object') {
         return isValidListener(listener.listener);
     } else {
         return false;
     }
}
// 顾名思义，判断新增自定义事件是否存在
function indexOf(array, item) {
     var result = -1
     item = typeof item === 'object' ? item.listener : item;
     for (var i = 0, len = array.length; i < len; i++) {
         if (array[i].listener === item) {
             result = i;
             break;
         }
     }
     return result;
}


其实就是拿到对应自定义事件进行 apply 执行，在执行过程中对于一开始 once 方法绑定的自定义事件进行特殊的处理，当once 为 true的时候，再触发 off 方法对该自定义事件进行解绑，从而实现自定义事件一次执行的效果。
EventEmitter.prototype.emit = function(eventName, args) {
     // 直接通过内部对象获取对应自定义事件的回调函数
     var listeners = this.__events[eventName];
     if (!listeners) return;
     // 需要考虑多个 listener 的情况
     for (var i = 0; i < listeners.length; i++) {
         var listener = listeners[i];
         if (listener) {
             listener.listener.apply(this, args || []);
             // 给 listener 中 once 为 true 的进行特殊处理
             if (listener.once) {
                 this.off(eventName, listener.listener)
             }
         }
     }
     return this;
};

EventEmitter.prototype.off = function(eventName, listener) {
     var listeners = this.__events[eventName];
     if (!listeners) return;
     var index;
     for (var i = 0, len = listeners.length; i < len; i++) {
	    if (listeners[i] && listeners[i].listener === listener) {
           index = i;
           break;
        }
    }
    // off 的关键
    if (typeof index !== 'undefined') {
         listeners.splice(index, 1, null)
    }
    return this;
};


once 方法的本质还是调用 on 方法，只不过传入的参数区分和非一次执行的情况。当再次触发 emit 方法的时候，once 绑定的执行一次之后再进行解绑。
EventEmitter.prototype.once = function(eventName, listener）{
    // 直接调用 on 方法，once 参数传入 true，待执行之后进行 once 处理
     return this.on(eventName, {
         listener: listener,
         once: true
     })
 };
EventEmitter.prototype.allOff = function(eventName) {
     // 如果该 eventName 存在，则将其对应的 listeners 的数组直接清空
     if (eventName && this.__events[eventName]) {
         this.__events[eventName] = []
     } else {
         this.__events = {}
     }
};


```

