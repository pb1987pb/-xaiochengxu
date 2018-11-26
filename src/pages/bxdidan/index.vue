<template>
<!--保险底单页面-->
  <div class="bxf_page">
    <scroll-view scroll-y="true" class="sco">
      <view class="name bbox xycenter">费用报销单</view>
       <view class="bbox tb sign">

         <view class="part bbox tb one">
     <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">报销部门</text><text class="f1 bbox xycenter"></text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">日期</text><text class="f1 bbox xycenter">{{mesData.AddTime}}</text>
         </view>
         </view>
         </view>
    
  <view class="part bbox tb">
     <view class="bbox wrap" v-for="(item, itemIndex) in mesData.array" :key="itemIndex">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">用途</text><text class="f1 bbox xycenter">{{item.EName}}</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">金额（元）</text><text class="f1 bbox xycenter">{{item.tmpsum}}</text>
         </view>
         </view>
         <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">总计</text><text class="f1 bbox xycenter">{{mesData.SumMoy}}</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter money">{{mesData.CNSumMoy}}</text>
         </view>
         </view>
  <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">备注</text>
         </view>
         </view>
 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 neirong">{{mesData.MsgRemark}}</text>
         </view>
         </view>

 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="bbox xycenter strong shenhe shu">部门审核</text>
           <view class="f1 bbox xycenter shenhe">
             <img :src="mesData.departmentheadsignature" class="ima" mode="aspectFit"/>
             </view>
         </view>
           <view class="f1 bbox">
           <text class="bbox xycenter strong shenhe shu">领导审核</text>
           <view class="f1 bbox xycenter shenhe tb">
             <img :src="mesData.ceosignature" class="ima" mode="aspectFit"/>
             <img :src="mesData.cfosignature" class="ima" mode="aspectFit"/>
           </view>
         </view>
         </view>

 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">原借款</text><text class="f1 bbox xycenter">{{mesData.BorrowMoney}}</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">应退借款</text><text class="f1 bbox xycenter">{{mesData.RetunMoney}}</text>
         </view>
         </view>



         </view> 


          
       </view>
      
 <view class="bbox lastwrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">会计主管：</text><text class="f1 bbox xycenter"></text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">会计：</text><text class="f1 bbox xycenter"></text>
         </view>
         </view>
          <view class="bbox lastwrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">出纳：</text><text class="f1 bbox xycenter"></text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">报销人：</text><text class="f1 bbox ycenter person">{{mesData.NickName}}</text>
         </view>
         </view>
    </scroll-view>
 
  </div>
</template>

<script>


export default {
  data () {
    return {
        mesData:{}
    }
  },
methods:{
async init(eid){ 
  var res= await this.$ajax('/API/WXgetdata/ekview?eid='+eid);
    console.log(res);
  if(res.Res==1){
     this.mesData=res.data
  }
 
}
},
/*生命周期函数：可以用vue的 也可以用小程序的*/
mounted(){
  var eid=this.$root.$mp.query.eid;
            this.init(eid); 
           
        },


}
</script>

<style scoped>
.bxf_page .sco{height:100vh; }
.bxf_page .name{height: 110rpx;font-size:40rpx;font-weight: bold; }
.bxf_page .part{width: 690rpx;box-sizing:border-box;border-top: 1px solid #1b1b1b;border-left: 1px solid #1b1b1b;margin:0 auto;}
.bxf_page .wrap text{border-right: 1px solid #1b1b1b;border-bottom:1px solid #1b1b1b;height: 65rpx;  }
.bxf_page .sign{padding-bottom: 50rpx;font-size:24rpx; background-color: white;}
.bxf_page .strong{font-size:28rpx;font-weight:bold;background-color: #eeeeee;  }
.bxf_page .one{margin-bottom: 15rpx;}
.bxf_page .wrap .teshu{border:none;font-size:24rpx;height: initial; }
.bxf_page .wrap .neirong{padding:30rpx;min-height: 100rpx;}
.bxf_page .wrap .shenhe{height: 230rpx;border-right: 1px solid #1b1b1b;border-bottom:1px solid #1b1b1b}
.bxf_page .shenhe .ima{width:50%;}
.bxf_page .shu{width: 30rpx;padding: 0 20rpx;}
.bxf_page .money{font-size:22rpx; }
.bxf_page .lastwrap{width: 690rpx;margin: 0 auto;}
.bxf_page .lastwrap .strong{background-color: white;}
.bxf_page .person{font-size:28rpx; }
</style>
