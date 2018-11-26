<template>
   <!--借款单列表已办-->
<div class="list_page">


        <!--借款单已办开始-->
        <ul class="xms" v-if="text.type=='yb'">
      <li v-for="(item, itemIndex) in text.arr.arrays" :key="itemIndex">
              <a class="bbox" :href="'/pages/hetongdetail/main?id='+item.ID+'&proname='+item.ProName+'&type='+text.type">
          <view class="lef bbox xycenter">
           <view class="iconfont icon-hetong"></view>
          </view>
          <view class="bbox tb nrong f1">
          <view class="biaoti">{{item.ProName}}</view>
               <view>申请人：{{item.NickName}}</view>
<view>{{item.PStatusName}}</view>
<view :class="item.PStatusStr=='通过'?'blue':'sh'">{{item.PStatusStr}}</view>
          </view>
     <view class="time">{{item.AddTime}}</view>
        </a>
      </li>
      </ul>
<!--已办结束-->
 <!--借款单待办开始-->
         <ul class="xms" v-else-if="text.type=='db'">
      <li  v-for="(item, itemIndex) in text.arr.expenseList" :key="itemIndex">
<a class="bbox" :href="'/pages/hetongdetail/main?id='+item.ID+'&proname='+item.ProName+'&type='+text.type+'&wtid='+item.WaitID+'&pronametype='+item.ProNameType+'&projectsources='+item.ProjectSources">
          <view class="lef bbox xycenter">
           <view class="iconfont icon-hetong"></view>
          </view>
          <view class="bbox tb nrong f1">
          <view class="biaoti">{{item.ProName}}</view>
              <view>申请人：{{item.NickName}}</view>
<view>{{item.PStatusName}}</view>
<view :class="item.PStatusStr=='通过'?'blue':'sh'">{{item.PStatusStr}}</view>


          </view>
             <view class="time">{{item.AddTime}}</view>
        </a>
      </li>
       <li  v-for="(item, itemIndex) in text.arr.waitExpenseList" :key="itemIndex">
              <a class="bbox" :href="'/pages/hetongdetail/main?id='+item.ID+'&proname='+item.ProName+'&type='+text.type+'&wtid='+item.WaitID+'&pronametype='+item.ProNameType+'&projectsources='+item.ProjectSources">
          <view class="lef bbox xycenter">
           <view class="iconfont icon-hetong"></view>
          </view>
          <view class="bbox tb nrong f1">
          <view class="biaoti">{{item.ProName}}</view>
                  <view>申请人：{{item.NickName}}</view>
<view>{{item.PStatusName}}</view>
<view :class="item.PStatusStr=='通过'?'blue':'sh'">{{item.PStatusStr}}</view>
          </view>
             <view class="time">{{item.AddTime}}</view>
        </a>
      </li>
      </ul>   
         <view v-else class="bbox xycenter nodata">没有数据</view>
      <!--报销待办开始-->
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
.list_page {}
.list_page .biao{width: 100rpx;font-size:50rpx;color: #959595; }
.list_page .geceng{height: 24rpx;background-color: #eeeeee;}
.list_page .caozuo{position: absolute;bottom: 0;left: 0;width: 100%;height:88rpx;background-color: white; }
.list_page .cz{border:1px solid #e0e0e0;}
.list_page .active{background-color: #fb5557;color: white;border:1px solid #fb5557; }
.list_page .scrolwrap{height:calc( 100vh - 203rpx);}
.list_page .xms a{border-bottom:1px solid #e5e5e5 ;padding-bottom: 30rpx;}
.list_page .xms li{padding: 30rpx;}
.list_page .lef{border-radius:50%;background-color: #fb5557;width:80rpx;height:80rpx;color: white; }
.list_page .nrong{font-size:28rpx;color: #626262;line-height: 45rpx;box-sizing: border-box;padding: 0 70rpx 0 30rpx; }
.list_page .biaoti{font-size:34rpx;color: black;font-weight: bold;line-height: 60rpx;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;
-webkit-line-clamp: 2;-webkit-box-orient: vertical;margin-bottom:10rpx; }

.list_page .sh{color: #fb5557;}
.list_page .blue{color: #22ac38;}
.list_page .time{color: #626262;font-size:24rpx; }
</style>
<style scoped>
/*.caozuo1{width: 100%;height:88rpx;background-color: white; z-index: 5}
.caozuo1 .cz{border:1px solid #e0e0e0;}
.caozuo1 .active{background-color: #fb5557;color: white;border:1px solid #fb5557; }*/
</style>
