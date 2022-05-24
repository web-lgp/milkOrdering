let app=getApp()
Page({
  data: {
    siteList:null,
    falg:null,
    milkid:null,
    starTime:null,
    endTime:null,
    countNum:null,
    dayNum:null,
    delivery:null
  },
  onupsite(e){
    wx.navigateTo({
      url: `/pages/newSite/newSite?id=${e.target.dataset.index}`,
    })
  },
  ondelsite(e){
    this.updateIsdel(e.target.dataset.id)
    this.getsite()
  },
  getsite(){
    wx.request({
      url: `http://${app.data.http}/api/site/selectSites/${app.data.phone}`,
      success:(res)=>{
        this.setData({
          siteList:res.data.data.selectSites
        })
      }
    })
  },
  updateIsdel(index){
    wx.request({
      url: `http://${app.data.http}/api/site/updateIsdel/${index}`,
    })
  },
  onLoad(options) {
    if(options.false==1){
      this.setData({
        falg:options.false,
        milkid:options.milkid,
        starTime:options.starTime,
        endTime:options.endTime,
        countNum:options.countNum,
        dayNum:options.dayNum,
        delivery:options.delivery
      })
    }
    this.getsite()
  },
  toconfirmorder(e){
    if(this.data.falg){
      wx.navigateTo({
        url: `/pages/confirmorder/confirmorder?id=${e.currentTarget.dataset.siteid}&milkid=${this.data.milkid}&delivery=${this.data.delivery}&starTime=${this.data.starTime}&endTime=${this.data.endTime}&countNum=${this.data.countNum}&dayNum=${this.data.dayNum}`,
      })
    }
  },
  onClickLeft(){
    if(this.data.falg){
      wx.navigateTo({
        url: `/pages/confirmorder/confirmorder?milkid=${this.data.milkid}&delivery=${this.data.delivery}&starTime=${this.data.starTime}&endTime=${this.data.endTime}&countNum=${this.data.countNum}&dayNum=${this.data.dayNum}`,
      })
    }else{
      wx.switchTab({
        url: '/pages/user/user',
      })
    }
  },
  addSite(){
    wx.navigateTo({
      url: '/pages/newSite/newSite',
    })
  }
})