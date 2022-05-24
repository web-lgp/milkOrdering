
Page({
  data: {
    activeKey: 0,
    classify:"",
    http:null
  },

  onChange(event) {
    this.setData({ activeKey: event.detail});
    this.getclassify()
  },
  onLoad(options){
    let app=getApp();
    this.setData({
      http:app.data.http
    })
    if(options.index){
      this.setData({activeKey:options.index})
    }
    this.getclassify();
  },
  getclassify(){
    wx.request({
      url: `http://${this.data.http}/api/milk/classify/${this.data.activeKey}`,
      success:(res)=>{
       this.setData({ classify: res.data.data.classify });
      },
    })
  },
  todetails(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
});