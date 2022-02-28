// import tool from 'web-tool-library';
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 项目入口文件

// 0.0 引入自定义工具组件库 ----------------------------------------------------------------
// Vue.use(tool);

// 1.0> JS原型方法
import prototypeTool from "./service/PrototypeTool.js"
prototypeTool();

// 2.0> Vue全局过滤器
import tool from "./service/Tool.js"
tool(Vue);

// 3.0> 微信授权相关
import WeChat from "./service/WeChat.js"
WeChat();

// 4.0> 全局表单验证指令
import VueFormValidation from "./service/VueFormValidation.js"
VueFormValidation();



Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
