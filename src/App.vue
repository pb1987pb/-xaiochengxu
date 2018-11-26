<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
page {
  height: 100%;
  box-sizing: border-box;
}
.cocen{background-color: #eeeeee;height: 25rpx;}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

/*列表页面样式开始*/
.searchwrap{position: fixed;z-index: 999;left:0;right: 0;top:0;background-color: white;}
.bx_page{height: 100vh;}
.container{padding-top:75rpx; }
.container.cur{padding-top:130rpx; }

.bx_page .geceng{height: 24rpx;background-color: #eeeeee;}
.bx_page .geceng.cur{margin-top: 120rpx;}

.bx_page .nodata{height:200rpx;}
.back{position: fixed;z-index: 9999;bottom: 150rpx;right: 70rpx;}
.complete{height: 60rpx;font-size: 18px;}
.wrapbig{padding-bottom: 120rpx;}
/*列表页面样式结束*/






/* CSS Document */

body,h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, pre, code,form, fieldset, legend, input, button,textarea, p, blockquote, th, td {margin: 0;padding: 0;}
 * { outline: none;}
img{ border:none;display:block;max-width:100%;}
ol, ul {list-style: none;}
a{text-decoration:none;color:#000000;}
.box{-webkit-box-sizing:border-box;box-sizing:border-box;}
input, textarea{border:none; outline:none;resize:none;}



</style>
