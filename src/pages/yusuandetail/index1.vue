<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <yusuandetail v-if="childdata" :childdata="childdata"></yusuandetail>
  <view class="cocen"></view>
 <view class="beizhu">
<beizhutwo v-if="childdata" :beizhu="childdata.arrays"></beizhutwo>
  </view>
<view class="xbz" v-if="wtid>0&&type=='db'">
<writebz @succ="tonguo" @fai="jujue"></writebz>
       </view>
  </div>
</template>

<script>
import yusuandetail from '@/components/yusuandetail'
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
        id:''
        
    }
  },
   components: {
    yusuandetail,
    beizhutwo,
    writebz
  },
  created () {

  },
  mounted(){
      console.log('进来了');
        this.cid=this.$root.$mp.query.id;//获取id

         this.proname=this.$root.$mp.query.proname;//项目名字
          this.type=this.$root.$mp.query.type; //是代办还是已办




         if(this.type=="yb"){//以办请求接口
  this.requestData(this.cid,this.proname);
         }else{ //代办请求接口
           
               this.wtid=this.$root.$mp.query.wtid;
              this.fenlei=this.$root.$mp.query.fenlei; //一般是 2 ，有项目是 1
            

               
                if(this.wtid=2){ //有审批权限的人

                      this.yesrequestData(this.cid,this.proname);
                }else{ //没有权限的人
this.requestData(this.cid,this.proname);
                }

               
               
         }
    
  },
  methods:{
   async requestData(cid,proname){
               var res=  await this.$ajax('/API/WXGetData/WaitAddBudget'+'?bid='+cid);
        this.childdata=res.data;
        this.childdata.from="baoxiao";
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;
          console.log(this.childdata);
            },
            async yesrequestData(cid,proname){
             
               var res=  await this.$ajax('/API/WXGetData/WaitYsdSp'+'?wtid='+cid);
                this.id=res.data.ID;
        this.childdata=res.data;
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;
        
            },async ystongguo(cid,str){ //一般项目通过

               var   res= await this.$ajax('/API/WXGetData/AddBudgetPass'+'?bid='+cid+'&remark='+str);
            this.chuli(res);

            },async ysjujue(cid,str){//一般项目拒绝

               var res=  await this.$ajax('/API/WXGetData/AddBudgetReject'+'?bid='+cid+'&remark='+str);
                     this.chuli(res);

            },
            chuli(res){ //点击拒绝或者通过，根据返回的值来判断
                   if(res.Res==1){// 
                       this.type='yb'; //成了成了已办的
                          //跳转
        const url = '../yusuanlist/main';
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
  content: '你确定通过这条报销',
  success: function(res) {

    if (res.confirm) {//通过
      
       that.ystongguo(that.id,str,);
  
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
  content: '你确定拒绝这条报销',
  success: function(res) {
    if (res.confirm) {
       that.ysjujue(that.id,str,);
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
