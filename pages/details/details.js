let app=getApp();
import getdate from "date.js"
Page({
  data: {
    topbanner:{},
    gridItems:["天天送","单号送","双号送","三日送","周六送","周日送"],
    i:null,
    texts:"订单配送时间内,每天为您配送",
    date: '',
    show: false,
    qj:false,
    count:1 ,
    bujin:1,
    startyear:null,
    endyear:null,
    evaluates:[],
  },
  onLoad(options) {
    this.setData({
      i:null,
      date:'',
      show:false,
      qj:false,
      count:1,
      bujin:1
    })
    this.selectByMilkId(options.id,1)
    if(app.data.phone){
      wx.request({
        url: `http://${app.data.http}/api/footmark/footmark/${options.id}/${app.data.phone}`,
      })
    }
    wx.request({
      url: `http://${app.data.http}/api/milk/selectById/${options.id}`,
      success:(res)=>{
        this.setData({
          topbanner:res.data.data.id
        })
      }
    })
  },
  addborder(e){
    this.setData({
      i:e.currentTarget.dataset.index,
      qj:true
    })
    if(this.data.i==0){
      this.setData({
        texts:"订单配送时间内,每天为您配送"
      })
    }else if(this.data.i==1){
      this.setData({
        texts:"订单配送时间内,日期逢单数(如1号、3号、5号)依次配送"
      })
    }else if(this.data.i==2){
      this.setData({
        texts:"订单配送时间内,日期逢双数(如2号、4号、6号)依次配送"
      })
    }else if(this.data.i==3){
      this.setData({
        texts:"订单配送时间内,日期逢3的倍数(如3号、6号、9号)依次配送"
      })
    }else if(this.data.i==4){
      this.setData({
        texts:"订单配送时间内,逢周六配送"
      })
    }else if(this.data.i==5){
      this.setData({
        texts:"订单配送时间内,逢周日配送"
      })
    }
  },
  onDisplay() {
    if(this.data.qj){
      this.setData({ show: true });
    }
    else{
      wx.showToast({
        title: '请先选择配送模式',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    let date=new Date(event.detail[0])
    let dates=new Date(event.detail[1])
    let date1=date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();
    let date2=dates.getFullYear()+"-"+(dates.getMonth() + 1)+"-"+dates.getDate();
    this.setData({
      startyear:date.getFullYear()+"年",
      endyear:dates.getFullYear()+"年"
    })
    if(getdate(date1,date2,this.data.i)==0){
      this.setData({
        show:true,
      })
      wx.showToast({
        title: `日期不符合${this.data.gridItems[this.data.i]}规范`,
        icon: 'none',
        duration: 2000
      })
    }else{
      this.setData({
        show: false,
        date: `${this.formatDate(start)}-${this.formatDate(end)}`,
      });
      this.setData({
        count:getdate(date1,date2,this.data.i)
      })
    }
  },
  onChange(event) {
    this.setData({
      bujin:event.detail
    })
  },
  onSubmit(){
    let time=this.data.date.split("-")
    if(!app.data.phone){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      if(this.data.i && this.data.date){
        wx.navigateTo({
          url: `/pages/confirmorder/confirmorder?milkid=${this.data.topbanner.id}&delivery=${this.data.i}&starTime=${this.data.startyear+time[0]}&endTime=${this.data.endyear+time[1]}&countNum=${this.data.count}&dayNum=${this.data.bujin}`,
        })
      }
      else{
        wx.showToast({
          title: '请先选择配送模式和配送区间,才能购买',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  selectByMilkId(id,index){
    wx.request({
      url: `http://${app.data.http}/api/evaluates/selectByMilkId/${id}/${index}`,
      success:(res)=>{
        this.setData({
          evaluates:res.data.data.selectByMilkId
        })
      }
    })
  },
  todiscuss(){
    wx.navigateTo({
      url:`/pages/discuss/index?id=${this.data.topbanner.id}`,
    })
  }
})