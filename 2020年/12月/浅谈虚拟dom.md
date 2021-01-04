# 浅谈虚拟DOM（Virtual DOM ）

主流程：模版 -- 编译 -->  渲染函数 -- 执行 --> vnode -- patch --> 视图



> 以vue为例子。
>
> 模版编译-->vnode类生成vdom-->通过渲染函数生成真实dom-->渲染到试图。
>
> 性能。
>
> 每次编译都会生成vdom，通过和旧的vdom做对比生成一个真实的dom。当我们利用js操作vdom要比js直接操作真实dom性能高，特别是在频繁重复渲染以及页面复杂的场景，可以起到一个缓冲作用（操作多次new vnode 和 oldvnode对比，最后生成一份真实的dom）。「操作dom有多昂贵，即使创建一个空的 div，原生 DOM 因为浏览器厂商需要实现众多的规范（各种 HTML5 属性、DOM事件）都要加上。导致性能低。 」，真正的 DOM 元素非常庞大，这是因为标准就是这么设计的。而且操作它们的时候你要小心翼翼，轻微的触碰可能就会导致页面重排，这可是杀死性能的罪魁祸首。
>
> 跨端。
>
> 现今无论是微信小程序、uniapp、taro、 app（React-Native 和 Weex） ，在基于虚拟dom，让我们可以使用vue/react 来进行开发，打包的时候自动通过weex/React-Native提供的api或者标签进行编译就可以实现原声编译的目的。



**现今三大前端框检测架变化，react 采用虚拟DOM，vue 虚拟DOM，Angular使用脏检测的流程。**

### 虚拟DOM

```
虚拟dom通过VNode类生成，所以VNode也可以叫做虚拟dom，虚拟dom通过patch后就会一个一个节点插入到视图上。
由于虚拟dom是由javascript生成，可以将上一次渲染视图的虚拟dom缓存起来，用来为下一次为新旧虚拟dom进行patch做准备。
VNode的类型 
	注释节点
  	页面展示：<!-- 我是注释节点 --> 
		js：vnode 
			{
				text:"我是注释节点",
				isComment:true
			}
	元素节点 ：<div></div>
	js:{
		children:[对应又有vnode],
		context：{ 当前vue实例}，
		data：{attrs,class,style},
		tag:"div"
}
	文本节点
	克隆节点
	组件节点
	函数式组件
	以上这些都是可以通过VNode类实例化出来，构成一个虚拟dom树。
```

## patch算法

```
作用：将虚拟dom树渲染成真实的dom，此算法的作用是尽量减少dom的操作，改为在JavaScript中进行大量的算法操作，算出应该操作哪些真实dom节点，从而提升性能「前面提到过创建dom为什么耗性能」。

我们知道到如果没有patch算法里面的复杂流程，也可以通过递归每次采用newVnode来渲染成真实的dom，肯定可以完成需求。只不过里面的节点有很多是不需要修改的，每次都这么操作，确实不应该。所以patch算法就是可以解决这类多余的操作。那么他主要做的是 
		创建新增的节点（vue中 createElement，调用浏览器api document.createElement）
			场景1：当首次渲染时
			场景2: 当newVnode存在，oldVnode不存在时
			场景3: 当newVnode的节点和oldVnode完全不是一个节点时，需要新增，而且还需要删除。
		删除已经废弃的节点
			场景1: 当newVnode不存在，oldVnode存在时
			场景2: 当newVnode的节点和oldVnode完全不是一个节点时，需要新增，而且还需要删除（同上）。
		修改需要更新的节点
			场景1: 当newVnode 和 oldVnode 节点相同，没有子节点的时候，进行diff算法发现不同点进行状态更新。
			场景2: 当newVnode 和 oldVnode 节点相同，有子节点的时候，进行diff算法，递归遍历子节点，进行更新，当列表中存在key值时，可以快速建立所以关系定位节点，进行更新，以前vue中的key值是建议填，现在eslint不填会报错。

```

#### 更新子节点

```
当newVnode 和 oldVnode 都有子节点的时候。
需要遍历 newVnode 和 oldVnode的每一个节点做对比，判断是新增、更新、移动、删除节点
新增节点（同上）
	场景1:补充的是新增的位置是所有未处理的前面，如果后面一个节点也是新增也会放在上一个新增的后面位置
更新节点（如果位置不一样的时候还需要移动节点）
	场景1：有文本属性当文本节点发生改变，就修改文本节点。
	场景2: newVnode有children的情况
		      oldVnode有children，那么还会继续走更新下一个子节点操作
		      oldVnode没有children，那么oldVnode 是空标签或者文本节点，文本节点需要先清空变成空标签，然后将							newVnode插入到当前节点下面，渲染到视图
	场景3: newVnode没有children的情况
					那么newVnode可能是空标签或者文本节点。
					oldVnode有children，先删除子节点，变成空标签，最后看newVnode是空标签还是文本节点。
					oldVnode没有children，情况文本，变成空标签，最后看newVnode是空标签还是文本节点。
移动节点
	场景1:newVnode存在节点和oldVnode节点是同一个，位置不同需要移动节点，有时候还需要更新。
删除子节点（同上）
	场景1：需要补充当子节点循环完了，还有未处理的节点，哪里这时候就需要删除未处理的节点，因为循环完了就代表节点更新完毕了。
	
	优化策略：当上面这些遍历正常走完那其实是一种特别费劲的一个过程，因为真实的场景，也许改变的东西真的不多，有时候只是一个文本改变了，有时候，新增了一个节点，所以vue中的算法根据场景做了一些优化，减少遍历次数，提升性能。
	基本的快捷查找方案有4种
		newVnode中所有未处理的第一个节点「新前」和oldVnode中所有未处理的第一个节点「旧前」
		newVnode中所有未处理的最后一个节点「新后」和oldVnode中所有未处理的最后一个节点「旧后」
		新后和旧前
		新前和旧后
		
		由于最后两种办法都会涉及到后面的节点的更新，所以普通从左到右的循坏满足不了需求的，只能考虑使用两边同时循环，
		while( newStartIdx <= newEndIdx && oldStartIdx <= oldEndIx){
			newStartIdx++
			newEndIdx--
			oldStartIdx++
			oldEndIx--
		}
		当 newStartIdx > newEndIdx 时：
			证明newVnode 已经遍历完了，如果oldVnode没有遍历完，剩下的都是删除
		当 oldStartIdx > oldEndIx 时：
			证明oldVnode已经遍历完了，如果newVnode还有节点没有遍历，剩下的都是新增

```

