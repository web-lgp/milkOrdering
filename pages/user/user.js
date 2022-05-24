let app=getApp()
Page({
  data:{
    touxiang:null,
    userName:null,
  },
  getlogin(){
    wx.navigateTo({
      url: `/pages/login/login`,
    })
  },
  onShow(e){
    if(app.data.phone){
      wx.request({
        url:`http://${app.data.http}/api/user/selectPhone/${app.data.phone}`,
        success:(res)=>{
          let tell=/(\d{3})\d*(\d{4})/
          let index=app.data.phone
          let phone=index.replace(tell,'$1****$2')
          console.log(res);
          this.setData({
            userName:phone,
            touxiang:res.data.data.selectPhone.img
          })
        }
      })
    }else{
      this.setData({
        userName:null
      })
    }
  },
  rexianfuwu(){
    wx.showModal({
      title: '客服热线',
      content: '1111-111-111',
    })
  }
})
