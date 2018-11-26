<template>
<!--报销单列表页面-->
  <div class="bx_page">
       <view class="searchwrap" >
<search @search="search" @sousu="sousu" v-if="type=='yb'"></search>
  <view class="geceng" ></view>
    </view>

 <view class="container"  :class="dataobj.type=='yb'?'cur':''" id="container" @touchmove="fangdou">
    <view class="wrapbig" v-if="dataobj.type">
   <jiekuanlist :text="dataobj" ></jiekuanlist>
      <view class="complete bbox xycenter" v-if="searchLoadingComplete">已加载全部</view>
    </view>
      <view v-if="hidden" class="bbox xycenter nodata">没有数据</view>
    </view>
<view  class="back" v-if="showGoTop" @click="backtop(300)">
 <totop></totop>
      </view>

    <caozuo @shaixuan="shaixuan" ></caozuo>
  </div>
</template>
<script>

import jiekuanlist from '@/components/jiekuanlist'
import search from '@/components/search'
import caozuo from '@/components/caozuo.vue'
import totop from '@/components/totop.vue'

import tool from '@/utils/index.js'
import mixin from '../../../static/js/mixin'; // 引入mixin文件

export default {
   mixins: [mixin],
  data () {
    return {
        dbUrl:'/API/WXGetData/BorrowForLonIndex',//待办请求地址
      ybUrl:'/API/WXGetData/BorrowForLonComplete',//已办请求地址
    }
  },
    components: {
    jiekuanlist,
    caozuo,
    search,
    totop
  },

methods:{
    //代办请求后的数据处理
  dbproceData(res){
    if(res.Res==1&&(res.data.expenseList.length>0||res.data.waitExpenseList.length>0))   
                   this.yesData(res);
        else
          this.noData();
  },
  // 已办请求后的数据处理
  ybproceData(res){
        if(res.Res==1&&res.data.array.length>0)
         this.yesData(res);
      else
      this.noData();
     },
   //上拉之后数据成功后处理数据  
   loadproceData(data){
         if(data.array.length>0)
        this.dataobj.arr.array= this.dataobj.arr.array.concat(data.array); //处理有数据的时候增加
        else
        this.loadNodata(); //处理上拉完成，没有数据
   }    
}

}
</script>

<style scoped>


</style>
