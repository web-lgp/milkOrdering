const app = getApp();
Page({
  data: {
    user:null,
    img:null,
    fileList: [],
    userCount:null,
    count:null,
    count2:null,
    count3:null,
    sum:null,
    list:null,
    tag:"月度热销第",
    admin:""
  },
  onLoad(options){ 
    this.setData({
      admin:options.admin
    })
    this.priceSum()
    this.listrexiao()
    this.admin()
  },
  onShow(){
    this.getcountUser();
    this.getcountMilk();
    this.getadmin();
    wx.hideHomeButton();
  },
  afterRead(event) {
    const { file } = event.detail;
    wx.uploadFile({
      url: `http://${app.data.http}/api/file/upload`,
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success:res=>{
        this.updateImg(res.data)
        setTimeout(()=>{
          this.admin()
        },250)
      },
    });
  },
  updateImg(img){
    wx.request({
      url:`http://${app.data.http}/api/admin/updateImg/${img}`,
    })
  },
  getcountUser(){
    wx.request({
      url: `http://${app.data.http}/api/user/countUser`,
      success:res=>{
        this.setData({
          count:res.data.data.count
        })
      }
    })
  },
  getcountMilk(){
    wx.request({
      url: `http://${app.data.http}/api/milk/countmilk`,
      success:res=>{
        this.setData({
          count2:res.data.data.count
        })
      }
    })
  },
  getadmin(){
    wx.request({
      url: `http://${app.data.http}/api/admin/countAdmin`,
      success:res=>{
        this.setData({
          count3:res.data.data.count
        })
      }
    })
  },
  priceSum(){
    wx.request({
      url: `http://${app.data.http}/api/indent/priceSum`,
      success:res=>{
        this.setData({
          sum:res.data.data.sum
        })
      }
    })
  },
  listrexiao(){
    let date=new Date()
    wx.request({
      url:`http://${app.data.http}/api/indent/rexiaothree/${date.getMonth()+1}`,
      success:res=>{
        this.setData({
          list:res.data.data.count
        })
      }
    })
  },
  admin(){
    wx.request({
      url:`http://${app.data.http}/api/admin/user/${this.data.admin}`,
      success:res=>{
        console.log(res);
        this.setData({
          user:res.data.data.user,
          img:res.data.data.img
        })
      }
    })
  }
});