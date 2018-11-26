<template>
  <div class="write_bz">
     <form>
    <view>备注：</view>
    <view class="section">
  <textarea name="evaContent" maxlength="500"  class="area" placeholder="填写备注内容" v-model="bz"/>   
</view>

<view class="bbox xcenter " v-if="isclose">
  <button type="warn" class="bbox xycenter yuedu">请认真浏览审批内容（{{time}}）</button>
</view>
<view class="bbox xbetween caozuo" v-if="!isclose">
  <button type="warn" @click="success()">{{tgtitle}}</button>
   <button class="jujue"  @click="fail()">{{jjtitle}}</button>
</view>
  </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
    bz:"",
    isclose:true,
    time:15,
    timeer:null
    }
  },
  props: {
    tgtitle: {
        type: 'string',
        default: '通过' //这样可以指定默认的值
    },
    jjtitle: {
        type: 'string',
        default: '拒绝' 
    },
},
  methods:{
success(){
   this.$emit('succ',this.bz);
  },
  fail(){
     this.$emit('fai',this.bz);
  }
  
},
onLoad()
{
   this.time=10,
  this.isclose=true;
 // 开启定时器
 this.timeer =setInterval(()=>{
   this.time--;
     
   if(this.time==0){
      console.log(this.isclose);
     this.isclose=false;
     clearInterval(this.timeer);
   }
 },1000);
},

onUnload(){
 //清除定时器

  this.isclose=true;
     this.timeer && clearInterval(this.timeer);
     console.log('清除这个组件了');
}
}
</script>

<style scoped>
.write_bz{padding: 0 30rpx;font-size:28rpx; }
.write_bz .area{border: 1px solid #e0e0e0;width: 100%;height: 210rpx;margin: 20rpx 0 50rpx;box-sizing:border-box;padding: 30rpx;}
.write_bz .caozuo button{width: 334rpx;}
.write_bz .jujue{background-color: #959595;color: white;height: 90rpx;}
.write_bz .cocen{background-color: #eeeeee;height: 25rpx;}
.yuedu{width: 500rpx;font-size:28rpx; }
</style>
