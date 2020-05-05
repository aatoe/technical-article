<template>
  <!-- <my-fragment /> -->
  <div>
    <h1>compositionAPI</h1>
    <div>
      <h3>reactive</h3>
      <div>state.count赋值常量{{count}}---state.count赋值ref对象{{state.count}}</div>
      <br />
      <button @click="count+=1"> count+1</button> &nbsp;&nbsp;&nbsp;
      <button @click="add"> count+1 写在js方法</button>
    </div>
    <div>
      <h3>computed</h3>
      <div>默认computed用法 {{plusOne}}</div>
      <div>对象set get computed用法 {{plusTwo}}</div>
      <br />
    </div>
    <div>
      <h3>watch</h3>
      <div>reactive {{getterState.getterCount}}</div>
      <div>ref {{refCount}}</div>
      <div>监听多个属性 {{fooRef}}----{{barRef}}</div>
      <br />
      <button @click="getterState.getterCount+=1"> getterState+1</button> &nbsp;&nbsp;&nbsp;
      <button @click="refCountAdd"> refCount+1</button>&nbsp;&nbsp;&nbsp;
      <button @click="fooRefBarRefAdd"> fooRefBarRefAdd+1</button>
      <br />
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onUpdated,
  onUnmounted,
  computed,
  readonly,
  watchEffect,
  watch
} from "vue";

export default {
  setup() {
    // 生命周期
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("mounted!");
    });
    onUpdated(() => {
      console.log("updated!");
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });

    // 响应式
    // 1.1.1 reactive
    // const obj = reactive({ count: 0 }) 官网的意思是不推荐用
    // 1.1.2 ref 推荐使用
    // Takes an inner value and returns a reactive and mutable ref object. The ref object has a single 			property .value that points to the inner value.
    // const count = ref(0);
    // console.log(count.value); // 0
    // 有一个问题是在js是需要 property.value 取值。 template语法直接用count就可以了，还有一个点就是一定要在setup中 return 出去。
    // 二者混合一起使用的注意点
    // When a ref is accessed or mutated as a property of a reactive object, it automatically unwraps to 	the inner value so it behaves like a normal property:
    // Note that if a new ref is assigned to a property linked to an existing ref, it will replace the old 	ref:
    const count = ref(0);
    const state = reactive({
      count //ref(0) 会将值自动展开 count.value:0
    });
    console.log(state.count); // 0
    state.count = 1; // 赋值，下面就会变成 1
    console.log(count.value); // 1

    state.count = ref(2); // 如果一个新的ref对象，会出现替换问题。
    console.log(state.count); // 2 ---> ref(2).value
    console.log(count.value); // 1 之前的变化不变
    // 定义方法 来确定响应式
    const add = () => {
      count.value += 1;
    };

    // 计算属性
    // computed
    // Takes a getter function and returns an immutable reactive ref object for the returned value from the getter.
    // 默认调用 getter 函数
    const computedStr = ref("computedStr");
    const plusOne = computed(() => (computedStr.value += 1));
    console.log(plusOne.value); // computedStr1
    // plusOne.value = 1; // 这里是赋值不上，参考下面
    // 而且vue3还会报reactivity.esm-bundler.js?a1e9:708 Write operation failed: computed value is readonly

    // it can take an object with get and set functions to create a writable ref object.
    const computedGetSet = ref("computedGetSet");
    const plusTwo = computed({
      get: () => computedGetSet.value + 1,
      set: val => {
        computedGetSet.value = val - 1;
      }
    });
    plusTwo.value = 1;
    console.log(computedGetSet.value); // 0

    // 只读
    // readonly
    // Takes an object (reactive or plain) or a ref and returns a readonly proxy to the original. A readonly proxy is deep: any nested property accessed will be readonly as well.
    const original = reactive({ count: 99 });
    const copy = readonly(original);
    // mutating original will trigger watchers relying on the copy
    original.count++;
    console.log(original.count);
    // mutating the copy will fail and result in a warning
    copy.count++; // warning! reactivity.esm-bundler.js?a1e9:307 Set operation on key "count" failed: target is readonly. Proxy{count: 100, __v_reactive: Proxy, __v_readonly: Proxy}
    console.log(copy.count);

    // watchEffect
    // Run a function immediately while reactively tracking its dependencies, and re-run it whenever the dependencies have changed.
    const watchEffectCount = ref(0);
    watchEffect(() =>
      console.log(watchEffectCount.value, "watchEffectCount.value")
    );

    // Stopping the Watcher
    stop(); //When watchEffect is called during a component's setup() function or lifecycle hooks, the watcher is linked to the component's lifecycle, and will be automatically stopped when the component is unmounted.
    //In other cases, it returns a stop handle which can be called to explicitly stop the watcher:
    setTimeout(() => {
      watchEffectCount.value++;
      // -> logs 1
    }, 100);

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
      console.log(
        [foo, bar],
        [prevFoo, prevBar],
        "[foo, bar], [prevFoo, prevBar]"
      );
    });
    const fooRefBarRefAdd = () => {
      barRef.value += 1;
      fooRef.value += 1;
    };

    return {
      count,
      state,
      add,
      plusOne,
      plusTwo,
      getterState,
      refCount,
      refCountAdd,
      fooRefBarRefAdd,
      fooRef,
      barRef
    };
  }
};
</script>