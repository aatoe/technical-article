### react 之 ReactDOM.render

> **ReactDOM.render(element, container[, callback])**
>
> ReactDOM.render(<App />, document.getElementById('root'));
>
> callback 基本不用的。

**函数式组件**

> //1.创建函数式组件
>
> ​    function MyComponent(){
>
> ​      return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
>
> ​    } 
>
> 执行了 ReactDOM.render(<MyComponent/>,document.getElementById('root'))，发生了什么？
>
> 1. React解析组件标签，找到了MyComponent组件。
> 2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。



**类式组件**

> 创建类式组件
>
> ​    class MyComponent extends React.Component {
>
> ​      render(){
>
> ​        return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
>
> ​      }
>
> ​    }
>
> 渲染组件到页面
>
> ​    ReactDOM.render(<MyComponent/>,document.getElementById('root'))，发生了什么？
>
> ​          1.React解析组件标签，找到了MyComponent组件。
>
> ​          2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
>
> ​          3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
>
> 

