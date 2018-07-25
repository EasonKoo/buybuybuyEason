// 引入vue模块
import Vue from 'vue'
// 引入vue路由模块
import VueRouter from 'vue-router'
// 引入 app组件 根节点
import App from './App.vue'
//引入css这个模块
import'./assets/statics/site/css/style.css'

// 引入路由
import index from './components/index.vue';

// 路由中间件
Vue.use(VueRouter)

// 定义路由规则
const router = new VueRouter({
   routes :[
   { path: '/index', component: index }
  
  ]
})
Vue.config.productionTip = false

new Vue({
  el:"#app",
  router,
  render: h => h(App),
 
  // 挂载路由规则 传入这个对象
})
