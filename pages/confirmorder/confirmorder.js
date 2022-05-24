let app=getApp()
Page({
  data: {
    radio:"2",
    dvery:"",
    selectbyid:null,
    milk:null,
    starTime:null,
    endTime:null,
    countNum:null,
    dayNum:null,
    delivery:null,
    siteId:null
  },
  onLoad(options) {
    if(options.id){
      this.getsite(options.id)
      this.setData({siteId:options.id})
    }
    this.setData({
      starTime:options.starTime,
      endTime:options.endTime,
      countNum:options.countNum,
      dayNum:options.dayNum,
      delivery:options.delivery
    })
    this.deliverys(options.delivery)
    wx.request({
      url: `http://${app.data.http}/api/milk/selectById/${options.milkid}`,
      success:(res)=>{
        this.setData({
          milk:res.data.data.id
        })
      }
    })
  },
  onChange(event){
    this.setData({
      radio: event.detail,
    });
  },
  deliverys(e){
    if(e==0){
      this.setData({
        dvery:"天天送"
      })
    }
    if(e==1){
      this.setData({
        dvery:"单号送"
      })
    }
    if(e==2){
      this.setData({
        dvery:"双号送"
      })
    }
    if(e==3){
      this.setData({
        dvery:"三日送"
      })
    }
    if(e==4){
      this.setData({
        dvery:"周六送"
      })
    }
    if(e==5){
      this.setData({
        dvery:"周日送"
      })
    }
  },
  getsite(id){
    wx.request({
      url: `http://${app.data.http}/api/site/selectByIdSite/${id}`,
      success:(res)=>{
        this.setData({selectbyid:res.data.data.selectByIdSite})
      }
    })
  },
  updateIndentsite(state,id){
    wx.request({
      url: `http://${app.data.http}/api/indent/updateIndentsite/${state}/${id}`,
    })
  },
  updateIndentstate(state,id){
    wx.request({
      url: `http://${app.data.http}/api/indent/updateIndentstate/${state}/${id}`,
    })
  },
  cellClick(){
    wx.navigateTo({
      url:`/pages/site/site?false=1&milkid=${this.data.milk.id}&delivery=${this.data.delivery}&starTime=${this.data.starTime}&endTime=${this.data.endTime}&countNum=${this.data.countNum}&dayNum=${this.data.dayNum}`
    })
  },
  onSubmit(e){
    if(!this.data.selectbyid){
      wx.showToast({
        title: '请先维护地址',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: `/pages/payment/payment?milkid=${this.data.milk.id}&delivery=${this.data.delivery}&starTime=${this.data.starTime}&endTime=${this.data.endTime}&countNum=${this.data.countNum}&dayNum=${this.data.dayNum}&siteId=${this.data.siteId}&price=${e.target.dataset.price}&radio=${this.data.radio}`
      })
    }
  },
})