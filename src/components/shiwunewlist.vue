<template>
   <!--事务已办列表-->
<div class="list_page">
        <!--事务已办开始-->
       
        <ul class="xms" v-if="text.type=='yb'">
             <!--<li>{{text}}</li>-->
      <li v-for="(item, itemIndex) in text.arr.array" :key="itemIndex">
   <a class="bbox" 
   :href="'/pages/shiwudetailnew/main'+'?id='+item.FPDID+'&proname='+item.ProName+'&type='+text.type+'&fid='+item.FID+'&pid='+item.ProjectID">
          <view class="lef bbox xycenter">
           <view class="iconfont icon-baoxiao"></view>
          </view>
          <view class="bbox tb nrong f1">
          <view class="biaoti">{{item.ProName}}</view>
              <view>申请人：{{item.SendUserName}}</view>
                <view>是否红璞项目：{{item.ProjectSources}}</view>
                <view>收款状态：{{item.PaymentStatus}}%</view>
                <view class="sh">{{item.PStatus}}</view>
          </view>
          <view class="time">{{item.AddTime}}</view>
        </a>
      </li>
      </ul>
<!--已办结束-->
           <!--代办开始-->
           <ul class="xms" v-else>
      <li  v-for="(item, itemIndex) in text.arr.array" :key="itemIndex">

  <a  class="bbox"
   :href="'/pages/shiwudetailnew/main'+'?id='+item.ProjectID+'&proname='+item.ProName+'&type='+text.type+'&cfid='+item.CurFlowID+'&goType='+item.GoType+'&wtid='+item.WFID+'&compactName='+item.compactName">
          <view class="lef bbox xycenter">
           <view class="iconfont icon-baoxiao"></view>
          </view>
          <view class="bbox tb nrong f1">
          <view class="biaoti">{{item.ProName}}</view>
                <view>发送人：{{item.SendUserName}}</view>
                <view>是否红璞项目：{{item.ProjectSources}}</view>
                <view>收款状态：{{item.PaymentStatus}}%</view>
                <view class="sh">{{item.PStatus}}</view>
          </view>
          <view class="time">{{item.AddTime}}</view>
        </a>




      </li>

      </ul>
       <!--代办结束-->
</div>
</template>

<script>

export default {
  data () {
    return {
    
    }
  },
  props:['text'],
  methods:{

  },
  mounted() {
   console.log(this.text);
  },
  
}
</script>

<style scoped>
.list_page {height: 300rpx;}
.list_page .biao{width: 100rpx;font-size:50rpx;color: #959595; }
.list_page .geceng{height: 24rpx;background-color: #eeeeee;}
.list_page .caozuo{position: absolute;bottom: 0;left: 0;width: 100%;height:88rpx;background-color: white; }
.list_page .cz{border:1px solid #e0e0e0;}
.list_page .active{background-color: #fb5557;color: white;border:1px solid #fb5557; }
.list_page .scrolwrap{height:calc( 100vh - 203rpx);}
.list_page .xms a{border-bottom:1px solid #e5e5e5 ;padding-bottom: 30rpx;}
.list_page .xms{padding-bottom:50rpx; }
.list_page .xms li{padding: 30rpx;}
.list_page .lef{border-radius:50%;background-color: #fb5557;width:80rpx;height:80rpx;color: white; }
.list_page .nrong{font-size:28rpx;color: #626262;line-height: 45rpx;box-sizing: border-box;padding: 0 70rpx 0 30rpx; }
.list_page .biaoti{font-size:34rpx;color: black;font-weight: bold;line-height: 60rpx;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;
-webkit-line-clamp: 2;-webkit-box-orient: vertical;margin-bottom:10rpx; }
.list_page .sh{color: #fb5557;}
.list_page .time{color: #626262;font-size:24rpx; }
</style>
<style scoped>
/*.caozuo1{width: 100%;height:88rpx;background-color: white; z-index: 5}
.caozuo1 .cz{border:1px solid #e0e0e0;}
.caozuo1 .active{background-color: #fb5557;color: white;border:1px solid #fb5557; }*/
</style>
