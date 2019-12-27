# arguments

arguments 是一个对应于传递给函数的参数的类数组对象。

形参： 函数定义的参数。

实参： 函数调用是实际传递的参数。

那么到我们的实参的参数多于形参接收，所以我们arguments就会接收（箭头函数除外）

```js
function add() {
    var sum =0,
        len = arguments.length;
    for(var i=0; i<len; i++){
        sum += arguments[i];
    }
    return sum;
}
add()                           // 0
add(1)                          // 1
add(1,2,3,4);                   // 10
```

他没有数据上面的方法，但是可以做一些处理可以让它又数据的方法。

```js
1. var args = Array.from(arguments); // 转化为真实的数组\
2. var args = Array.prototype.slice.call(arguments);
```

随着时代的发展，arguments 被es6  rest给取代了。

```js
function add(...rest) {
    var sum =0,
        len = rest.length;
    for(var i=0; i<len; i++){
        sum += rest[i];
    }
    return sum;
}
add()                           // 0
add(1)                          // 1
add(1,2,3,4);                   // 10
// 缺点就是 ...rest一定要放在所有的参数后面
```



# 函数式编程