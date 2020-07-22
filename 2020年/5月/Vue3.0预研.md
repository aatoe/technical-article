# Vue3.0预研



> 五一啦！祝大家五一劳动节快乐！！
>
> 我趁着这个假期去通过各种途径了解一些关于vue3.0的东西，以下是我的一些笔记。



### 总结放在前面 

- 本文对应有一个代码demo，所有代码已项目为准， 位于同级目录。

- Vue3.0什么时候可以用？

  - 现在2020年5月份，vue3.0目前的beta版，还在测试阶段，通过RFC（Request For Comments）的模式去完善vue3.0。尤大也说，能用，但是不太建议现有大项目改用vue3，除非迫切需要新功能。不过新项目和小项目用还是ok的。

- vue3.0 相比于vue2.0 有什么区别？

  - 性能方面肯定大大提升，哪方面都是。

    编译更加严格了。

  Vue3.0用的是ts写的，尤大也说，推荐使用ts

- 可能需要一些兼容问题

  - 如果语法可能不支持的话他会报警告。

- 新增Composition API

  - 这个api好像和react hook差不多？

- 输入到编辑器的Tree-shaking（剪枝）

  - 以前我们在打包的时候使用webpack有听过Tree-shaking，现在vue已经细化到vue本身，具体是按需导入的意思。

- Custom Renderer API

  - 自定义一些库，可能会用到这个，对开发逻辑库提供支持。

##### 相关的体验

​	模版的变化 Vue3.0的模板变化在此连接可以详细体验 https://vue-next-template-explorer.netlify.app/ 

​	脚手架使用vue-cli-plugin-vue-next  https://github.com/vuejs/vue-cli-plugin-vue-next

​		 具体步骤：vue create "项目名称"  vue add vue-next 更新配置vue3.0beta版。



### 1.Composition API

英文摘自 https://composition-api.vuejs.org/#summary

Introducing the **Composition API**: a set of additive, function-based APIs that allow flexible composition of component logic. 意思就是代码能够复用，和code 重新组合在一起

##### 下面先介绍一下具体的用法

```js
setup 函数
setup() 函数是 vue3 中，专门为组件提供的新属性。它为我们使用 vue3 的 Composition API 新特性提供了统一的入口。
The setup function is a new component option. It serves as the entry point for using the Composition API inside components.
Invocation Timing（调用时间）
setup is called right after the initial props resolution when a component instance is created. Lifecycle-wise, it is called before the beforeCreate hook. 

beforeCreate -> use setup()
created -> use setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured  意思就是说setup随便用，下面介绍一下这个api的约定

1.1 Reactivity APIs
	1.1.1 reactive 
	const obj = reactive({ count: 0 }) 官网的意思是不推荐用
  
	1.1.2 ref 推荐使用
	Takes an inner value and returns a reactive and mutable ref object. The ref object has a single 			property .value that points to the inner value. 
  const count = ref(0)
	console.log(count.value) // 0 
	//有一个问题是在js是需要 property.value 取值。 template语法直接用count就可以了，还有一个点就是一定要在setup中 return 出去。
	<template>
  <div>{{ count }}</div> 
	</template>
	二者混合一起使用的注意点
  When a ref is accessed or mutated as a property of a reactive object, it automatically unwraps to 	the inner value so it behaves like a normal property:
	Note that if a new ref is assigned to a property linked to an existing ref, it will replace the old 	ref:
	const count = ref(0)
	const state = reactive({
	  count //ref(0) 会将值自动展开 count.value:0
	})
	console.log(state.count) // 0
	state.count = 1 // 赋值，下面就会变成 1
	console.log(count.value) // 1

	state.count = ref(2)  // 如果一个新的ref对象，会出现替换问题。
	console.log(state.count) // 2 ---> otherCount.value
	console.log(count.value) // 1 之前的变化不变

	 // 定义方法 来确定响应式，记得需要返回出去
    const add = (()=>{
        count.value +=1 
    })
    
 1.2 computed
    Takes a getter function and returns an immutable reactive ref object for the returned value from the getter.
    默认调用 getter 函数
    const computedStr = ref("computedStr");
    const plusOne = computed(() => (computedStr.value += 1));
    console.log(plusOne.value); // computedStr1
    // plusOne.value = 1; // 这里是赋值不上，参考下面
    // 而且vue3还会报reactivity.esm-bundler.js?a1e9:708 Write operation failed: computed value is readonly

    // it can take an object with get and set functions to create a writable ref object.
    const computedGetSet = ref('computedGetSet');
    const plusTwo = computed({
      get: () => computedGetSet.value + 1,
      set: val => {
        computedGetSet.value = val - 1;
      }
    });
    plusTwo.value = 1;
    console.log(computedGetSet.value); // 0

	1.3 readonly
  只读
  Takes an object (reactive or plain) or a ref and returns a readonly proxy to the original. A readonly proxy is deep: any nested property accessed will be readonly as well.
    const original = reactive({ count: 99 });
    const copy = readonly(original);
    // mutating original will trigger watchers relying on the copy
    original.count++;
    console.log(original.count);
    // mutating the copy will fail and result in a warning
    copy.count++; // warning! reactivity.esm-bundler.js?a1e9:307 Set operation on key "count" failed: target is readonly. Proxy {count: 100, __v_reactive: Proxy, __v_readonly: Proxy}
    console.log(copy.count);

  1.4 watchEffect
    // Run a function immediately while reactively tracking its dependencies, and re-run it whenever the dependencies have changed.
    const watchEffectCount = ref(0);
    watchEffect(() =>
      console.log(watchEffectCount.value, "watchEffectCount.value")
    );
    // 这个stop看起来没有公害的，记得每次都加上就对了。
		// Stopping the Watcher
    stop(); // When watchEffect is called during a component's setup() function or lifecycle hooks, the watcher is linked to the component's lifecycle, and will be automatically stopped when the component is unmounted.
    //In other cases, it returns a stop handle which can be called to explicitly stop the watcher:
    setTimeout(() => {
      watchEffectCount.value++;
      // -> logs 1
    }, 100);
	。。。下面还有很多，没有那么多精力补充。
  Side Effect Invalidation（副作用的处理）
  Effect Flush Timing（缓存）
  
  1.5 watch 
  // watch
    // 看官网的意思是和vue2.0一样，不过写法有一些区别
    // 监听单一属性
    // watching a getter
    const getterState = reactive({ getterCount: 0 });
    watch(
      () => getterState.getterCount,
      (getterCount, prevCount) => {
        console.log(getterCount, prevCount, "getterCount,prevCount");
      }
    );
    // directly watching a ref
    const refCount = ref(0);
    watch(refCount, (refCount, prevCount) => {
      console.log(refCount, prevCount, "refCount, prevCount");
    });
    const refCountAdd = () => {
      refCount.value += 1;
    };

    // 监听多个属性 ，包装成数组
    const fooRef = ref(999);
    const barRef = ref(999);
    watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
      console.log([foo, bar], [prevFoo, prevBar],"[foo, bar], [prevFoo, prevBar]");
    });
    const fooRefBarRefAdd = ()=>{
        barRef.value += 1;
        fooRef.value += 1;
    }
  
	Composition API 用到在说吧，东西还是还有很多的，自己有兴趣去文档翻一下。
```

### 2.Fragment（动态节点）

### 3.Teleport（）

### 4.Suspense（）

- 可在嵌套层级中等待嵌套的异步依赖项
- 支持`async setup()`
- 支持异步组件

​	

