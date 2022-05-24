let app=getApp();
Page({
  data: {
    active:'',
    zhanghao:null,
    zhpwd:null,
    phone:null,
    sms:null,
    pwd:null,
    flag:null,
    flag1:"",
    http:null,
    time:1000*60,
    timefalg:true,
    timeTest:"发送验证码",
    Code:null
  },
  onLoad(options) {
    this.setData({
      http:app.data.http
    })
  },
  onzhuce(){
    if((/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.phone))){
      wx.request({
        url: `http://${this.data.http}/api/user/selectByPhone/${this.data.phone}`,
        success:(res)=>{
          this.setData({flag:res.data.data.byPhone})
          
          if(!this.data.flag && this.data.Code==this.data.sms){
            this.getUserinsert();
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            this.setData({
              active:0,
              phone:null,
              sms:null,
              pwd:null,
            })
          }else{
            wx.showToast({
              title: '手机号已被注册',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '手机号码有误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  ondenglu(){
    wx.request({
      url: `http://${this.data.http}/api/user/selectUser/${this.data.zhanghao}/${this.data.zhpwd}`,
      success:(res)=>{
        if(res.data.data.byPhone){
          wx.reLaunch({
            url:`/pages/home/home`
          })
          app.data.phone=this.data.zhanghao
          this.setData({
            zhanghao:""
          })
        }else{
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  getUserinsert(){
    wx.request({
      url:`http://${this.data.http}/api/user/insert/${this.data.phone}/${this.data.pwd}`,
    })
  },
  onAndmin(){
    wx.request({
      url:`http://${this.data.http}/api/admin/selectByUserAndPwd/${this.data.zhanghao}/${this.data.zhpwd}`,
      success:res=>{
        if(res.data.data.admin){
          wx.showToast({
            title: '登录成功',
            icon:"none"
          })
          setTimeout(()=>{
            wx.reLaunch({
              url:`/pages/store/store?admin=${this.data.zhanghao}`,
            })
          },1000)
        }else{
          wx.showToast({
            title: '账号或密码错误',
            icon:"none"
          })
        }
      }
    })
  },
  onyzm(){
    if(this.data.phone){
      wx.request({
        url:`http://${app.data.http}/api/note/send?phone=${this.data.phone}`,
        success:res=>{
          console.log(res);
          this.setData({
            Code:res.data
          })
        }
      })
    }
    
    this.setData({timefalg:false})
  },
  onjieshu(){
    this.setData({
      timefalg:true,
      timeTest:"重新发送验证码"
    })
  }
})