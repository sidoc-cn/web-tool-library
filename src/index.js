
// NPM组件库入口文件


// 1.0> 注册JS原型方法 ----------------------------------------------------------------
import prototypeTool from "./service/PrototypeTool.js"
prototypeTool();


// 2.0> 注册全局工具方法 ---------------------------------------------------------------
import tool from "./service/Tool.js"
tool();


// 3.0> 微信授权相关 ------------------------------------------------------------------
import WeChat from "./service/WeChat.js"
WeChat();


// 5.0> 全局表单验证指令
import VueFormValidation from "./service/VueFormValidation.js"
VueFormValidation();


// 6.0> Vue组件 ----------------------------------------------------------------------
import Test from './components/0-test/Test.vue'
const cusComponents = [
   Test,
];
// 3.1> 支持自动安装：注册Vue全局组件
const install = function(Vue, opts = {}) {
   if (install.installed) return
   cusComponents.map(component =>{
      Vue.component(component.name, component);
   });
}
// 3.2> 支持自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue) // 通过use方式全部引入
}


export default {
  install, // 用户安装组件库后，可调用use方法一次性自动引入所有所有组件

  Test     // 支持用户单独引入某些组件
}


