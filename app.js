// app.js
App({
  data:{
    admin:"",
    http:'124.223.161.204:8081',
    phone:null,
    address:null,
    name:null,
  },
  onLaunch() {
    this.overShare()
  },
  overShare() {
    // 监听路由切换,全局配置转发和分享朋友圈
    wx.onAppRoute(function(res) {
      console.log('route',res)
      let pages = getCurrentPages()
      let view = pages[pages.length - 1]
      if(view) {
        wx.showShareMenu({
          withShareTicket:true,
          menus:['shareAppMessage','shareTimeline']
        })
      }
    })
  },
})
