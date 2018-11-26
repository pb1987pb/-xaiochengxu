const regeneratorRuntime = require('./runtime')
import tool from '@/utils/index.js'
export default {
 data() {
  return {
     dbUrl:'',//待办请求地址
      ybUrl:'',//已办请求地址
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
   onReachBottom(){//下拉到底
 this.loadMore();
},
methods:{
  // 回到顶部
  backtop(time){
   this.showGoTop=false;
    wx.pageScrollTo({
      scrollTop: 0,
       duration: time
    })
  }, //获取屏幕滚动出去的高度
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
     async loadMore(){//下拉分页加载
    
    if(this.type=='yb'&& this.allLoaded){ //已办才有分页

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
        this.loadproceData(res.data);  //处理加载的数据 
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
     this.dataobj={};
      this.type=str;  //记录状态
      this.xialaflag =true;//放置重复上拉标志。这个可能不需要设置，放置bug，设置一下
      this.pageindex=1;//把页面都设置为1
       this.hidden=false; //开始的时候，无数据隐藏
       this.allLoaded=true;//允许上拉加载
      this.searchLoadingComplete=false; // 全部加载完成开始也是 false
           
     if(str=='db'){
        //代办 的请求状态
       this.searword="";//把搜索关键字清空

          try{
            let  res= await this.$http.get(this.dbUrl);
            //待办处理返回数据
            this.dbproceData(res);
          }
          catch(e){
                 this.noData();
          }


     }else{ 
               // 已办的请求。
           try{
            // let  res= await this.$http.get(this.dbUrl);
            let  res= await this.$http.get(this.ybUrl,
       {
         searchwords:this.searword,
         pageindex:this.pageindex,
         pagesize :this.pagesize
       });
            //待办处理返回数据
          this.ybproceData(res);
          }
          catch(e){
             this.noData();
          }

     }    
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
//上拉没有数据，是一样的处理
loadNodata(){
  // 没有数据了
                 this.allLoaded=false; //不在上拉
                 this.searchLoadingComplete=true; //数据全部完毕
},
// 搜索的时候失去了焦点
search(str){ 
   this.searword=str;
},
  //点击搜索按钮的时候
 sousu(str){ 
 this.shaixuan('yb');
 }
},
mounted() {
 this.shaixuan('db');
  //滚动防抖函数。
  if(!this.fangdou)
  {
 this.fangdou =tool.debounce(this.queryMultipleNodes);
  }  
},
}

