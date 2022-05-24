let app=getApp()
Page({
  data: {
    milkList:null,
    bianji:true,
    result: [],
    checked:false
  },
  onLoad(options) {
   this.getfootmark()
  },
  bianwan(){
    this.setData({
      bianji:!this.data.bianji
    })
  },
  onChange(event) {
    this.setData({
      result: event.detail,
    });
    if(this.data.result.length==this.data.milkList.length){
      this.setData({checked:true})
    }else{
      this.setData({checked:false})
    }
  },
  onChanges(){
    if(this.data.checked){
      this.setData({result:[],checked:false})
    }else{
      this.data.milkList.forEach(p=>{
        this.data.result.push(p.id+"")
      })
      this.setData({
        checked:true,
        result:this.data.result
      })
    }
  },
  onClickButton(){
    this.data.result.forEach(p=>{
      this.delfootmark((p*1))
    })
  },
  delfootmark(id){
    wx.request({
      url: `http://${app.data.http}/api/footmark/delByMilkid/${id}/${app.data.phone}`,
      success:(res)=>{
        this.getfootmark()
      }
    })
  },
  getfootmark(){
    wx.request({
      url: `http://${app.data.http}/api/milk/selectByphoneAndMilkId/${app.data.phone}`,
      success:(res)=>{
        this.setData({
          milkList:res.data.data.milkList
        })
      }
    })
  }
})