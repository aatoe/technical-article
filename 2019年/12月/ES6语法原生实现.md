# 利用原生实现ES6

#### 1.forEach

```js
// 在数组原型上面添加一个_forEach 的方法， 那么想象一下 arr._forEach(()=>{}),这种格式的，那么传进去的arr，就是this
// 在里面用for循环，然后通过callback传递参数，那么就是可以简单理解为 forEach就是for循环的一层壳
  Array.prototype._forEach = function(callback) {
      for (let i = 0; i < this.length; i++) {                
          let it = this[i]
          callback(it, i, this)
      }
  }

 console.log(Array.prototype._forEach); // 打印出来是上面的代码
  let arr = [1,2,3]
  arr._forEach((e, i, arr) => {
      console.log(e, i, arr);
  })
那么这段代码也是和forEach一样的，没有返回值，也不能中断循环
```

### 2.map

#### **map翻译过来就是映射的意思，加强版的forEach，forEach能用就是用forEach，因为map无论空间还是时间肯定要差一些。强在哪里呢可以返回值，灵活**

```js
let arr = [1,2,3]
Array.prototype._map = function(callback){
  // 声明一个数组，为了后面存放返回值
    let arr = [];
  // 遍历当前数组
    for(let i = 0;i<this.length;i++){
  //  将_map调用者写的callback的返回值拿到，并存放到数组中。
       let res = callback(this[i],i,this)
       arr.push(res)
    }
  // 返回出去
    return arr
}
// a 拿到返回结果
let a = arr._map((e,i,arr)=>{
    let test = e + i
    // 将结果返回给函数内部的res
    return test
})
console.log(a);
```

### 3.some 

#### 只要存在一个符合条件的就返回true，全部不符合返回false

```js
Array.prototype._some = function(callback){
  // 记录回调函数返回来的值
    let res
    for(let i = 0;i<this.length;i++){
  // 接收回调函数传回来的true和false
        res = callback(this[i],i,this)
 	// 如果res返回true 跳出本次循环，接着去外面return，如果全部都没有返回来，则返回false
        if(res)  break    
    }
    return res
}
let arr = [1,2,3]
let a = arr._some((e,i)=>{
    return e%2===0
})
```

### 4 every

#### **全部满足条件才返回true，一个不满足返回false**

```js
// 一摸一样的，哈哈。
Array.prototype._every = function(callback){
     let res
     for(let i = 0;i<this.length;i++){
         debugger
         res = callback(this[i],i,this)
         if(!res)  break    
     }
     return res
 }
 let arr = [0,2,4]
 let a = arr._every((e,i)=>{
     return e%2===0
 })
 console.log(a);
```

### 5 filter

#### 符合条件则添加到数组返回，如果都没有则返回[]

```js
Array.prototype._filter = function(callback){
      let arr = []
      for(let i = 0;i<this.length;i++){
          let res = callback(this[i],i,this)
          if(res){
              arr.push(this[i])
          }
      } 
      return arr
  }
  let arr = [0, 2, 4]
 // 忘了一个问题，return可以缩写
  // let a = arr._filter(e => e >= 2) 
  let a = arr._filter(e => {
      return e >= 2
  })
 console.log(a);
```

<u>分界线，下面只说如果用，不在把自己当作是babel，方法太强大，可能无法覆盖到他的强大</u>

### 6.Array.from() 

###  将伪数组对象或可遍历对象转换为真数组

```js
Array.from(arrayLike[, mapFn[, thisArg]])
```

arrayLike：必传参数，累似数组的东西，也可以其他东西，很灵活。

mapFn：选填参数，回调函数，每一项都会经过回调函数的处理在返回出去，如果没有，那就没有。

thisArg：选填，他其实意义不太大，就是this。 arrayLike 

```js
// 引自 大佬刘小夕
https://segmentfault.com/a/1190000020221170
// 引自MDN
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from

例子1 
let a = Array.from("atoe", x => {
   return x.toUpperCase()
})
console.log(a); // ["A", "T", "O", "E"]
例子2 
let a = Array.from("atoe")
console.log(a); //  ["a", "t", "o", "e"]


原生实现
 Array._from = function (params, callback) {
   // slice返回数组，这里用call的原因是因为params不是一个数组，无法调用这个方法的，那么通过this改变指向
     let arr = Array.prototype.slice.call(params);
     if (callback) {
         for (let i = 0; i < arr.length; i++) {
             let res = callback(arr[i])
             arr.splice(i, 1, res);
         }
     }
     return arr
 }
 let a = Array._from("atoe", (x) => {
     return x.toUpperCase()
 })
```

### 7.Array.of(v1, v2, v3) 

#### Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

// 太简单了，不想实现。
```

### 8.find() 和 findIndex()

#### find()：方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

#### findIndex()：它返回数组中找到的元素的索引，而不是其值。

```js
// find
 Array.prototype._find = function(callback){
   for (let i = 0; i < this.length; i++) {
       let res = callback(this[i],this)
       if(res){
           return this[i]
       }
   }
     return  
 }

 let arr = [1,2,3];
 let a = arr._find((x)=>{
     return  x > 0
 })
 console.log(a); // 1

// findIndex() 其实他返回的是索引，return i 不就可以了吗？ 是的。不写了
```

### 9.includes()

#### includes()：用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

```js
// arr.includes(valueToFind[, fromIndex])
//valueToFind：必填参数
// fromIndex：选填参数
Array.prototype._includes = function (params, index) {
     let i = index || 0
     for (i; i < this.length; i++) {
         if (params === this[i]) {
             return true
         }
     }
     return false
 		}

 let arr = [0, 1, 2, 3, 4];
 let a = arr._includes(1,1)
 console.log(a);
// true
```

### 10.reduce()

### 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

```js
let arr = [1, 2, 3, 4, 5];
// reduce--->有两个参数，callback，和 初始值
// callback--->有四个参数 累加器 当前值 当前索引值，当前数组（没啥用的）
// 注意点：就是当我们的初始值没有传的时候，累加器的第一项是数组的第一项。另外一种情况就是初始值传了，累加器第一项就是我们的初始值。
let sum = arr.reduce((accumulator, currentValue, i,arr) => {
    console.log(accumulator, currentValue, i,arr);
    return accumulator + currentValue
}, 0)
// 因为这个方法存在一些不确定性，一半配合map便利一层在传过来
```



### 11. entries()，keys() 和 values()

#### 数组实例