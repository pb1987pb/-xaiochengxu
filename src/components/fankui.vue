<template>
  <div class="write_bz">
     <form>
    <view class="fankui">反馈：</view>
    <view class="section">
  <textarea name="evaContent" maxlength="500"  class="area" placeholder="填写反馈内容" v-model="bz"/>   
</view>
<view class="bbox xbetween caozuo">
  <button type="warn" @click="success()">确认反馈</button>
   <button class="jujue"  @click="fail()">取消</button>
</view>
  </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
    bz:""
    }
  },
  methods:{
success(){
   this.$emit('succ',this.bz);
  },
  fail(){
     this.$emit('fai',this.bz);
  }
  
}
}
</script>

<style scoped>
.fankui{padding-top:20rpx; }
.write_bz{padding: 0 30rpx;font-size:28rpx; }
.write_bz .area{border: 1px solid #e0e0e0;width: 100%;height: 210rpx;margin: 20rpx 0 50rpx;box-sizing:border-box;padding: 30rpx;}
.write_bz .caozuo button{width: 334rpx;}
.write_bz .jujue{background-color: #959595;color: white;}
.write_bz .cocen{background-color: #eeeeee;height: 25rpx;}
</style>
