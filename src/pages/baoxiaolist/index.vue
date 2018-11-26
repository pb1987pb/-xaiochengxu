<template>
<!--报销单列表页面-->
  <div class="bx_page">
     
     <!--搜索框开始，这个只在在 已办的列表里面有-->
    <view class="searchwrap" >
<search @search="search" @sousu="sousu" v-if="type=='yb'"></search>
  <view class="geceng" ></view>
    </view>
<!--搜索框结束-->

  <view class="container"  :class="dataobj.type=='yb'?'cur':''" id="container" @touchmove="fangdou">
    <view class="wrapbig" v-if="dataobj.type">
   <xmlist :text="dataobj" ></xmlist>
            <!--加载完成之后显示已加载全部，这个主要是上拉加载-->
      <view class="complete bbox xycenter" v-if="searchLoadingComplete">已加载全部</view>
    </view>
         <!--列表没有任何数据的时候，显示，没有数据-->
      <view v-if="hidden" class="bbox xycenter nodata">没有数据</view>
        <!--没有数据结束-->
    </view>

   <!--回到顶部的按钮-->
 <view  class="back" v-if="showGoTop" @click="backtop(300)">
 <totop></totop>
      </view>

      <!--待办和已办的操作按钮-->
    <caozuo @shaixuan="shaixuan"></caozuo>
  </div>
</template>
<script>

import xmlist from '@/components/xmlist'
import search from '@/components/search'
import caozuo from '@/components/caozuo.vue'
import totop from '@/components/totop.vue'

import mixin from '../../../static/js/mixin'; // 引入mixin文件

export default {
 mixins: [mixin],
  data () {
    return {
      dbUrl:'/API/WXGetData/ExpenseWaitList',//待办请求地址
      ybUrl:'/API/WXGetData/ExpenseNoWaitList',//已办请求地址
    }
  },
    components: {
    xmlist,
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
