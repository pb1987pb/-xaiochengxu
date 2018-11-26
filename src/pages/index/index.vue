<template>
<!--首页-->
  <div class="index_page">
<view>
  <view href="#" class="xmlb bbox tb xycenter color1" @click="loginout">
    <view class="bbox ycenter">
 <view class="iconfont  icon-xiangmu xm"></view>
   <view class="num">{{xiangmunum}}</view>
    </view>
   <view class="text">注销登录</view>
   </view>
</view>
  <view class="bbox xbetween anav">
  <a href="/pages/xieyilist/main" class="xmlb bbox tb xycenter f1  juli color2">


    <view class="bbox ycenter">
  <view class="iconfont  icon-yonghuxieyi xm"></view>
   <view class="num">{{xieyinum}}</view>
    </view>
<view class="text">更改协议</view>
   </a>

     <a href="/pages/shiwulist/main" class="xmlb bbox tb xycenter f2 color3">
    <view class="bbox ycenter">
 <view class="iconfont  icon-xiaozhuanfa xm"></view>
   <view class="num">{{shiwunum}}</view>
    </view>
   <view class="text">事务流转</view>
   </a>
</view>
  <view class="bbox xbetween anav">
  <a href="/pages/yusuanlist/main" class="xmlb bbox tb xycenter f1 juli color2">
 <view class="bbox ycenter">
 <view class="iconfont  icon-ewaiyusuanshenpi xm"></view>
 <view class="num">{{erweiyusuannum}}</view>
  </view>
   <view class="text">额外预算预算审批</view>
   </a>
     <view href="#" class="xmlb bbox tb xycenter f1  juli color4">
    <view class="bbox ycenter">
 <view class="iconfont  icon-kehutousu xm"></view>
   <view class="num">{{tousunum}}</view>
    </view>
   <view class="text">投诉管理</view>
   </view>
       <view href="#" class="xmlb bbox tb xycenter f1 color4">
    <view class="bbox ycenter">
 <view class="iconfont  icon-duoren xm"></view>
   <view class="num">{{zuzhinum}}</view>
    </view>
   <view class="text">项目组织</view>
   </view>
</view>

  <view class="bbox xbetween anav">
  <a href="/pages/baoxiaolist/main" class="xmlb bbox tb xycenter f1 juli color5">


   <view class="bbox ycenter">
  <view class="iconfont  icon-baoxiao xm"></view>
   <view class="num">{{baoxiaonum}}</view>
    </view>
<view class="text">报销管理</view>


   </a>
       <a href="/pages/hetonglist/main" class="xmlb bbox tb xycenter f1 color5">


   <view class="bbox ycenter">
  <view class="iconfont  icon-hetong xm"></view>
   <view class="num">{{hetongnum}}</view>
    </view>
<view class="text">合同管理</view>


   </a>
</view>
  <view class="bbox xbetween anav">
  <a href="/pages/jiekuanlist/main" class="xmlb bbox tb xycenter f1 juli color5">


       <view class="bbox ycenter">
  <view class="iconfont  icon-jiekuanshenqing xm"></view>
   <view class="num">{{jiekuannum}}</view>
    </view>
<view class="text">借款管理</view>
   </a>
       <a href="/pages/fukuanlist/main" class="xmlb bbox tb xycenter f1 color5">
        <view class="bbox ycenter">
  <view class="iconfont  icon-fukuanguanli xm"></view>
   <view class="num">{{fukuannum}}</view>
    </view>
<view class="text">付款管理</view>
   </a>
</view>
  </div>
</template>

<script>
// import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
       xiangmunum:0,
        xieyinum:0,
        shiwunum:0,
         erweiyusuannum:0,
          tousunum:0,
          zuzhinum:0,
          baoxiaonum:0,
          hetongnum:0,
          jiekuannum:0,
          fukuannum:0
    }
  },

  components: {
    // card
  },
computed: {
      identityInChinese () { //测试store的
        return this.$store.state.count; 
      }
    },
  methods: {
async loginout(){

      var  res= await this.$ajax('/API/WXGetData/Logout');
      if(res.Res==1){
  const url = '../login/main'
       wx.redirectTo({ url });
      }
      return false;
},
async getnum(){
  
// "FlowCount": 0,
//     "AgreementCount": 0,
//     "AddbudgetCount": 0,
//     "ContractCount": 0,
//     "ComplaintCount": 0,
//     "BorrowPayCount": 0,
//     "BorrowLoanCount": 0,
//     "ExpenseCount": 17,
      var  res= await this.$ajax('/API/WXGetData/GetAllCount');
      if(res.Res==1){
             this.xieyinum=res.data.AgreementCount;
             this.shiwunum=res.data.FlowCount;
             this.erweiyusuannum=res.data.AddbudgetCount;
             this.hetongnum=res.data.ContractCount;
             this.tousunum=res.data.ComplaintCount;
             this.fukuannum=res.data.BorrowPayCount;
             this.jiekuannum=res.data.BorrowLoanCount;
             this.baoxiaonum=res.data.ExpenseCount;
      }
   
}
 
  },
onShow(){
  console.log('每次我都进来获取最新数据');
 this.getnum();

},

}
</script>

<style scoped>
.index_page{width: 100vw;height: 100vh;background-color: #1b1b1b;box-sizing: border-box;padding: 30rpx 30rpx 0 30rpx;}
.index_page .xmlb{height: 210rpx;color: white;}
.index_page .text{font-size:24rpx;margin-top: 30rpx;}
.index_page .num{font-size:56rpx;margin-left: 15rpx; }
.index_page .xm{font-size:80rpx; }
.index_page .anav{margin-top: 20rpx;}
.index_page .juli{margin-right: 18rpx;}
.index_page .color1{background-color: #eb6100}
.index_page .color2{background-color: #8957a1}
.index_page .color3{background-color: #22ac38}
.index_page .color4{background-color: #00a0e9}
.index_page .color5{background-color: #eb6100}
</style>
