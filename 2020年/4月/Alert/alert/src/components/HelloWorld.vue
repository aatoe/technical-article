<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="globalComponent">atoe的全局弹框组件</button>
    <!-- <alert></alert> -->
  </div>
</template>

<script>
// import alert from "./alert/alert";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    // alert
  },
  methods: {
    globalComponent() {
      console.log("触发全局组件方法。");
      this.$Alert.info({
        content: "我是atoe的全局组件",
        duration: 3
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
