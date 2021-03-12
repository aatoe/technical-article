### react 之 生命周期

##### react 16.8.4

![16.8.4生命周期](/Users/atoe/Desktop/blog/technical-article/static/images/react生命周期(旧).png)



> 1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
>    1. constructor()
>    2. componentWillMount()
>    3. render()
>    4. componentDidMount() =====> 常用
>
> ​                          一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
>
> 2. 更新阶段: 由组件内部this.setSate()或父组件render触发或forceUpdate
>    1. shouldComponentUpdate()
>    2. componentWillUpdate()
>    3. render() =====> 必须使用的一个
>    4. componentDidUpdate()
>
> 3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
>    1. componentWillUnmount()  =====> 常用
>
> ​                          一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
>
> 



##### react 17.0.1

![3_react生命周期(新)](/Users/atoe/Desktop/blog/technical-article/static/images/react生命周期(新).png)



> 1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
>    1. constructor()
>    2. getDerivedStateFromProps  // 获取派生的Props 用处不太大。
>    3. render()
>    4. componentDidMount() =====> 常用
>
> ​                      一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
>
> 2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
>    1. getDerivedStateFromProps
>    2. shouldComponentUpdate()
>    3. render()
>    4. getSnapshotBeforeUpdate // 获取快照，更新前的状态，用处计算下一次。
>    5. componentDidUpdate()
>
> 3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
>    1. componentWillUnmount()  =====> 常用
>
>    ​                   一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息



总之：17.0.1 新增了2个生命周期，getDerivedStateFromProps  、getSnapshotBeforeUpdate 。

在这个版本下面使用 过时的这三个api会用报警告。componentWillMount、componentWillUpdate、componentWillReceiveProps，需要加上unsafe。

