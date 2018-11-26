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
import tool from '@/utils/index.js'
// import mixin from '../../../static/js/mixin'; // 引入mixin文件

export default {
  // mixins: [mixin],
  data () {
    return {
      dbUrl:'/API/WXGetData/ExpenseWaitList',//待办请求地址
      ybUrl:'/API/WXGetData/ExpenseNoWaitList',//已办请求地址
      dataobj:{},
      searword:'',//搜索关键字
      type:'db',//搜索状态,默认是待办
      hidden:false,
      fangdou:null,
      pageindex:1,//开始页面的页数
      allLoaded:true,//允许上拉加载
      showGoTop:false,
searchLoadingComplete:false,
pagesize:5,
xialaflag:true,
    }
  },
    components: {
    xmlist,
    caozuo,
    search,
    totop
  },
  onReachBottom(){//下拉到底
 this.loadMore();
},
methods:{
  //获取屏幕滚动出去的高度
  queryMultipleNodes: function () {
    var that = this;
    var query = wx.createSelectorQuery()
    query.select('#container').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      //res[0].top       // 节点的上边界坐标
       console.log(res[0].top);
      //如果顶部的距离超过300   就显示GoTop按钮
      if(res[0].top < -300)   that.showGoTop=true;
      else    that.showGoTop=false;
    })
  },
  // 回到顶部
  backtop(time){
   this.showGoTop=false;
   console.log('我是测试minx的',this.name)
    wx.pageScrollTo({
      scrollTop: 0,
       duration: time
    })

  },
   async loadMore(){//下拉分页加载
    
    if(this.type=='yb'&& this.allLoaded){//已办才有分页

         if(!this.xialaflag){return;}
         this.xialaflag = false ;  //设置为 false
          this.pageindex++;
  //  var  res= await this.$ajax('/API/WXGetData/ExpenseNoWaitList'+'?searchwords='+this.searword+'&pageindex='+this.pageindex+'&pagesize='+this.pagesize);
  
    var  res= await this.$http.get(this.ybUrl,
       {
         searchwords:this.searword,
         pageindex:this.pageindex,
         pagesize :this.pagesize
       });

     if(res.Res==1){ 
       this.xialaflag = true;
              if(res.data.array.length>0)
        this.dataobj.arr.array= this.dataobj.arr.array.concat(res.data.array);
              else{
                 // 没有数据了
                 this.allLoaded=false; //不在上拉
                 this.searchLoadingComplete=true; //数据全部完毕
              }
             
     }else{
       // 失败的时候。
        this.xialaflag = true;
       this.pageindex--;
     }

    }
  },
  //点击子组件的待办和已办，以及开始加载页面数据函数 ,str传递的是以办'yb'还是代办'db'
async shaixuan(str){ 
    this.backtop(0); // 都回到最顶部
      this.type=str;  //记录状态
      this.pageindex=1;//把页面都设置为1
       this.hidden=false; //开始的时候，无数据隐藏
       this.allLoaded=true;//允许上拉加载
      this.searchLoadingComplete=false; // 全部加载完成开始也是 false
           
     if(str=='db'){
        //代办 的请求状态
       this.searword="";//把搜索关键字清空
    //  var  res= await this.$ajax('/API/WXGetData/ExpenseWaitList');
  var  res= await this.$http.get(this.dbUrl);
       if(res.Res==1&&(res.data.expenseList.length>0||res.data.waitExpenseList.length>0))   
                   this.yesData(res);
        else
          this.noData();
     }else{ 
            // 已办的请求。
       var  res= await this.$http.get(this.ybUrl,
       {
         searchwords:this.searword,
         pageindex:this.pageindex,
         pagesize :this.pagesize
       });

       if(res.Res==1&&res.data.array.length>0)
         this.yesData(res);
      else
      this.noData();
     }    
},
search(str){ // 搜索的时候失去了焦点
   this.searword=str;
},
yesData(res){
         this.dataobj={
    'arr':res.data,
    'type':this.type
        }
},
noData(){
       this.dataobj={};
        this.hidden=true; // 没有数据的组件就出现
},
 sousu(str){ //搜索的时候点击了搜索按钮
 this.shaixuan('yb');
}
},
onShow(){

 this.shaixuan('db');
  //滚动防抖函数。
  if(!this.fangdou)
  {
 this.fangdou =tool.debounce(this.queryMultipleNodes);
  }  
},

}
</script>

<style scoped>

</style>
