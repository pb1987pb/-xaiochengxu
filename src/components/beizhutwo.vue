<template>
  <div class="beizhus">

    <view class="bbox sign" v-for="(item, itemIndex) in beizhu" :key="itemIndex">
     <view class="tx bbox xycenter">
       <view class="iconfont icon-gerenzhongxintianse ren"></view>
     </view>
     <view class="f1 bbox tb xq">
       <view class="bbox xbetween tmes ycenter">

 <view><text class="name">{{item.NickName}}</text>
 <text :class="item.intPStatus==1?'cur2':'cur3'">{{item.strPStatus}}</text>
 </view><view>{{item.AddTime}}</view>
       </view>
      
       <view>备注：{{item.Remark}}</view>
     </view>
  </view>

  </div>
</template>

<script>

export default {
  data () {
    return {
      data:''
    }
  },
  props: ['beizhu'],
}
</script>

<style scoped>
.beizhus{padding:0 30rpx;color: #626262;font-size:28rpx; }
.beizhus .sign{padding-bottom: 40rpx;}
.beizhus .tx{width: 75rpx;height: 75rpx;background-color: #0068b7;border-radius:50%; }
.beizhus .tx .ren{font-size:50rpx;color: white; }
.beizhus .name{color: black;}
.beizhus .xq{padding: 0 20rpx 0 35rpx;}
.beizhus .tmes{height: 75rpx;}
.beizhus .cur1{color: black;}
.beizhus .cur2{color:#22ac38;margin-left: 16rpx;}
.beizhus .cur3{color:#fb5557;margin-left: 16rpx;}
</style>
