
import axios from "axios";
// import { Toast } from "vant";
// import store from "../store";

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  baseURL:'http://localhost:8080',
  timeout: 20000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers["wxuser-token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    console.log(config,"config");
    
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    const res = response.data;
    if (res.errcode !== 200) {
      // 401:oken 过期了，或非法;
      if (res.errcode === 403) {
        // Toast.fail({
        //   message:,
        //   duration: 3000
        // });
        console.log( "登陆超时，请重新登录");
        
        // store.dispatch("user/FedLogOut").then(() => {
        //   location.reload(); // 为了重新实例化vue-router对象 避免bug
        // });
      } else {
        console.log( "其他错误");
        // Toast.fail({
        //   message: res.errmsg,
        //   duration: 3000
        // });
        return Promise.reject("error");
      }
    } else {
      return response.data.data;
    }
  },
  error => {
    console.log("err " + error); // error包含了几个对象:message, config, code, request, response,可以拿来请求超时等问题
    console.log("config ", error.config); // for debug
    console.log("code ", error.code); // for debug
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
      }
    }
    //  1.判断请求超时
    // if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !error.config._retry) {
    //   error.config._retry = true;
    //   return service.request(error.config);  //超时重复请求一次
    // }
    // Toast.fail({
    //   message: error.message,
    //   duration: 3 * 1000
    // });
    console.log(error.message);
    
    return Promise.reject(error);
  }
);

export default service;
