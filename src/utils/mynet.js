
const net= function(url, method="GET",data={}) {
       wx.showLoading({
      title: '加载中',//数据请求前loading，提高用户体验
    })
  // 从本地存储里面获取 sessionId
  let sessionId = wx.getStorageSync('sessionId')|| ''
    return new Promise((resolve, reject) => {
    try {
      // 调用微信的请求方法,请求后端接口
      wx.request({
        url: this.$server + url,  // 这个已经在main里面配置好了 Vue.prototype.$server = 'http://abc.defghijk.lmn/opqrst/'
        data: data,
        method: method,//请求方法， 大写，'GET 或者 POST'
        header:{
          'sessionId': sessionId,
          'Content-Type': 'application/json'
        },
        success (res) {
              wx.hideLoading();
              //没有登录或者登录过期就返回-3
              console.log(res.data.Res);
              // if(res.data.Res==-3){
              
              //        const url = '../login/main'
              //        wx.redirectTo({ url });
              //         return;
              // }
          resolve(res.data);
        },
        fail (e) {
             wx.hideLoading();
          e.code = 666666;
          resolve(e);  //注意,这里要用resolve,否则前端代码会崩溃
        }
      })
    } catch (e) {
        wx.hideLoading();
      e.code = 777777;
      console.error('网络异步请求出错,', e);
      resolve(e);  //注意,这里要用resolve,否则前端代码会崩溃
    }
    })
  }

export default net;//暴露出来供其他文件引用