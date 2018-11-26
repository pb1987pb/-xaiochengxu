<template>
<!--报销单列表页面-->
  <div class="bx_page">
        <view class="searchwrap" >
<search @search="search" @sousu="sousu" v-if="type=='yb'"></search>
  <view class="geceng" ></view>
    </view>

  <view class="container"  :class="dataobj.type=='yb'?'cur':''" id="container" @touchmove="handletouchmove">
    <view class="wrapbig" v-if="dataobj.type">
   <fukuanlist :text="dataobj" ></fukuanlist>
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

import fukuanlist from '@/components/fukuanlist'
import search from '@/components/search'
import caozuo from '@/components/caozuo.vue'
import totop from '@/components/totop.vue'
export default {
  data () {
    return {
      dataobj:{},
      searword:'',//搜索关键字
      type:'db',//搜索状态,默认是待办
      hidden:true,
     pageindex:1,//开始页面的页数
      allLoaded:true,//允许上拉加载
      showGoTop:false,
searchLoadingComplete:false,
pagesize:5
    }
  },
    components: {
    fukuanlist,
    caozuo,
    search,
    totop
  },
   onReachBottom(){//下拉到底
 this.loadMore();
},
methods:{
 handletouchmove(){
  this.queryMultipleNodes();
},
  //获取屏幕滚动出去的高度
  queryMultipleNodes: function () {
    var that = this;
    var query = wx.createSelectorQuery()
    query.select('#container').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      //res[0].top       // 节点的上边界坐标
      // console.log(res[0].top);
      //如果顶部的距离超过300   就显示GoTop按钮
      if(res[0].top < -300) {
       that.showGoTop=true;
      }
      else {
       that.showGoTop=false;
      }
    
    })
  },
  backtop(time){
   this.showGoTop=false;
   console.log('我进来了');
    wx.pageScrollTo({
      scrollTop: 0,
       duration: time
    })

  }, async loadMore(){//下拉分页加载
    
    if(this.type=='yb'&& this.allLoaded){//已办才有分页
this.pageindex++;
   var  res= await this.$ajax('/API/WXGetData/Complete'+'?searchwords='+this.searword+'&pageindex='+this.pageindex+'&pagesize='+this.pagesize);
  
     if(res.Res==1){ 
              if(res.data.array.length>0){

        this.dataobj.arr.array= this.dataobj.arr.array.concat(res.data.array);
         //避免下拉到原来的位置
        
         console.log(this.dataobj.arr.array);
              }else{
                 this.allLoaded=false;
                 this.searchLoadingComplete=true;
                 wx.showToast({
  title: '数据全部加载',
  icon: 'success',
  duration: 2000
})
              }
             
     }else{
       this.pageindex--;
                       wx.showToast({
  title: '网络异常，重新加载',
  icon: 'success',
  duration: 2000
})
     }

    }


  },
async shaixuan(str){ //点击子组件的待办和已办
    this.backtop(0);
   
      this.type=str;  //记录状态
      this.pageindex=1;//把也是设置为1
       this.hidden=false; //无数据隐藏
       this.allLoaded=true;//允许上拉加载
      this.searchLoadingComplete=false;

      var  res
     if(str=='db'){//代办
       this.searword="";//把搜索关键字清空
     var  res= await this.$ajax('/API/WXGetData/CompleteWb');
      console.log('进来没');
 console.log(res);
      if(res.Res==1&&(res.data.expenseList.length>0||res.data.waitExpenseList.length>0))
           {

              this.dataobj={
    'href':'/pages/fukuandetail/main',
    'icon':'icon-fukuanguanli',
    'arr':res.data,
    'type':this.type
        }
      }else{
        this.dataobj={};
        this.hidden=true;
      }


     }else{
       var  res= await this.$ajax('/API/WXGetData/Complete'+'?searchwords='+this.searword);
       console.log(res);
       if(res.Res==1&&res.data.array.length>0){
              this.dataobj={
    'href':'/pages/fukuandetail/main',
    'icon':'icon-fukuanguanli',
    'arr':res.data,
    'type':this.type
        }
      }else{
        this.dataobj={};
        this.hidden=true;
      }
     }
       
},
search(str){ // 搜索的时候失去了焦点
   this.searword=str;
},
 sousu(str){ //搜索的时候点击了搜索按钮
 this.shaixuan('yb');
 }
},
/*生命周期函数：可以用vue的 也可以用小程序的*/
mounted(){
            this.shaixuan('db'); //开始的时候调用已办的
           
        },
onshow:function(){
this.onLoad();
}

}
</script>

<style scoped>
</style>
