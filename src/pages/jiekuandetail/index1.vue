<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <jiekuandetail v-if="childdata" :childdata="childdata"></jiekuandetail>
  <view class="cocen"></view>
 <view class="beizhu">
<beizhutwo v-if="childdata" :beizhu="childdata.arrayl"></beizhutwo>
  </view>
<view class="xbz" v-if="wtid>0&&type=='db'">
<writebz @succ="tonguo" @fai="jujue"></writebz>
       </view>
  </div>
</template>

<script>
import jiekuandetail from '@/components/jiekuandetail'
import beizhutwo from '@/components/beizhutwo'
import writebz from '@/components/writebeizhu'
export default {
  data () {
    return {
      childdata:{},
      cid:'',//当前id
       proname:'',//项目名称
        type:'',//是已办还是代办
        wtid:'',//代办的时候才有这个id
        fenlei:'',//判断是一般报销还是项目报销的依据
        
    }
  },
   components: {
    jiekuandetail,
    beizhutwo,
    writebz
  },
  created () {

  },
  mounted(){
      
        this.cid=this.$root.$mp.query.id;//获取id

         this.proname=this.$root.$mp.query.proname;//项目名字
          this.type=this.$root.$mp.query.type; //是代办还是已办

  //  this.wtid=this.$root.$mp.query.wtid;

// this.requestData(this.cid,this.proname);




         if(this.type=="yb"){//以办请求接口

this.requestData(this.cid,this.proname);
  // this.requestData(this.cid,this.proname);
         }else{ //代办请求接口
           
               this.wtid=this.$root.$mp.query.wtid;

                if(this.wtid>0){ //有审批权限的人

                    this.dbrequestData(this.wtid,this.proname);

                }else{ //没有权限的人
this.requestData(this.cid,this.proname);
                }

               
               
         }
    
  },
  methods:{
   async requestData(cid,proname){//没有权限的详情
     console.log('进来了借款');
               var res=  await this.$ajax('/API/WXGetData/BorrWer'+'?bid='+cid);
               
                 console.log(res);   

        this.childdata=res.data;
        this.childdata.icon="icon-jiekuanshenqing";
          this.childdata.proname=proname;
          console.log(this.childdata);
            },
               async dbrequestData(wtid,proname){ //有审批权限的人的详情
               var res=  await this.$ajax('/API/WXGetData/BorWaitSp'+'?wtid='+wtid);
        this.childdata=res.data;
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;
          console.log(this.childdata);
            },async btongguo(cid,str){ //一般项目通过

               var   res= await this.$ajax('/API/WXGetData/BorrowPass'+'?bid='+cid+'&remark='+str);
            this.chuli(res);

            },async bjujue(cid,str){//一般项目拒绝

               var res=  await this.$ajax('/API/WXGetData/BorrowReject'+'?bid='+cid+'&remark='+str);
                     this.chuli(res);

            },
            chuli(res){ //点击拒绝或者通过，根据返回的值来判断
                   if(res.Res==1){// 
                       this.type='yb'; //成了成了已办的
                          //跳转
            const url = '../jiekuanlist/main';
       wx.redirectTo({ url });
                    }else{ // 审核失败，没有插入数据库
                         wx.showToast({
  title: res.EMsg,
  icon: 'none',
  duration: 2000
})    
                    }

            },
                  tonguo(str){
                    var that=this;
      wx.showModal({
  title: '提示',
  content: '你确定通过这条借款',
  success: function(res) {

    if (res.confirm) {//通过
      
      that.btongguo(that.cid,str);
        

    } else if (res.cancel) {//拒绝
  console.log('用户点击取消')
    }
  }
});
    },
       jujue(str){ //拒绝
         var that=this;
               wx.showModal({
  title: '提示',
  content: '你确定拒绝这条借款',
  success: function(res) {
    if (res.confirm) {
           that.bjujue(that.cid,str);
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
});
    }
  }
}
</script>

<style scoped>
.bxdt_page .sco{height:100vh; }
.bxdt_page .beizhu{padding: 40rpx 0;}
.bxdt_page .xbz{padding-bottom:200rpx;}
</style>
