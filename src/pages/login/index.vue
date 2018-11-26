<template>
  <div class="bg_page bbox tb">
 <image src="/static/images/loginbg.png" mode="scaleToFill" class="bg f1"/>
  <form  class='bbox tb ycenter'>
    <div class="inner">
      <div class="shu bbox ycenter">
           <div class="iconfont icon-shouji ziti" >
             </div> 
           <input class="f1" type="number" name="phone" placeholder="手机号" placeholder-style="color:white" maxlength="11" v-model.trim="phone"/>
           </div>  
           <div class="shu bbox ycenter">
            <div class="iconfont icon-mima1 ziti"></div>
           <input class="f1" type="text" password="true" placeholder="密码" placeholder-style="color:white" v-model.trim="password"/>
           </div> 
        <button  @click="formSubmit()"  class="denglu">登录</button>

    </div>
           
        </form>
  </div>
</template>

<script>


export default {
  data () {
    return {
      phone:'',
    password:'',
    isabled:false
    }
  },

  methods: {
async formSubmit(){

  if(this.phone==""){
    return  wx.showToast({
  title: '手机号不的为空',
  icon: 'success',
  duration: 2000
})
  }
    if(this.password==""){
    return  wx.showToast({
  title: '密码不的为空',
  icon: 'success',
  duration: 2000
})
  }
   if(!this.rightPhoneNumber){
    return  wx.showToast({
  title: '手机号格式错误',
  icon: 'success',
  duration: 2000
})
  }
  //让这个登陆按钮不能点
  this.isabled=true;
  // 加载中
  wx.showLoading({
  title: '登录中',
})
  var that=this; //这个一定要去设置 。

   let res = await  this.$ajax('/API/WXGetData/Login','POST',{account:this.phone, password: this.password});
   console.log(res);
      if(res.Res==1){//登录成功
        //  存储到 Storage
        wx.setStorage({
  key:"sessionId",
  data:res.sessionId
});
  //跳转
        const url = '../index/main'
       wx.redirectTo({ url });
    }else{//登录失败
        // 让这个都可以点
       this.isabled=false;
    return  wx.showToast({
  title: res.EMsg,
  icon: 'success',
  duration: 2000
})
      }
       
},
async checkLogin(){
  let sessionId = wx.getStorageSync('sessionId')|| '';
             if(sessionId){ //有sessioinId 就后台请求
                  var res= await this.$ajax('/API/WXGetData/IsWxLoginTo');
                   if(res.Res==1){
        const url = '../index/main'
       wx.redirectTo({ url });
                   };
             }
}
},
   computed:{
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1(3|4|5|7|8)\d{9}$/.test(this.phone);
            }
        },mounted(){
           this.checkLogin();  //验证登录
        },
  created () {
    // 调用应用实例的方法获取全局数据
  
  }
}
</script>

<style scoped>
.bg_page{height: 100%;}
.bg_page .bg{width: 100vw;height: 100vh;}
form{position: absolute;left: 0;top: 568rpx;right: 0;}
.bg_page .inner{width: 690rpx;color: white;}
.bg_page .shu{border: 1px solid white;border-radius:8px;margin-bottom: 20rpx; }
.bg_page .ziti{font-size:75rpx; }
.bg_page .denglu{color: #fb5557;font-size: 36rpx;}
.bg_page .denglu.cur{color: #333;}
</style>
