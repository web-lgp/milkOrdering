let app=getApp()
Page({
  data: {
    username:null,
    phone:null,
    address:null,
    name:null,
    upSite:null,
    id:null
  },
  onLoad(e){
    if(e.id){
      this.setData({
        id:e.id
      })
      this.getbyIdsite(e.id)
    }
  },
  onShow(){
    if(!this.data.id){
      this.setData({
        address:app.data.address,
        name:app.data.name,
        username:null,
        phone:null
      })
    }
  },
  onQueRen(){
    if(this.data.username&&this.data.phone&&this.data.address&&this.data.name){
      if(this.data.id){
        wx.request({
          url: `http://${app.data.http}/api/site/updateAll/${this.data.id}
          /${this.data.username}/${this.data.phone}/${this.data.address}/${this.data.name}`,
        })
      }else{
        wx.request({
          url: `http://${app.data.http}/api/site/addsite/${app.data.phone}/${this.data.phone}/${this.data.username}/${this.data.address}/${this.data.name}`,
        })
      }
      wx.navigateTo({
        url: '/pages/site/site',
      })
    }else{
      wx.showToast({
        title: '以上信息均不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  getbyIdsite(index){
    //修改地址
    wx.request({
      url: `http://${app.data.http}/api/site/selectById/${index}`,
      success:(res)=>{
        console.log(res);
        this.setData({
          upSite:res.data.data.selectById,
          address:res.data.data.selectById.address,
          name:res.data.data.selectById.name,
          username:res.data.data.selectById.consignee,
          phone:res.data.data.selectById.phone
        })
      }
    })
  },
})