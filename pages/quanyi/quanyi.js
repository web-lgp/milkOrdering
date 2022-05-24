Page({
  data: {
    active:0
  },
  onLoad(options) {
    this.setData({
      active:options.index*1
    })
  }
})