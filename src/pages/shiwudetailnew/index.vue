<template>



<!--报销单详情页面-->
  <div class="bxdt_page">
  <shiwudetail v-if="childdata" :flag="flag" :childdata="childdata"></shiwudetail>
  <view class="cocen"></view>
 <view class="beizhu">
<beizhutwo v-if="childdata" :beizhu="childdata.arrayR"></beizhutwo>
  </view>
  <view class="xbz" v-if="type=='db'">
<writebz @succ="tonguo" @fai="jujue"  :tgtitle="tgtitle" :jjtitle="jjtitle" ></writebz>
       </view>
  </div>
</template>

<script>
import shiwudetail from '@/components/shiwudetail'
import beizhutwo from '@/components/beizhutwo'
import writebz from '@/components/writebeizhu'
import detailmix from '../../../static/js/detailmix'; // 引入mixin文件
export default {
  mixins: [detailmix],
  data () {
    return {
      dbyesUrl:'/API/WXGetData/WaitTransaction',//代办详情的url和待办没审批权限的人的url
      ybdeturl:'/API/WXGetData/WorTransaction',//已办的详情
      ybtgUrl:'/API/WXGetData/WorTransaction',//通过url
      ybjjUrl:'/API/WXGetData/SendProcessTransaction',//拒绝url 
     backUrl:'../shiwulist/main',//通过获取拒绝跳转回去的地址
     tgtitle:'通过',
     jjtitle:'拒绝',
     curFlowID:'',
     PlanExecuteTime:'',
     PlanExecuteCycle:'0',

    }
  },
   components: {
    shiwudetail,
    writebz,
    beizhutwo,
  },
  methods:{
     //  已办请求参数
         getybCanshu(){
            if(this.id){
            return { fpdid:this.id};
            }else
            {
                  return { fpdid:this.id,pid:this.pid,fid:this.fid};
            }
    },
    //请求待办详情数据的时候，传递的参数data
    getdbCanshu(){
       return { pid:this.id,cfid:this.cfid,};
    },
//渲染数据重写
xuanranshuju(res){
         this.childdata=res.data;
         this.childdata.proname=this.proname;
           this.childdata.PlanExecuteTime=res.data.PlanExecuteTime;
           this.childdata.PlanExecuteCycle=res.data.PlanExecuteCycle;
            this.childdata.IsShowPlanExecute=res.data.IsShowPlanExecute;
          this.wfbid=res.data.WFBID;
          this.proid=res.data.ProID;
          this.curFlowID=res.data.curFlowID;
                   console.log(this.goType);
                  if(this.goType==4){
                this.tgtitle="确认阅读";
                this.jjtitle="取消";
              }
},
       //通过获取拒绝，type是1表示通过，是0表示拒绝，str是备注的内容
    yesorno(type,str){
          var url; //通过获取拒绝最终请求的地址
          var data;
         if(type==1)
          {
              if(this.goType==2){
url='/API/WXGetData/PassProcessTransaction';
          data={msg:str,compactName:this.compactName,pid:this.id,curFlowID:this.curFlowID};
              }
              if(this.goType==4){
url='/API/WXGetData/RetrunProcessTransaction';
          data={pid:this.id,msg:str};

              }
          }
         else{
           //取消阅读，返回上一页
           if(this.goType==4){
              return wx.navigateBack({
    delta: 1
          });
           }
          url='/API/WXGetData/NewFAILProcessTransaction';
           data={pid:this.id,curFlowID:this.curFlowID,msg:str};
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
