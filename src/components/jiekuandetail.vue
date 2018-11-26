<template>
  <div class="bxxq_page">
    <view class="cont">
      <view class="bbox top">
 <view class="bbox xycenter tubiao">
           <view class="iconfont icon-baoxiao"></view>
          </view>
          <view class="bbox f1  biaoti ycenter">
            <view class="name">{{childdata.proname}}</view>
            <!--<view class="shenhe">何大东审核中</view>-->
          </view>
      </view>
    <view>
      <view class="mes">
        <view>申请人：<text class="col">{{childdata.NickName}}</text></view>

 <view>
     <view v-if="childdata.PaymentStatus">项目收款进度：<text class="col">{{childdata.PaymentStatus}}%</text></view>

             <view v-if="childdata.moy">借款总金额：<text class="col">￥{{childdata.moy}}</text></view>
           <view v-if="childdata.CurBudget">项目剩余预算：<text class="col">￥{{childdata.CurBudget}}</text></view>

              <view>合同总价格：<text class="col">{{childdata.ContractTotal}}</text></view>
             <view>总预算额度：<text class="col">{{childdata.TotalBudget}}</text></view>
              <view>当时预算花费：<text class="col">{{childdata.CurProjectCost}}</text></view>
               <view>付款进度：<text class="col">{{childdata.PaymentStatus}}%</text></view>
               
               <template v-if="childdata.IsHasPPC==1">
 <view>合同名称：<text class="col">{{childdata.CompactName}}</text></view>
             <view>合同类型：<text class="col">{{childdata.CompactType}}</text></view>
              <view>合同总金额：<text class="col">{{childdata.CompactMoney}}</text></view>
               <view>合同剩余金额：<text class="col">{{childdata.CurCompactMoney}}</text></view>
               </template>

           <view v-if="childdata.moy">各费用用途：</view>
           <view class="boxwrap bbox wrap">
               
               <view class="vie type bbox" v-for="(item, itemIndex) in childdata.moneylist" :key="itemIndex">{{item.Name}}：<text class="col">￥{{item.money}}</text></view>
           
    </view>
           </view>
            <view class="beizhu">备注：<text class="col ">{{childdata.Msg}}</text></view>
      </view>
      <view class="fujian bbox">
           <view class="lfu bbox tb">
           <view>附件：</view>
            <view v-if="progress!=0&&progress!=100">{{progress}}%</view>
            </view>
          <view class="rf">
            <view v-for="(item, itemIndex) in childdata.array" :key="itemIndex"  @click="download(item.fileurl,item.filetype)" >
                   {{item.filename}}
              </view>
          </view>
  
      </view>
  
    </view>

 <view>

 </view>
    </view>
        
  </div>
</template>
<script>


export default {
  data () {
    return {
       progress:0,

    }
  },
  props: ['childdata'],
  created () {
 
  },
  mounted(){
   console.log('加载我的详情了');

  },
  methods:{
open(filetype,res){
             if(filetype==2){ //等于2 就是文档
 wx.openDocument({
          filePath: res.tempFilePath
        })
             }else{ //等于 1 就是图片
wx.previewImage({
  current:res.tempFilePath , // 当前显示图片的http链接
  urls: [res.tempFilePath] // 需要预览的图片http链接列表
})
             }
    },
download(url,filetype,filename){
   var that=this;
  wx.showLoading({
  title: '加载中',
  mask:true
})

 const downloadTask= wx.downloadFile({
  url: 'https://b.dorm.vip'+url, //仅为示例，并非真实的资源
  success: function(res) {
    console.log(res);
    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    if (res.statusCode === 200) {

       that.open(filetype,res);
    }
  },
  fail:function(){
wx.hideLoading();
wx.showToast({
  title: '打开文件失败',
  icon: 'success',
  duration: 2000
})
  },
  complete:function(){
wx.hideLoading();
  },
});
   downloadTask.onProgressUpdate((res) => {
    this.progress=res.progress;
  console.log('下载进度',  this.progress)
  if(this.progress==100){
  wx.hideLoading();
  }
    })
}

  },
    onUnload:function(){//卸载的时候
    this.progress=0;
  }

}
</script>
<style scoped>
.bxxq_page{font-size:28rpx; }
.bxxq_page .cont{padding:0 30rpx;}
.bxxq_page .tubiao{border-radius:50%;background-color: #fb5557;width:80rpx;height:80rpx;color: white; }
.bxxq_page .biaoti{padding-left:35rpx; }
.bxxq_page .name{font-size:32rpx;color: black;line-height: 45rpx;font-weight: bold;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;
-webkit-line-clamp: 2;-webkit-box-orient: vertical; }
.bxxq_page .top{padding: 35rpx 0;border-bottom:1px solid #e5e5e5; }
.bxxq_page .shenhe{color: #fb5557;font-size:28rpx; }
.bxxq_page .mes{color: #626262;line-height: 50rpx;padding: 20rpx 0;border-bottom:1px solid #e5e5e5; }
.bxxq_page .col{color: black;}
.bxxq_page .didan{color: #0068b7;text-decoration: underline}
.bxxq_page .beizhu{padding-right:50rpx; }
.bxxq_page .fujian{padding: 30rpx 0;}
.bxxq_page .lfu{color: #626262;line-height: 60rpx;width: 120rpx;}
.bxxq_page .rf{color: #0068b7;text-decoration: underline;line-height: 60rpx;}
/*.bxxq_page .vie{width: 410rpx;}*/
.bxxq_page .type{width: 50%;}
</style>