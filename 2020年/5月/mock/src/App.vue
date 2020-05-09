<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="testMock">testMock</button>
    <button @click="addComment">addComment</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {} from './api/api.js'
import axios from "axios"
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    async testMock(){
      axios.post(`api/project`, {})
        .then((res) => {
          console.log(res);
        })
    },
    async addComment(){
       axios.post(`api/push_comment`, {})
        .then((res) => {
          console.log(res);
          
        })
      // let res = await testMock("/sp/loan/addComment",{})
      // console.log(res,"res");
      
    }
  //   function getComments () {
  // axios.get('api/comment/get.action', {}).then((res) => {
  //   console.log(res.data)
  // })
// }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
