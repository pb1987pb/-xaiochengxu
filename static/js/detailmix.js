const regeneratorRuntime = require('./runtime')

export default {
 data() {
  return {
       childdata:{},//数据
       id:'',//当前id
       proname:'',//项目名称
       type:'',//是已办还是代办
        wtid:'',//待办的时候才有这个id,
        ybdeturl:'',//已办详情的url和待办没审批权限的人的url
        dbyesUrl:'',//代办详情有审批权限的url
         backUrl:'',//通过获取拒绝跳转回去的地址
         fenlei:'',
         fid:'',
         pid:'',
         cfid:'',
         goType:'',
       compactName:'',

  }
 },
methods:{
    //给详情模板组织数据
    xuanranshuju(res){
          this.childdata=res.data;
         this.childdata.proname=this.proname;    
    },
    //请求已办详情数据的时候，传递的参数data
    getybCanshu(){
            throw new Error('我是已办详情获取数据时候传递的参数获取方法，这个方法必须要重写');
    },
    //请求待办详情数据的时候，传递的参数data
    getdbCanshu(){
            throw new Error('我是待办详情获取数据时候传递的参数获取方法，这个方法必须要重写');
    },
    //已办和待办没权限的人走这里
   async getData(url,data){
            // let data=this.getCanshu();
             try{
               let res =await this.$http.get(url, data);
               this.xuanranshuju(res);
            }catch(e){
                this.childdata={};
             }
},
           tonguo(str){
                    var that=this;
      wx.showModal({
  title: '提示',
  content: '你确定通过这条报销',
  success: function(res) {

    if (res.confirm) {//通过
         // 确定通过的代码
         that.yesorno(1,str);
    } else if (res.cancel) {
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
      // 确定拒绝的代码
      that.yesorno(0,str);
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
});
    },
         //拿到链接之后的操作
    accomplish(url,data){
      this.$http.get(url,data).then(res=>{
             this.type='yb'; //待办成了已办的
        const url = this.backUrl; //跳转地址
       wx.redirectTo({ url });
       })
    }

},
 mounted() {
        this.id=this.$root.$mp.query.id;//获取id
         this.proname=this.$root.$mp.query.proname;//项目名字
        this.type=this.$root.$mp.query.type; //是待办还是已办
           console.log('我这里接收到数据了没：'+this.type);
         this.wtid=this.$root.$mp.query.wtid;//待办才有这个
        this.fenlei=this.$root.$mp.query.fenlei; //一般是 2 ，有项目是 1
        this.compactName=this.$root.$mp.query.compactName;
      
        this.fid=this.$root.$mp.query.fid;
        this.pid=this.$root.$mp.query.pid;  
        this.cfid =this.$root.$mp.query.cfid;
        this.goType=this.$root.$mp.query.goType;

            //下面这个就是请求数据的方法
              let data={}; //请求发送的数据
              let url='' ;// 请求的连接
                //  待办有权限
                if(this.wtid&&this.wtid>0)
                {
                  data=this.getdbCanshu();
                  url=this.dbyesUrl;
                }       
                else
                {
                    data=this.getybCanshu();//已办和待办没有权限的
                    url = this.ybdeturl;  
                }
                  this.getData(url,data);//最终的请求数据。
                
},
}

