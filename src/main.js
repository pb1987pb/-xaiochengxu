import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import store from './store/index'



import net from './utils/mynet'
Vue.prototype.$server = 'https://b.dorm.vip' // 配置 后端统一的请求路径
Vue.prototype.$ajax = net // 挂载请求方法

//  换成自己写的fly请求方式
import myfly from './utils/myfly'
Vue.prototype.$http=myfly


import '../static/css/flex.wxss';  //flex布局
import '../static/css/icon.wxss';  //icon布局
//  挂载全局的store   main.js上
Vue.prototype.$store = store




const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    // 'pages/didan/main' 是报销底单 ，'pages/bxdidan/main' 是 报销单
    pages: ['pages/logs/main', 'pages/index/main','^pages/login/main',
          'pages/baoxiaolist/main','pages/baoxiaodetail/main',
          'pages/hetonglist/main','pages/hetongdetail/main',
          'pages/jiekuanlist/main','pages/jiekuandetail/main',
         'pages/fukuanlist/main','pages/fukuandetail/main',
         'pages/xieyilist/main','pages/xieyidetail/main',
         'pages/shiwulist/main','pages/shiwudetailnew/main',
         'pages/yusuanlist/main','pages/yusuandetail/main',
         'pages/didan/main','pages/bxdidan/main'
         ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#37383b',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  }
}
