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
// 哎，太简单了，不想说。
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
 // 忘了一个问题，return可以缩写，哈哈
  // let a = arr._filter(e => e >= 2) 
  let a = arr._filter(e => {
      return e >= 2
  })
 console.log(a);
```

