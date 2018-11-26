/*
    fly配置文件
    by:David 2018.6.14
*/
//引入 fly
// import wx from 'wx'
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly;
// import config from '@/config'
//配置请求基地址
// //定义公共headers
// fly.config.headers={xx:5,bb:6,dd:7}
// //设置超时
fly.config.timeout = 20000;
// //设置请求基地址
fly.config.baseURL = 'https://b.dorm.vip'
//添加请求拦截器
fly.interceptors.request.use(config => {
    // wx.showNavigationBarLoading()//导航条加载动画
      wx.showLoading({
  title: '加载中',
  mask:true
})
    //给所有请求添加自定义header
     // 从本地存储里面获取 sessionId
  let sessionId = wx.getStorageSync('sessionId')|| ''
    if(sessionId){
      config.headers["sessionId"] = sessionId;
    }
    return config;
},
 error => {
        return Promise.reject(error);
    });

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    res => {
         wx.hideLoading();
          const data = res.data

            if (data.Res&&data.Res == 1) {   //服务端定义的响应code码为1时请求成功获取到的数据
    return Promise.resolve(data) 
  }else if(data.Res && data.Res == -3)
   {
      //和后台商量，登陆过期了或者未登陆，返回Res为 -3 
             wx.clearStorageSync();//清除所有本地缓存
                    //  removeLocal('token');//请求local的token
                    //跳转到登录页面 
                 const url = '/pages/login/main'
    //    wx.redirectTo({ url });
        wx.reLaunch({ url });  //这个地方用reLaunch比较好
    //   wx.redirectTo({
    //     url: '@/pages/login/index.vue',
    //   })
               
         
   }else
   {
    //  返回的data.code 值不等于1，那么在这里就是没有返回到合适的数据，就弹窗出来一个错误信息就行

      if(data.Res){

   wx.showToast({
                     title: data.EMsg,
                     icon: 'none',
                    duration: 2000
                  })
      }
                   
                
    // return Promise.resolve(data);
    return Promise.reject(data);
   }
      
    },
    (err) => {
       wx.hideLoading();
        //发生网络错误后会走到这里
          if (err && err.response) {
    let res  = {};
    res.Res = err.response.status;
    switch (err.response.status) {
        case 400: res.message = '请求错误(400)'; break;
        case 401: res.message = '未授权，请重新登录(401)'; break;
        case 403: res.message = '拒绝访问(403)'; break;
        case 404: res.message = '请求出错(404)'; break;
        case 408: res.message = '请求超时(408)'; break;
        case 500: res.message = '服务器错误(500)'; break;
        case 501: res.message = '服务未实现(501)'; break;
        case 502: res.message = '网络错误(502)'; break;
        case 503: res.message = '服务不可用(503)'; break;
        case 504: res.message = '网络超时(504)'; break;
        case 505: res.message = 'HTTP版本不受支持(505)'; break;
        default: res.message = `连接出错(${err.response.status})!`;
    }
       wx.showToast({
                     title: res.message,
                     icon: 'none',
                    duration: 2000
                  })
    return Promise.reject(res)
} 
        //  这里没有用reject，因为后面的代码根本都没有对这个异常进行处理，所以这里就直接resolve，然后在then处理。
        // return Promise.resolve(err.response);// return Promise.reject(error.response.data)
        return Promise.reject(err)
    }
)
// Vue.prototype.$http=fly //将fly实例挂在vue原型上

export default fly
