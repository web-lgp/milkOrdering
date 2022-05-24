let app=getApp();
Page({
  data: {
    value: '',
    Address:'',
    benner:"",
    hotmelt:"",
    like:"",
    text:["鲜牛奶","天然酸奶","牛奶礼盒","酸奶礼盒","儿童专区","奶粉","一键预购","客户客服"],
    limit:10,
    loadetitl:"数据加载中",
    titleLoading:true,
    http:null
  },
  Site(res){
    wx.chooseLocation({
      latitude: res.latitude,
      longitude: res.longitude,
      success:(data)=>{
        app.data.name=data.name
        app.data.address=data.address
        this.setData({Address:data.address});
      }
    })
  },
  onChange(event) {
    this.setData({ active: event.detail });
    wx.navigateTo({
      url: `/pages/${this.data.active}/${this.data.active}`,
    })
  },
  onClick() {
    wx.openSetting({
      success (res) {
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success:(data)=>{
            this.setData({Address:data.address});
          }
        })
      }
    })
  },
  getBanner(){
    wx.request({
      url: `http://${this.data.http}/api/banner/List`,
      success:(res)=>{
       this.setData({ benner: res.data.data.bannerList });
      },
    })
  },
  gethotmelt(){
    wx.request({
      url: `http://${this.data.http}/api/milk/hotmelt`,
      success:(res)=>{
       this.setData({ hotmelt: res.data.data.hotmeltList });
      },
    })
  },
  getLike(){
    wx.request({
      url: `http://${this.data.http}/api/milk/Like/${this.data.limit}`,
      success:(res)=>{
       this.setData({ like: res.data.data.LikeList });
      },
    })  
  },
  toclassify(index){
    if(app.data.phone && index.currentTarget.dataset.index==6){
      wx.reLaunch({
        url: `/pages/indent/indent`,
      })
    }
    if(index.currentTarget.dataset.index<6){
      wx.reLaunch({
        url: `/pages/classify/classify?index=${index.currentTarget.dataset.index}`,
      })
    }
  },
  onShow(){
      this.setData({
        http:app.data.http,
        Address:app.data.address+app.data.name
      })
      if(!this.data.Address && !app.data.name){    
        wx.getLocation({
          type: 'gcj02',
          success:res=> {
            this.Site(res);
          }
        })
      }
      this.getLike();
      this.getBanner();
      this.gethotmelt();
  },
  onReachBottom(){
     //上拉刷新页面
     if(this.data.like.length<=this.data.limit){
      setInterval(() => {
        wx.request({
          url: `http://${this.data.http}/api/milk/Like/${this.data.limit+10}`,
          success:(res)=>{
           this.setData({ like: res.data.data.LikeList });
          },
       })
      }, 3000);
     }
     else{
       setInterval(() => {
        this.setData({titleLoading:false})
       }, 1000);
       this.setData({loadetitl:"全部加载完成"})
     }
  },
  handleContact(e){
    //客服功能
    console.log(111);
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  todetails(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})
