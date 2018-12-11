<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <combao v-if="childdata" :childdata="childdata"></combao>
  <view class="cocen"></view>
 <view class="beizhu">
<beizhutwo v-if="childdata" :beizhu="childdata.arrayl"></beizhutwo>
  </view>
<view class="xbz" v-if="wtid>0&&type=='db'">
<writebz @succ="tonguo" @fai="jujue" :tgtitle="tgtitle" :jjtitle="jjtitle"></writebz>
       </view>
  </div>
</template>

<script>
import combao from '@/components/baoxiaotemp'
import beizhutwo from '@/components/beizhutwo'
import writebz from '@/components/writebeizhu'

import detailmix from '../../../static/js/detailmix'; // 引入mixin文件
export default {
   mixins: [detailmix],
  data () {
    return {
        //  fenlei:'',//判断是一般还是项目
       ybdeturl:'/API/WXGetData/worked',//已办详情的url和待办没审批权限的人的url
        dbyesUrl:'/API/WXGetData/approvalbill',//代办详情有审批权限的url
      ybtgUrl:'/API/WXGetData/GeneralExpensePass',//一般项目通过url
      ybjjUrl:'/API/WXGetData/GeneralExpenseReject',//一般项目拒绝url
      xmtgUrl:'/API/WXGetData/ProjectExpensePass',//项目通过url
      xmjjUrl:'/API/WXGetData/ProjectExpenseReject',//项目拒绝url
      backUrl:'../baoxiaolist/main',//通过获取拒绝跳转回去的地址
    }
  },
   components: {
    combao,
    beizhutwo,
    writebz
  },
  methods:{
       //请求已办详情数据的时候，传递的参数data
    getybCanshu(){
            return { cid:this.id };
    },
    //请求待办详情数据的时候，传递的参数data
    getdbCanshu(){
           return { cid:this.id ,wtid:this.wtid};
    },
    //通过获取拒绝，type是1表示通过，是0表示拒绝，str是备注的内容
    yesorno(type,str){
          let url; //通过获取拒绝最终请求的地址
          let data;
         if(type==1)
         {
                     //   非联和审批
            if(this.IsUnionApproval==0){
               url=this.fenlei==1?this.xmtgUrl:this.ybtgUrl;
               data={eid:this.id,remark:str}
            }else
            {
              //联和审批
               url=this.lianheurl;
               data={wtid:this.wtid,remark:str};//数据
            }
           
         }
         else{
              //是联和审批的时候取消，直接跳转
            if(this.IsUnionApproval==1){
                     return wx.navigateBack({
                       delta: 1
                       });
            }
          url=this.fenlei==1?this.xmjjUrl:this.ybjjUrl;
          data={eid:this.id,remark:str};//数据
         }
        //  let data={eid:this.id,remark:str};//数据
        this.accomplish(url,data);
    },

  },
 onshow(){
  //  console.log(this.childdata);
 }
}
</script>

<style scoped>
.bxdt_page .sco{height:100vh; }
.bxdt_page .beizhu{padding: 40rpx 0;}
.bxdt_page .xbz{padding-bottom:200rpx;}
</style>
