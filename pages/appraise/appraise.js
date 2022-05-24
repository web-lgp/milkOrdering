let app=getApp()
Page({
  data: {
    indent:null,
    texts:null,
    value: 0,
    message:null,
    checked: true,
    value2:0,
    value3:0,
    xing:"",
    xing2:"",
    xing3:"",
    touxiang:null
  },
  onLoad(options) {
    this.getindent(options.id)
    wx.request({
      url:`http://${app.data.http}/api/user/selectPhone/${app.data.phone}`,
      success:(res)=>{
        this.setData({
          touxiang:res.data.data.selectPhone.img
        })
      }
    })
  },
  onMessage(event){
    this.setData({
      message:event.detail
    })
  },
  onChange(event) {
    if(event.detail==1){
      this.setData({xing:"非常差"})
    }
    if(event.detail==2){
      this.setData({xing:"差"})
    }
    if(event.detail==3){
      this.setData({xing:"一般"})
    }
    if(event.detail==4){
      this.setData({xing:"好"})
    }
    if(event.detail==5){
      this.setData({xing:"非常好"})
    }
    this.setData({value:event.detail})
  },
  onChange2(event){
    if(event.detail==1){
      this.setData({xing2:"非常差"})
    }
    if(event.detail==2){
      this.setData({xing2:"差"})
    }
    if(event.detail==3){
      this.setData({xing2:"一般"})
    }
    if(event.detail==4){
      this.setData({xing2:"好"})
    }
    if(event.detail==5){
      this.setData({xing2:"非常好"})
    }
    this.setData({value2:event.detail})
  },
  onChange3(event){
    if(event.detail==1){
      this.setData({xing3:"非常差"})
    }
    if(event.detail==2){
      this.setData({xing3:"差"})
    }
    if(event.detail==3){
      this.setData({xing3:"一般"})
    }
    if(event.detail==4){
      this.setData({xing3:"好"})
    }
    if(event.detail==5){
      this.setData({xing3:"非常好"})
    }
    this.setData({value3:event.detail})
  },
  onChecked(event) {
    this.setData({
      checked: event.detail,
    });
  },
  fabu(){
    //发布评论
    if(this.data.value && this.data.value2 && this.data.value3 && this.data.message){
      console.log(111);
      wx.showModal({
        title: '评价成功',
        content: '可点击商品进行查看',
        showCancel: true,//是否显示取消按钮
        cancelText:"返回首页",//默认是“取消”
        cancelColor:'skyblue',//取消文字的颜色
        confirmText:"返回订单",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success:(res)=>{
          if (res.confirm) {
              wx.switchTab({
                url: `/pages/indent/indent`,
              })
          } else {
            wx.switchTab({
              url: "/pages/home/home",
            })
          }
          this.insertPJ()
          this.getupdate()
        }
     })
    }else{
      wx.showToast({
        title: '评价及相关内容不能为空',
        duration:2000,
        mask:true,
        icon:'none', 
      })
    }
  },
  getpsms(i){
    if(i==0){
      this.setData({
        texts:"天天送"
      })
    }else if(i==1){
      this.setData({
        texts:"单号送"
      })
    }else if(i==2){
      this.setData({
        texts:"双号送"
      })
    }else if(i==3){
      this.setData({
        texts:"三日送"
      })
    }else if(i==4){
      this.setData({
        texts:"周六送"
      })
    }else if(i==5){
      this.setData({
        texts:"周日送"
      })
    }
  },
  getindent(id){
    wx.request({
      url: `http://${app.data.http}/api/indent/selectByIndentid/${id}`,
      success:(res)=>{
        this.setData({
          indent:res.data.data.selectByIndentid
        })
        this.getpsms(res.data.data.selectByIndentid.delivery)
        console.log(this.data.indent);
      }
    })
  },
  insertPJ(){
    wx.request({
      url: `http://${app.data.http}/api/evaluates/insertAll/${this.data.indent.id}/${this.data.value}/${this.data.checked+''}/${app.data.phone}/${this.data.value2}/${this.data.value3}/${this.data.message}/${this.data.touxiang}`,
    })
  },
  getupdate(){
    wx.request({
      url: `http://${app.data.http}/api/indent/updateIndentstate/${4}/${this.data.indent.indentid}`,
    })
  },
})