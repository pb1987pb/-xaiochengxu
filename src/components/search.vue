<template>
<!--搜索组件-->
    <view class="search bbox xycenter">
     <view class="sear_in bbox ycenter">
<input placeholder="输入关键字" type="text" class="sousou f1" :bindblur="sear()"
 v-model.trim="searchstr" confirm-type='done'
 maxlength="15" @confirm="complate"/>
<view class="iconfont icon-iconfontzhizuobiaozhun023131 biao bbox xycenter" @click="sousu()"></view>
     </view>
    </view>
</template>

<script>

export default {
  data () {
    return {
   searchstr:'',
    }
  },
methods:{
sear(){ 
  this.$emit('search',this.searchstr);
},
sousu(){
 this.$emit('sousu',this.searchstr);
},
complate(){
  this.sear();
}

}
 
}
</script>

<style scoped>

.search{height: 115rpx;}
.search .sear_in{background-color: #f4f4f4;border: 1px solid #e0e0e0;width:688rpx;height: 75rpx;box-sizing:border-box;padding-left: 20rpx;}
.search .biao{width: 100rpx;font-size:50rpx;color: #959595; }

</style>
