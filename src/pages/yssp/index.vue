<template>
<!--额外预算审批页面-->
  <div class="ewys_page">
     <combao v-if="childdata" :childdata="childdata"></combao>
       <view class="cocen"></view>
       <div class="beizhu">
 <beizhu></beizhu>
       </div>
 
       <view class="xbz">
<writebz @succ="tonguo" @fai="jujue"></writebz>
       </view>
  </div>
</template>

<script>

import combao from '@/components/baoxiaotemp'
import beizhu from '@/components/beizhu'
import writebz from '@/components/writebeizhu'
export default {
  data () {
    return {
      childdata:{
        "from":"yusuan",
         'icon':'icon-ewaiyusuanshenpi',
      }
    }
  },
components: {
    combao,
    beizhu,
    writebz
  }, methods:{
    tonguo(str){
      wx.showModal({
  title: '提示',
  content: '你确定通过这条报销',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定，备注是'+str);
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
});
    },
       jujue(str){
               wx.showModal({
  title: '提示',
  content: '你确定拒绝这条报销',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定，备注是'+str)
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
});
    }
  }
}
</script>

<style scoped>
.ewys_page .beizhu{padding-top:40rpx; }
.ewys_page .xbz{padding: 20rpx 0 200rpx;}
</style>
