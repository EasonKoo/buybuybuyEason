// 引入vue模块
import Vue from 'vue'
// 引入vue路由模块
import VueRouter from 'vue-router'
// 引入 app组件 根节点
import App from './App.vue'
//引入css这个模块
import'./assets/statics/site/css/style.css'
//引入这个模块
import ElementUI from 'element-ui';
//引入这个css
import 'element-ui/lib/theme-chalk/index.css';
//引入懒加载这个模块
import VueLazyload from 'vue-lazyload'

// 引入路由
import index from './components/index.vue';
//引入路劲
import path from 'path'

// 路由中间件
Vue.use(VueRouter)
//路由中间件
Vue.use(ElementUI);
//使用中间件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: path.join(__dirname, './assets/statics/img/01.gif'),
  loading:path.join(__dirname, './assets/statics/img/01.gif'),
  attempt: 1
})
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: './assets/statics/img/01.gif',
//   loading: './assets/statics/img/01.gif',
//   attempt: 1
// })


// 定义路由规则
const router = new VueRouter({
   routes :[
   { path: '/index', component: index },
   //重定向
   { path: '/', redirect:'/index'}
  
  ]
})
Vue.config.productionTip = false;

new Vue({
  el:"#app",
  router,
  render: h => h(App),
 
  // 挂载路由规则 传入这个对象
})
