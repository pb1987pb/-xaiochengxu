<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <hetongdetail v-if="childdata" :childdata="childdata"></hetongdetail>

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
import hetongdetail from '@/components/hetongdetail'

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
        pronametype:'',
        projectsources:''

    }
  },
   components: {
    hetongdetail,
    beizhutwo,
    writebz
  },
  created () {

  },
  mounted(){
    
      this.cid=this.$root.$mp.query.id;//获取id

         this.proname=this.$root.$mp.query.proname;//项目名字
         this.type=this.$root.$mp.query.type; //是代办还是已办

    //  /pages/hetongdetail/main?id=40&proname=测试项目NO.1&type=db&wtid=4818&pronametype=1&projectsources=1
          
          
         

         if(this.type=="yb"){//以办请求接口
  this.requestData(this.cid,this.proname);
         }else{ //代办请求接口
           
            
               this.wtid=this.$root.$mp.query.wtid;
    
            
            //    this.pronametype=this.$root.$mp.query.pronametype; // 1是有项目，0 是无项目

            // this.projectsources=this.$root.$mp.query.projectsources;// 1是红璞项目，0是非红璞项目


                   
               
                if(this.wtid>0){ //有审批权限的人

                      this.yesrequestData(this.cid,this.proname,this.wtid);

                }else{ //没有权限的人

this.requestData(this.cid,this.proname);

                }

               
               
         }
    
  },
  methods:{
   async requestData(cid,proname){ // 已办合同
        
               var res=  await this.$ajax('/API/WXGetData/ContractYclxq'+'?cid='+cid);
        this.childdata=res.data;
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;
          console.log(this.childdata);



            },
            async yesrequestData(cid,proname,wtid){ // 代办合同
               var res=  await this.$ajax('/API/WXGetData/ContractXq'+'?cid='+cid+'&wtid='+wtid);
                 console.log(res);
        this.childdata=res.data;
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;

            },
               async dbrequestData(cid,proname,wtid){
               var res=  await this.$ajax('/API/WXGetData/approvalbill'+'?cid='+cid+'&wtid='+wtid);
        this.childdata=res.data;
        this.childdata.from="baoxiao";
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;
            },async ptongguo(cid,str){ 

               var   res= await this.$ajax('/API/WXGetData/ContractPass'+'?cid='+cid+'&remark='+str);
               console.log(res);
            this.chuli(res);

            },async pjujue(cid,str){//一般项目拒绝

               var res=  await this.$ajax('/API/WXGetData/ContractReject'+'?cid='+cid+'&remark='+str);
                     this.chuli(res);

            },
            chuli(res){ //点击拒绝或者通过，根据返回的值来判断
                   if(res.Res==1){// 
                       this.type='yb'; //成了成了已办的
                          //跳转
            const url = '../hetonglist/main';
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
      
           that.ptongguo(that.cid,str);

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
      that.pjujue(that.cid,str);
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
