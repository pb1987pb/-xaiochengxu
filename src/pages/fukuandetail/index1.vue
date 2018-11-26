<template>
<!--报销单详情页面-->
  <div class="bxdt_page">
  <fukuandetail v-if="childdata" :childdata="childdata"></fukuandetail>
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
import fukuandetail from '@/components/fukuandetail'
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
    fukuandetail,
    beizhutwo,
    writebz
  },
  created () {

  },
  mounted(){
        
        this.cid=this.$root.$mp.query.id;//获取id

         this.proname=this.$root.$mp.query.proname;//项目名字
          this.type=this.$root.$mp.query.type; //是代办还是已办

         


         if(this.type=="yb"){//以办请求接口
  this.requestData(this.cid,this.proname);
         }else{ //代办请求接口
           
               this.wtid=this.$root.$mp.query.wtid;
              this.fenlei=this.$root.$mp.query.fenlei; //一般是 2 ，有项目是 1
            
              
               
                if(this.wtid>0){ //有审批权限的人

                      this.yesrequestData(this.cid,this.proname,this.wtid);
                }else{ //没有权限的人
this.requestData(this.cid,this.proname);
                }

               
               
         }
    
  },
  methods:{
   async requestData(cid,proname){
    
               var res=  await this.$ajax('/API/WXGetData/WorkedFkd'+'?bid='+cid);
        this.childdata=res.data;
        this.childdata.from="baoxiao";
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;
          console.log(this.childdata);
            },
            async yesrequestData(cid,proname,wtid){ //有审批权限的
                console.log('进有权限的人');
               var res=  await this.$ajax('/API/WXGetData/PaymentSp'+'?wtid='+wtid);

               if(res.Res==1){  //能找到具体的值
        this.childdata=res.data;
        this.childdata.icon="icon-baoxiao";
          this.childdata.proname=proname;
               }
       
            },
               async fktongguo(cid,str){ 

               var   res= await this.$ajax('/API/WXGetData/BorrowOf'+'?bid='+cid+'&remark='+str);
            this.chuli(res);

            },async fkjujue(cid,str){

               var res=  await this.$ajax('/API/WXGetData/BorrowOut'+'?bid='+cid+'&remark='+str);
                     this.chuli(res);

            },
            chuli(res){ //点击拒绝或者通过，根据返回的值来判断
                   if(res.Res==1){// 
                       this.type='yb'; //成了成了已办的
                          //跳转
        const url = '../fukuanlist/main';
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
  content: '你确定通过这条付款',
  success: function(res) {

    if (res.confirm) {//通过
      
      
       that.fktongguo(that.cid,str);
    

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
  content: '你确定拒绝这条付款',
  success: function(res) {
    if (res.confirm) {
     that.fkjujue(that.cid,str);
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
