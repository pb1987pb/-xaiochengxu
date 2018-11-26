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

import detailmix from '../../../static/js/detailmix'; // 引入mixin文件
export default {
  mixins: [detailmix],
  data () {
    return {
         ybdeturl:'/API/WXGetData/ContractYclxq',//已办详情的url和待办没审批权限的人的url
        dbyesUrl:'/API/WXGetData/ContractXq',//代办详情有审批权限的url

      ybtgUrl:'/API/WXGetData/ContractPass',//合同通过url
      ybjjUrl:'/API/WXGetData/ContractReject',//合同拒绝url
      backUrl:'../hetonglist/main',//通过获取拒绝跳转回去的地址
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
      
  
    
  },
  methods:{
    // 请求已办详情的时候，传递的参数
    getybCanshu(){
            return { cid:this.id };
    },
    //请求待办详情数据的时候，传递的参数data
    getdbCanshu(){
      // cid:this.id,wtid:this.wtid
           return { cid:this.id ,wtid:this.wtid};
    },
        //通过获取拒绝，type是1表示通过，是0表示拒绝，str是备注的内容
    yesorno(type,str){
          var url; //通过获取拒绝最终请求的地址
         if(type==1)
          url=this.ybtgUrl;
         else{
          url=this.ybjjUrl;
         }
         let data={cid:this.id,remark:str};//数据
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
