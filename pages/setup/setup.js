let app=getApp()
Page({
  data: {
    fileList: [],
    userName:"",
    show: false,
    columns: ['男', '女', '保密'],
    index:2,
    show2: false,
    columns2: ['未婚', '已婚', '保密'],
    index2:2,
    sex:"保密",
    hunyin:"保密",
    touxiang:null
  },
  onLoad(){
    wx.request({
      url:`http://${app.data.http}/api/user/selectPhone/${app.data.phone}`,
      success:(res)=>{
        this.setData({
          userName:app.data.phone,
          sex:res.data.data.selectPhone.sex,
          hunyin:res.data.data.selectPhone.hunyin,
          touxiang:res.data.data.selectPhone.img
        })
      }
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: `http://${app.data.http}/api/file/upload`, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success:(res)=> {
        this.updateImg(res.data)
        this.evaluatesimg(res.data)
        const { fileList = [] } = res.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  onConfirm(event) {
    this.setData({ 
      show: false,
      sex:event.detail.value,
      index:event.detail.index
    });
  },
  onCancel() {
    this.setData({ show: false });
  },
  onClose2() {
    this.setData({ show2: false });
  },
  onConfirm2(event) {
    this.setData({ 
      show2: false,
      hunyin:event.detail.value,
      index2:event.detail.index
    });
  },
  onCancel2() {
    this.setData({ show2: false });
  },
  onSex(){
    this.setData({show:true});
  },
  onHunyin(){
    this.setData({show2:true});
  },
  exitUser(){
    
    wx.showModal({
      title: '退出',
      content:"确认退出登录吗?",
      success:res=>{
        if(res.confirm){
          app.data.phone=null
          wx.switchTab({
            url: '/pages/user/user',
          })
        }
      }
    })
  },
  onUnload(){
    wx.request({
      url: `http://${app.data.http}/api/user/updateSexAndHunyin/${this.data.sex}/${this.data.hunyin}/${app.data.phone}`,
    })
  },
  updateImg(url){
    wx.request({
      url:`http://${app.data.http}/api/user/updateImgAndPhone/${url}/${app.data.phone}`,
    })
  },
  evaluatesimg(url){
    wx.request({
      url:`http://${app.data.http}/api/evaluates/updateImgAndUphone/${url}/${app.data.phone}`,
    })
  },
})