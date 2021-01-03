##  Object.defineProperty()

```js
html
 <input type="text" id="userName" />
 <span id="uName">暂时没有数据</span>
 get：<span id="getName">点击触发get 方法</span>

js:
let obj = {
      userName: "",
};
Object.defineProperty(obj, "userName", {
      // 注意 数据描述符	configurable	enumerable	value	writable
      // 存取描述符  	configurable	enumerable	get	set
      configurable: true, //能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
      enumerable: true, //对象属性是否可通过for-in循环，false为不可循环，默认值为true
      // writable: true, //对象属性是否可修改,flase为不可修改，默认值为true
      // value: "Atoe", //对象属性的默认值，默认值为undefined
      get: function () {
        console.log("get init");
        return "固定值";
      },
      set: function (val) {
        console.log("set init", val);
        document.getElementById("uName").innerText = val;
        document.getElementById("userName").value = val;
      },
    });
    document
      .getElementById("userName")
      .addEventListener("keyup", function (event) {
        obj.userName = event.target.value;
      });
    document
      .getElementById("getName")
      .addEventListener("click", function (event) {
        console.log(obj);
        document.getElementById("uName").innerText = obj.userName;
      });
```

