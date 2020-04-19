import Vue from 'vue'
import App from './App.vue'

// 导入刚刚封装的组件
import  Alert from "./components/alert/alert.js"
Vue.prototype.$Alert = Alert

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
