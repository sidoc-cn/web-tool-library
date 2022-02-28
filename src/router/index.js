import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
]


const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
   
   // 0.1> IOS设备上路由的URL不会被写入到微信内置浏览器中，此处获取微信内置浏览器的真实URL,用于签名IOS端微信JS-SDK
   localStorage.setItem('first_open_url',window.location.href);

   next();
});

export default router
