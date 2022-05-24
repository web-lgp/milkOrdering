let app=getApp()
let time1;
let time2;
Page({
  data: {
    phone:null,
    indents:null,
    i:1,
    active:0
  },
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onShow(e){
    this.setData({
      phone:app.data.phone,
      indents:null,
      active:0
    })
    if(this.data.phone){
      this.selectByPhoneAndIndentstate(1)
    }
  },
  onChange(event) {
    this.setData({
      i:event.detail.name+1,
      active:event.detail.name
    })
    this.selectByPhoneAndIndentstate(event.detail.name+1)
  },
  toObligation(e){
    wx.navigateTo({
      url: `/pages/obligation/obligation?id=${e.target.dataset.id}`,
    })
  },
  delindent(e){
    wx.showModal({
      title: '确认取消订单？',
      success:res=>{
        if(res.confirm){
          wx.request({
            url: `http://${app.data.http}/api/indent/deleteByIndentid/${e.target.dataset.id}`
          })
          let time2=setTimeout(()=>{
            this.selectByPhoneAndIndentstate(1)
          },100)
        }
      }
    })
  },
  zhifu(e){
    wx.navigateTo({
      url: `/pages/payment/payment?price=${e.target.dataset.price}&indentid=${e.target.dataset.state}&selectbyid=${e.target.dataset.indentsite}`,
    })
  },
  zhifu2(e){
    wx.showModal({
      title: '待收货',
      content:"确认收货?",
      success:res=>{
        if(res.confirm){
          this.getupdate(3,e.target.dataset.state)
          let time1=setTimeout(()=>{
            this.selectByPhoneAndIndentstate(2)
          },100)
        }
      }
    })
  },
  zhifu3(e){
    wx.navigateTo({
      url: `/pages/details/details?id=${e.target.dataset.state}`,
    })
  },
  zhifu4(e){
    wx.navigateTo({
      url: `/pages/appraise/appraise?id=${e.target.dataset.id}`,
    })
  },
  selectByPhoneAndIndentstate(state){
    wx.request({
      url: `http://${app.data.http}/api/indent/selectByPhoneAndIndentstate/${app.data.phone}/${state}`,
      success:(res)=>{
        console.log(res);
        this.setData({
          indents:res.data.data.selectByPhoneAndIndentstate
        })
      }
    })
  },
  getupdate(state,indentid){
    wx.request({
      url: `http://${app.data.http}/api/indent/updateIndentstate/${state}/${indentid}`,
    })
  },
  zhuanzhi(i){
    return Math.ads(i)
  },
  onUnload(){
    clearTimeout(time1);
    clearTimeout(time2)
  },
})