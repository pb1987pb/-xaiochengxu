<template>
<!--保险底单页面-->
  <div class="didan_page">
    <scroll-view scroll-y="true" class="sco">
       <view class="bbox tb sign">

         <view class="part bbox tb">
     <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">报销日期</text><text class="f1 bbox xycenter">{{mesData.ExpenseTime}}</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">报销人员</text><text class="f1 bbox xycenter">{{mesData.NickName}}</text>
         </view>
         </view>
 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">人民币兑港币</text><text class="f1 bbox xycenter">0</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">总数</text><text class="f1 bbox xycenter">{{mesData.summoy}}</text>
         </view>
         </view>
         </view>
    
  <view class="part bbox tb" v-for="(item, itemIndex) in mesData.array" :key="itemIndex">
     <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">日期</text><text class="f1 bbox xycenter">{{item.AddTime}}</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">报销性质</text><text class="f1 bbox xycenter">{{item.EName}}</text>
         </view>
         </view>

  <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">明细描述</text>
         </view>
         </view>
 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 neirong">{{item.Description}}</text>
         </view>
         </view>

 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">发生地</text><text class="f1 bbox xycenter">{{item.Occurred}}</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">目的地</text><text class="f1 bbox xycenter">{{item.Destination}}</text>
         </view>
         </view>


 <view class="bbox wrap" v-if="item.ApplyType==1">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">项目名称</text><text class="f3 bbox xycenter teli">{{item.ProName}}</text>
         </view>
         </view>



 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">货币</text><text class="f1 bbox xycenter">0</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">外币金额</text><text class="f1 bbox xycenter">0</text>
         </view>
         </view>
<view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">人民币</text><text class="f1 bbox xycenter">{{item.EMoney}}</text>
         </view>
           <view class="f1 bbox">
           <text class="f1 bbox  strong tb">
             <text class="teshu bbox xycenter">无发票总共金额</text>
             <text class="teshu bbox xycenter">（补票）</text>
             </text><text class="f1 bbox xycenter">{{item.NotInvoiceMoney}}</text>
         </view>
         </view>
          <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 bbox xycenter strong">备注</text>
         </view>
         </view>
 <view class="bbox wrap">
    <view class="f1 bbox">
           <text class="f1 neirong">{{item.Remark}}</text>
         </view>
         </view>
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
 var res= await this.$ajax('/API/WXgetdata/edetailview?eid='+eid);
  console.log(res);
  if(res.Res==1){
  this.mesData=res.data;
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
.didan_page .sco{height:100vh;background-color:#eeeeee  }
.didan_page .part{width: 690rpx;box-sizing:border-box;border-top: 1px solid #1b1b1b;border-left: 1px solid #1b1b1b;margin:10rpx auto;}
.didan_page .wrap text{border-right: 1px solid #1b1b1b;border-bottom:1px solid #1b1b1b;height: 65rpx;  }
.didan_page .sign{padding: 35rpx 0;font-size:24rpx;}
.didan_page .strong{font-size:28rpx;font-weight:bold;background-color: #eeeeee;  }
.didan_page .wrap .teshu{border:none;font-size:24rpx;height: initial; }
.didan_page .wrap .neirong{padding:30rpx;min-height: 100rpx;}
.didan_page .teli{padding-left: 2rpx;}
</style>
