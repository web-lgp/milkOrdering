let app=getApp()
Page({
  data: {
    indent:null,
    site:null
  },
  onLoad(options) {
    wx.request({
      url: `http://${app.data.http}/api/indent/selectByIndentid/${options.id}`,
      success:(res)=>{
        this.setData({
          indent:res.data.data.selectByIndentid
        })
        this.getsite(res.data.data.selectByIndentid.indentsite)
      }
    })
  },
  getsite(index){
    wx.request({
      url: `http://${app.data.http}/api/site/selectById/${index}`,
      success:(res)=>{
        this.setData({
          site:res.data.data.selectById
        })
      }
    })
  }
})