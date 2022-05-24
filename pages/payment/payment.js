let app=getApp()
Page({
  data: {
    radio2:"1",
    radio:"2",
    price:null,
    starTime:null,
    endTime:null,
    countNum:null,
    dayNum:null,
    delivery:null,
    siteId:null,
    milkid:null,
    indentid:null,
    selectbyid:null
  },
  onLoad(options) {
    console.log(options.radio);
    this.setData({
      price:options.price,
      starTime:options.starTime,
      endTime:options.endTime,
      countNum:options.countNum,
      dayNum:options.dayNum,
      delivery:options.delivery,
      siteId:options.siteId,
      milkid:options.milkid,
      indentid:options.indentid,
      selectbyid:options.selectbyid,
      radio:options.radio
    })
  },
  onChange2(event){
    this.setData({
      radio2: event.detail,
    });
  },
  onSubmit(){
    let zhifu=""
    if(this.data.radio2==1){
      zhifu='微信支付'
    }
    if(this.data.radio2==2){
      zhifu='支付宝支付'
    }
    if(this.data.radio2==3){
      zhifu='零钱支付'
    }
    wx.showModal({
        title: '确认付款',
        content: `当前选择${zhifu}`,
        success:(res)=> {
          if (res.confirm) {
            wx.showToast({
              title: '支付成功',
              icon: 'loading',
              duration: 1000,
              complete:()=>{
                setTimeout(()=>{
                  wx.switchTab({
                    url: '/pages/indent/indent',
                  })
                },1500)
                if(this.data.milkid){
                  this.getaddindent(2)
                  this.ismilkbox(this.data.radio,this.data.siteId)
                }else{
                  this.updateIndentstate(2,this.data.indentid)
                }
              }
            })
          }
        }
    })
  },
  updateIndentstate(state,id){
    wx.request({
      url: `http://${app.data.http}/api/indent/updateIndentstate/${state}/${id}`,
    })
  },
  onClickLeft(){
    if(!this.data.milkid){
      wx.switchTab({
        url: `/pages/indent/indent`,
      })
    }else{
      wx.showModal({
        title: '确定离开支付?',
        content: '你的订单未支付,尽快支付',
        success:(res)=>{
          if (res.confirm) {
            this.getaddindent(1)
            this.ismilkbox(this.data.radio,this.data.siteId)
            wx.switchTab({
              url: `/pages/indent/indent`,
            })
          }
        }
      })
    }
      
  },
  getaddindent(indentstate){
    let year=new Date().getFullYear()+"";
    let yue=new Date().getMonth()+1+"";
    let day=new Date().getDate()+"";
    wx.request({
      url:`http://${app.data.http}/api/indent/addindent/${this.data.milkid}/${app.data.phone}/${this.data.delivery}/${this.data.starTime}/${this.data.endTime}/${this.data.countNum}/${this.data.dayNum}/${indentstate}/${this.data.siteId}/${year+yue+day}`,
    })
  },
  ismilkbox(index,id){
    wx.request({
      url: `http://${app.data.http}/api/site/updateIsmilkbox/${index}/${id}`,
    })
  },
})