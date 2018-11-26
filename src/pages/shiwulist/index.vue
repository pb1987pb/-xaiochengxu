<template>
<!--报销单列表页面-->
  <div class="bx_page">
 <view class="searchwrap" >
<search @search="search" @sousu="sousu" v-if="type=='yb'"></search>
  <view class="geceng" ></view>
    </view>


  <view class="container"  :class="dataobj.type=='yb'?'cur':''" id="container" @touchmove="fangdou">
    <view class="wrapbig" v-if="dataobj.type">
   <!--<shiwulist :text="dataobj" ></shiwulist>-->
     <shiwunewlist :text="dataobj" ></shiwunewlist>
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

import shiwunewlist from '@/components/shiwunewlist'
import search from '@/components/search'
import caozuo from '@/components/caozuo.vue'
import totop from '@/components/totop.vue'

import mixin from '../../../static/js/mixin'; // 引入mixin文件
export default {
  mixins: [mixin],
  data () {
    return {
   dbUrl:'/API/WXGetData/TranWait',//待办请求地址
      ybUrl:'/API/WXGetData/TranWorked',//已办请求地址

    }
  },
    components: {
    search,
    caozuo,
    shiwunewlist,
    totop
  },
methods:{
  //代办处理数据
    dbproceData(res){
    if(res.Res==1&&res.data.array.length>0)   
                   this.yesData(res);
        else
          this.noData();
  },
  // 已办请求后的数据处理
  ybproceData(res){
       this.dbproceData(res);
     },
     // 增加数据之后的处理
  loadproceData(data){
         if(data.array.length>0)
        this.dataobj.arr.array= this.dataobj.arr.array.concat(data.array); //处理有数据的时候增加
        else
        this.loadNodata(); //处理上拉完成，没有数据
   }

},
}
</script>

<style scoped>

</style>
