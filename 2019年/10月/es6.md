# ES6

本文主要记录我平时很少用的,经常用的,基本记在脑子里,不想写

### 1.Map

`Map`是一组键值对的结构，具有极快的查找速度。

初始化`Map`需要一个二维数组，或者直接初始化一个空`Map`

```js
let m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined

也可以直接存入一个二维数组
let m2 = new Map([['name','Atoe'],['age',22]])
console.log(m.get('name')); //Atoe

m.keys() :获取key值
m.values() :获取value值

entries() 方法返回一个新的包含 [key, value] 对的 Iterator 对象，返回的迭代器的迭代顺序与 Map 对象的插入顺序相同。
例子:
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.entries();
//那么通过next()就可以拿到迭代器里面的东西
console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```

### 2.Set

一组key的集合，但不存储value。由于key不能重复，所以，在`Set`中，没有重复的key。

要创建一个`Set`，需要提供一个`Array`作为输入，或者直接创建一个空`Set`

```
var s = new Set(); // 空Set
var s2 = new Set([1, 2, 3,3]); // 含1, 2, 3

s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}

s.values() :获取value值
m.keys() :获取key值
这里的keys和values是一样的
```

### 3.for of

##### 3.1. 遍历范围

for...of 循环可以使用的范围包括：
	1. 数组
	2. Set(重点)
	3. Map(重点)
	4. 类数组对象，如 arguments 对象、DOM NodeList 对象
	5. Generator 对象
	6. 字符串

```
// 遍历 map中的key 值
for (let key of map.keys()) {
  console.log(key);
}
// 遍历 map中的value 值
for (let value of map.values()) {
  console.log(value);
}
map.entries()
```

#### 4.双冒号运算符

现在有一个\*[提案](https://github.com/zenparsing/es-function-bind)\*，提出了“函数绑定”（function bind）运算符，用来取代`call` `apply` `bind`调用。

```js
1.函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

foo::bar;
// 等同于
bar.bind(foo);
 
foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);


2.如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo; ==> foo.apply(obj)
唯一的解释就是 本来的隐式绑定纤维现在的显式绑定
```

#### 5.数组拓展方法

keys

```js
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr); 
// 返回值: 一个表示给定对象的 所有可枚举属性的 字符串数组,中间有空的可以去掉
console.log(sparseKeys); // ['0', '2']

var denseKeys = [...arr.keys()];
console.log(denseKeys);  // [0, 1, 2] //[...arr]为['a',undefined,'c']
// 方法返回一个新的Array迭代器，它包含数组中每个索引的键。key迭代器不会忽略空洞
```

values

```js
let arr = ['w', 'y', 'k', 'o', 'p'];
   let eArr = arr.values(); // 返回一个可迭代的数组对象
       
   for (let letter of eArr) {
       console.log(letter); // 'w', 'y', 'k', 'o', 'p'
   }
```

