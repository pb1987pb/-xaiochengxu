<template>
     <view class="bbox caozuo">
     <view class="f1 bbox xycenter cz" :class="{active: isActive=='db' }" @click="check('db')">待办</view>
      <view class="f1 bbox xycenter cz" :class="{active: isActive=='yb' }"  @click="check('yb')">已办</view>
    </view>
</template>

<script>

export default {
  data () {
    return {
      isActive:'db',//默认选择的是代办
    }
  },
  props:['text'],
  methods:{
      check(str){
  this.isActive=str;
   this.$emit('shaixuan',str);
}
  },
  onReady () {   // page 的 ,监听页面初次渲染完成
    this.isActive='db';
  }
  
}
</script>

<style scoped>
.caozuo{position: fixed;bottom: 0;left: 0;width: 100%;height:88rpx;background-color: white; z-index: 5}
.caozuo .cz{border:1px solid #e0e0e0;}
.caozuo .active{background-color: #fb5557;color: white;border:1px solid #fb5557; }
</style>
