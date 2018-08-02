// 引入vue模块
import Vue from 'vue'
// 引入vue路由模块
import VueRouter from 'vue-router'
// 引入 app组件 根节点
import App from './App.vue'
//引入css这个模块
import './assets/statics/site/css/style.css'
//引入这个模块
import ElementUI from 'element-ui';
//引入这个css
import 'element-ui/lib/theme-chalk/index.css';
//引入懒加载这个模块
import VueLazyload from 'vue-lazyload';

// 引入路由
import index from './components/index.vue';
//引入这个组件
import goodsinfo from './components/goodsinfo.vue';
//引入这个组件
import payOrder from './components/payOrder.vue'
import login from './components/login.vue'
import cash from './components/cash.vue'

import buyCart from './components/buyCart.vue'
//引入路劲
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//导入axios模块 目的是让所有组件都可以使用
import axios from 'axios'

import moment from "moment";
//引入模块
import Vuex from 'vuex'


axios.defaults.baseURL = "http://47.106.148.205:8899";
// 设置带上cookie
axios.defaults.withCredentials = true

Vue.prototype.axios = axios;

// Vue.filter: {
//   cutTime(value) {
//       return moment(value).format("YYYY年MM月DD日")
//   }
// },
Vue.filter('cutTime', function (value) {
  return moment(value).format("YYYY年MM月DD日")
})

// 路由中间件
Vue.use(VueRouter)
//路由中间件
Vue.use(ElementUI);
//使用中间件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/statics/img/01.gif'),
  //图片的格式需要引入才生效
  loading: require('./assets/statics/img/01.gif'),
  attempt: 1
})
Vue.use(iView);
//使用中间件
Vue.use(Vuex);

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: './assets/statics/img/01.gif',
//   loading: './assets/statics/img/01.gif',
//   attempt: 1
// })
//页面打开就获取元素
let buyGood = JSON.parse(window.localStorage.getItem("buyList")) || {};
//实例化仓库
const store = new Vuex.Store({
  state: {
    buyGood,
    isLogin: false,
    fromPath: "",
  },
  mutations: {
    //{goodId:,goodNum:,}info传过来的格式
    //点击购物车的逻辑,有就累加,没有就存
    increment(state, info) {
      if (state.buyGood[parseInt(info.goodId)]) {
        state.buyGood[parseInt(info.goodId)] += parseInt(info.goodNum);
      } else {
        // state.buyGood[parseInt(info.goodId)] = parseInt(info.goodNum);
        Vue.set(state.buyGood, parseInt(info.goodId), parseInt(info.goodNum))
      }
    },
    //点击加号或者减号,改变vuex的值
    updateData(state, info) {
      state.buyGood[parseInt(info.goodId)] = parseInt(info.goodNum);
    },
    //点击确认删除的时候删除叫vue不要在监控这些属性
    del(state, id) {
      //
      Vue.delete(state.buyGood, id)
    },
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  },
  getters: {
    total: state => {
      let total = 0;
      for (const key in state.buyGood) {
        total += state.buyGood[key]
      }
      return total
    }
  }
})


// 定义路由规则
const router = new VueRouter({
  routes: [{
      path: '/index',
      component: index
    },
    //重定向
    {
      path: '/',
      redirect: '/index'
    },

    {
      path: '/goodsinfo/:id',
      component: goodsinfo
    },
    {
      path: '/buyCart',
      component: buyCart
    },
    {
      path: '/payOrder/:ids',
      component: payOrder
    },
     {
      path: '/login',
      component: login
    },
    {
      path: '/cash/:id',
      component: cash
    },

  ]
})
//导航守卫
router.beforeEach((to, from, next) => {
  //记录是从哪里过来的
  store.state.fromPath = from.path;
  //console.log(from.path);
  if (to.path.indexOf("/payOrder")!=-1) {
    //调用接口,验证是否登录,没登录的话达到登录页,登录了的话就可以登录
    axios.get("site/account/islogin")
      .then((response) => {
        if (response.data.code == "nologin") {
          //没登录
          next("/login")
        } else {
          //登录成功
          next()
        }

      })
  } else {
    next()
  }




})
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App),
  store, //挂载vue上
  //vue组件实例化,最先开始创建并渲染的组件
  beforeCreate() {
    //console.log("在创建之前");
    axios.get("site/account/islogin")
      .then((response) => {
        //console.log(response);
        //如果登录成功,改变vuex里面的值
        if (response.data.code == "logined") {
          store.state.isLogin = true;
        }
      })

  },
  created() {
    // console.log("创建了")
  }

  // 挂载路由规则 传入这个对象
})


//数据常驻
window.onbeforeunload = function () {
  window.localStorage.setItem("buyList", JSON.stringify(store.state.buyGood))
}