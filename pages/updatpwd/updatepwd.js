let app=getApp()
Page({
  data: {
    value:"",
    value2:""
  },
  touser(){
    console.log(this.data.value,this.data.value2);
    if(this.data.value && this.data.value2 && this.data.value===this.data.value2){
      wx.switchTab({
        url: '/pages/user/user',
      })
      this.updatepwd()
    }else{
      wx.showToast({
        title: '新密码设置错误',
        icon:"none"
      })
    }
  },
  updatepwd(){
    wx.request({
      url:`http://${app.data.http}/api/user/updatePwd/${this.data.value}/${app.data.phone}`,
    })
  }
})