# 原生实现显示绑定this

通用代码

```js
var foo = {
	value: 1
};
function bar(name, age) {
	 	console.log(this.value);
		console.log(name);
		console.log(age);
}
```



```js
 // 原生实现call
 Function.prototype.myCall = function (context) {
     let args = Array.prototype.slice.call(arguments, 1)
     context.fn = this // 在context添加一个方法
     // 方法一
     // let arr = [];
     // for (let i = 0; i < args.length; i++) {
     //     arr.push(`args[${i}]`)
     // }
     // MDN是不建议我们使用eval的，它使用与调用者相同的权限执行代码。
     // 这里利用了一个比较巧妙的地方就是['args[0]','args[1]'] ==> args[0],args[1]
     // eval(`context.fn(${arr})`)
     // 方法二
     context.fn(...args) // es6的方法页太好用了吧
     delete context.fn // 用完之后删除
}

		 bar.myCall(foo,"Atoe","23")

```

```js
// 原生实现apply
Function.prototype.myApply = function (context, ...arg) {
    // 这里的 ...arg是es6的语法。=== Array.prototype.slice.call(arguments,1)
    context.fn = this
    context.fn(...arg)
    delete context.fn
}
bar.myApply(foo, ["Atoe", "23"])
// bar中的name是undefined
```

​     

```js
// 原生实现bind 
Function.prototype.myBind = function (context) {
    let firstArgs = Array.prototype.slice.call(arguments, 1) // 返回传进来的参数，除了context
    let that = this // 谁调用的就是谁
 		return function () { // 返回一个函数出去
   		let secondArgs = Array.prototype.slice.call(arguments) // 拼接参数
   		that.apply(context, firstArgs.concat(secondArgs)) // 改变this的指向
   	}
 }
 // var bindFoo = bar.myBind(foo, 'Atoe');
 // bindFoo('23');
```

