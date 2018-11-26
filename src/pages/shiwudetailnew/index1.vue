<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <shiwudetail v-if="childdata" :childdata="childdata"></shiwudetail>
  <view class="cocen"></view>
 <!--<view class="beizhu">
<beizhutwo v-if="childdata" :beizhu="childdata.arrayl"></beizhutwo>
  </view>-->
<view class="xbz" v-if="type=='db'">
<fankui @succ="tonguo" @fai="jujue"></fankui>
       </view>
  </div>
</template>

<script>
import shiwudetail from '@/components/shiwudetail'
import beizhutwo from '@/components/beizhutwo'
import fankui from '@/components/fankui'
export default {
  data () {
    return {
      childdata:{},
      cid:'',//当前id
       proname:'',//项目名称
        type:'',//是已办还是代办
        wtid:'',//代办的时候才有这个id
        fenlei:'',//判断是一般报销还是项目报销的依据
        wfbid:'',
        proid:''
    }
  },
   components: {
    shiwudetail,
    beizhutwo,
    fankui
  },
  created () {

  },
  mounted(){
      
   console.log('我进入了事务详情1111');

      this.cid=this.$root.$mp.query.id;//获取id
         this.proname=this.$root.$mp.query.proname;//项目名字
         this.type=this.$root.$mp.query.type; //是代办还是已办

           this.requestData(this.cid,this.proname);
  },
  methods:{
   async requestData(cid,proname){
     
              var res=  await this.$ajax('/API/WXGetData/WaitWithOutFeedBack'+'?wtid='+cid);



              console.log(res);

        this.childdata=res.data;
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;

          this.wfbid=res.data.WFBID;
          this.proid=res.data.ProID;

            },async sitongguo(cid,remark){
               var res=  await this.$ajax('/API/WXGetData/ReturnMsgForWithOutFeedBack'+'?wfbid='+cid+'&msg='+remark);
                    console.log(res);
                    this.chuli(res);
            },async sijujue(cid,remark){
               var res=  await this.$ajax('/API/WXGetData/SendProcessTransaction'+'?pid='+cid+'&msg='+remark);
                    console.log(res);
                       this.chuli(res);
            },
            chuli(res){ //点击拒绝或者通过，根据返回的值来判断
                   if(res.Res==1){// 
                       this.type='yb'; //成了成了已办的
                          //跳转
        const url = '../shiwulist/main';
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
      
      that.sitongguo(that.wfbid,str)

    } else if (res.cancel) {//拒绝
  
    }
  }
});
    },
       jujue(str){
      const url = '../shiwulist/main';
       wx.redirectTo({ url });
}

  }
}
</script>

<style scoped>
.bxdt_page .sco{height:100vh; }
.bxdt_page .beizhu{padding: 40rpx 0;}
.bxdt_page .xbz{padding-bottom:200rpx;}
</style>
