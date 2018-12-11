<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <shiwudetail v-if="childdata" :childdata="childdata"></shiwudetail>
  <view class="cocen"></view>
<view class="xbz"  v-if="wtid>0&&type=='db'">
<fankui @succ="tonguo" @fai="jujue"></fankui>
       </view>
  </div>
</template>

<script>
import shiwudetail from '@/components/shiwudetail'
import beizhutwo from '@/components/beizhutwo'
import fankui from '@/components/fankui'
import detailmix from '../../../static/js/detailmix'; // 引入mixin文件
export default {
  mixins: [detailmix],
  data () {
    return {
      ybdeturl:'/API/WXGetData/WaitWithOutFeedBack',//代办详情的url和待办没审批权限的人的url
      ybtgUrl:'/API/WXGetData/ReturnMsgForWithOutFeedBack',//通过url
      ybjjUrl:'/API/WXGetData/SendProcessTransaction',//拒绝url 
     backUrl:'../shiwulist/main',//通过获取拒绝跳转回去的地址
        wfbid:'',
        proid:'',
         curFlowID:'',
    }
  },
   components: {
    shiwudetail,
    beizhutwo,
    fankui
  },
  mounted() {
    
  },
  methods:{
         getybCanshu(){
            return { };
    },
    //请求待办详情数据的时候，传递的参数data
    getdbCanshu(){
      // cid:this.id,wtid:this.wtid
           return { wtid:this.id};
    },
      getCanshu(){
              return {wtid:this.id}
    },
//渲染数据重写
xuanranshuju(res){
         this.childdata=res.data;
         this.childdata.proname=this.proname;
          this.wfbid=res.data.WFBID;
          this.proid=res.data.ProID;
           this.curFlowID=res.data.curFlowID;
},
       //通过获取拒绝，type是1表示通过，是0表示拒绝，str是备注的内容
    yesorno(type,str){
          var url; //通过获取拒绝最终请求的地址
          var data;
         if(type==1)
          {
            url=this.ybtgUrl;
          data={wfbid:this.id,msg:str};
          }
         else{
          url=this.ybjjUrl;
           data={pid:this.id,msg:str};
         }
        this.accomplish(url,data);
    },

  }
}
</script>

<style scoped>
.bxdt_page .sco{height:100vh; }
.bxdt_page .beizhu{padding: 40rpx 0;}
.bxdt_page .xbz{padding-bottom:200rpx;}
</style>
