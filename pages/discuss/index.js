let app=getApp()
Page({
  data: {
    active: 0,
    evaluates:null,
    showShare: false,
    i:null,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: 'QQ', icon: 'qq' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
  },
  onLoad(options) {
    this.setData({i:options.id})
    this.selectByMilkId(options.id,this.data.active)
  },
  onChange(event) {
    this.setData({
      active:event.detail.name
    })
    this.selectByMilkId(this.data.i,event.detail.name)
  },
  selectByMilkId(id,index){
    wx.request({
      url: `http://${app.data.http}/api/evaluates/selectAllByMilkid/${id}/${index}`,
      success:(res)=>{
        console.log(res);
        this.setData({
          evaluates:res.data.data.selectAllByMilkid
        })
      }
    })
  },
  onClick(event) {
    this.setData({ showShare: true });
  },
  onClose() {
    this.setData({ showShare: false });
  },
  onSelect(event) {
    this.onClose();
  }
})