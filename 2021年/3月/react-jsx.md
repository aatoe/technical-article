## react 之 jsx

> jsx 是react 出的一种语法，基本兼容所有js 代码，下面罗列一些注意事项。
>
> 1. 定义虚拟dom时，不要写引号。
>
> 2. 标签中混入js表达式要用{}。
>
> 3. 样式的类名指定不要用class，要用className。
>
> 4. 内联样式，要用style={{key:value}}。
>
> 5. 只有一个根标签。
>
> 6. 标签必须闭合。
>
> 7. 标签首字母
>
>    - 若小写字母开头，则将该标签转为html中同名元素，若html中没有对应标签的同名元素，则报错。
>    - 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
>
> 8. js语句（代码）与js表达式区别。
>
>    js语句不能写在jsx里面。
>
>    - 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
>    - 语句：if for switch 。

#### 原理

```html
1.基于babel-preset-react-app这个语法解析包，把jsx语法转换成一个名为 React.createElement() 的方法调用
<div>
    <h1 style='color: red' className='title'>todo with react</h1>
    <ul>
      <li>a</li>
      <li>b</li>
    </ul>    
</div>

转换后
React.createElement("div", null, 
    React.createElement(
　　　　"h1", 
　　　　{
        style: "color: red",
        className: "title"
    　　}, 
　　　　"todo with react"
　　 ), 
    React.createElement("ul", null, 
        React.createElement("li", null, "a"), 
　　　　 React.createElement("li", null, "b")
    )
);

2.基于createElement把传递的参数处理为jsx对象
createElement():React在渲染解析的时候，会把所有的html标签都转换为(返回一个对象):
返回对象的格式：
{
　　type: 'div' 　　---存储的是标签名或者组件名
　　props: {　　　　---props: 属性对象（给当前元素设置的属性都在这里）(如果有子元素，会多一个children属性，依次把子元素传递进来，没有就没有children属性)
　　　　style: '',
　　　　className: '',
　　　　children: [] 可能有可能没有，有的话：可能是一个数组，也可能是一个字符串或者是一个对象。
　　},
　　key: null,
　　ref: null
}
例如下面的jsx语法会返回：
jsx：
	const element = (
	  <h1 className="greeting">
	    Hello, world!
	  </h1>
	);

const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};

3.基于render把jsx对象按照动态创建dom元素的方式插入到指定的容器中即可。

 关于render函数
render(jsx,container,callback)

render(<h1>标题</h1>, document.getElementById('root'));

主要接受三个参数:
- jsx:javascript xml(html) react独有的语法；虚拟DOM（virtual dom）
- container:虚拟DOM最后渲染到的容器，不建议是body
- callback:把虚拟DOM插入到页面中，触发的回调函数（已经成为真实的DOM）
```

#### 源码分析

```js
// type： tagName， config：attribute ，children：children
export function createElement(type, config, children) {
  let propName;
  const props = {};
  
  let key = null;
  let ref = null;
  let self = null;
  let source = null;
   
   // ref和key和其他props不同, 进行单独处理
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
 
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    //将属性名挂载到props上
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }
  //第三个及以上的参数都被看作是子节点
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    //当数组长度不确定时,这种方式比push要节省内存  
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray; 
  // merge defaultProps
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

```

