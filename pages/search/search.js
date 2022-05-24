let app=getApp();
Page({
  data: {
    value:"",
    likeMiaoshu:null,
    http:null,
    option1: [
      { text: '全部商品', value: 0 },
      { text: '热销产品', value: 1 },
      { text: '猜你喜欢', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '价格降序', value: 'b' },
      { text: '价格升序', value: 'c' },
    ],
    value1: 0,
    value2: 'a',
  },
  onLoad(options) {
    this.setData({
      http:app.data.http
    })
  },
  onChange(e){
    this.setData({
      value: e.detail
    });
  },
  onClick(){
    if(this.data.value){
      wx.request({
        url: `http://${app.data.http}/api/milk/selectLike/${this.data.value}`,
        success:(res)=>{
          this.setData({
            likeMiaoshu: res.data.data.selectLike,
          });
        }
      })
    }else{
      this.setData({likeMiaoshu:null})
    }
  },
  onShow(){
    this.setData({
      value: "",
      likeMiaoshu:"",
      value1: 0,
      value2: 'a',
    });
  },
  todetails(e){
    wx.navigateTo({
      url: `/pages/details/details?id=${e.currentTarget.dataset.id}`,
    })
  },
  onSwitchChange(e){
    if(e.detail==1){
      this.selectByState(0)
    }
    if(e.detail==2){
      this.selectByState(1)
    }
  },
  onSwitchChange2(e){
    let arr=null
    if(e.detail=='b'){
      arr=this.data.likeMiaoshu.sort((a,b)=>{
        return b.price-a.price
      })
      this.setData({
        likeMiaoshu:arr
      })
    }
    if(e.detail=='c'){
      arr=this.data.likeMiaoshu.sort((a,b)=>{
        return a.price-b.price
      })
      this.setData({
        likeMiaoshu:arr
      })
    }
  },
  selectByState(state){
    wx.request({
      url: `http://${app.data.http}/api/milk/selectAllByState/${state}`,
      success:(res)=>{
        console.log(res);
        this.setData({
          likeMiaoshu: res.data.data.milkList,
        });
      }
    })
  }
})