<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <jiekuandetail v-if="childdata" :childdata="childdata"></jiekuandetail>
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
import jiekuandetail from '@/components/jiekuandetail'
import beizhutwo from '@/components/beizhutwo'
import writebz from '@/components/writebeizhu'

import detailmix from '../../../static/js/detailmix'; // 引入mixin文件
export default {
   mixins: [detailmix],
  data () {
    return {
        ybdeturl:'/API/WXGetData/BorrWer',//已办详情的url和待办没审批权限的人的url
        dbyesUrl:'/API/WXGetData/BorWaitSp',//代办详情有审批权限的url
      ybtgUrl:'/API/WXGetData/BorrowPass',//通过url
      ybjjUrl:'/API/WXGetData/BorrowReject',//拒绝url 
       backUrl:'../hetonglist/main',//通过获取拒绝跳转回去的地址
    }
  },
   components: {
    jiekuandetail,
    beizhutwo,
    writebz
  },
  methods:{
        // 请求已办详情的时候，传递的参数
    getybCanshu(){
            return { bid:this.id };
    },
    //请求待办详情数据的时候，传递的参数data
    getdbCanshu(){
      // cid:this.id,wtid:this.wtid
           return { wtid:this.wtid};
    },

    yesorno(type,str){
          let url; //通过获取拒绝最终请求的地址
            let data;
             if(type==1)
         {
               //   非联和审批
            if(this.IsUnionApproval==0){
               url=this.ybtgUrl;
               data={bid:this.id,remark:str};//数据
            }else
            {
              //非联和审批
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

             url=this.ybjjUrl;
            data={bid:this.id,remark:str};//数据
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
