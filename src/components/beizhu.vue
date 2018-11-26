<template>
  <div class="beizhis_page">
     <view class="inner">
  <view class="jindu">
     <view class="bbox"><text class="bz">王大刚</text><text class="type">已同意</text></view>
     <view class="bbox"><text class="bz">备注：</text><text class="f1">同意就同意罗同意就同意罗同意就同意罗同意就同意罗同意就同意罗同意就同意罗</text></view>
   </view>
   <view class="jindu">
     <view class="bbox"><text class="bz">王刚</text><text class="type">已同意</text></view>
     <view class="bbox"><text class="bz">备注：</text><text class="f1">同同意就同意罗同意就同意罗同意就同意罗</text></view>
   </view>
     <view class="jindu">
     <view class="bbox"><text class="bz">王大刚</text><text class="type">已同意</text></view>
     <view class="bbox"><text class="bz">备注：</text><text class="f1">同意就同意罗同意就同意罗同意就同意罗同意就同意罗同意就同意罗同意就同意罗</text></view>
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
  }
}
</script>

<style scoped>
.beizhis_page .inner{padding: 0rpx 30rpx;color: #626262;font-size:28rpx; }
.beizhis_page .jindu{font-size:24rpx;line-height: 45rpx;padding-bottom:10rpx;  }
.beizhis_page .type{color: #22ac38;margin-left: 18rpx;}
.beizhis_page .bz{width: 80rpx;}
.beizhis_page .area{border: 1px solid #e0e0e0;width: 100%;height: 210rpx;margin: 20rpx 0 50rpx;box-sizing:border-box;padding: 30rpx;}
.beizhis_page .caozuo button{width: 334rpx;}
.beizhis_page .jujue{background-color: #959595;color: white;}
</style>
