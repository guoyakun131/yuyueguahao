
var interval = null //倒计时函数

var codevalue;
var phonevalue;
Page({
  data: {
    button:"btn",
    logs: [],
    time: '获取验证码', //倒计时 
    currentTime: 61
  },
  phoneinput:function(e){
    phonevalue=e.detail.value;
  },
  userinput:function(e){
    codevalue = e.detail.value;
    
    if (codevalue.length!=0 && phonevalue!=null){
  
      this.setData({
        
        button:"btn1"
      })
    } else if (codevalue.length==0){
  
      this.setData({

        button:"btn"
      })
    }
    
  },
  
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    if (phonevalue != null){
     this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
    that.session()
    }
  },

session:function(){
  var that =this
  wx.getStorage({
    key: 'sessionkey',
    success: function (res) {
      that.openCode(res.data)
    }
  })
},

  //后端发送短信
  openCode:function(sessionkey){
  wx.request({
    url: 'https://qubing.net.cn/user/VerificationCode',
    data: {
      session: sessionkey,
      phoneNumber: phonevalue
    },
    header: {
      'content-type': 'application/json' // 
    },
    success: function (res) {
      console.log(res.data)
    }
  })
  },

//绑定手机
  formSubmit:function(e){
    console.log(e.detail.value.usernum)
    console.log(e.detail.value.usercode)
    if (e.detail.value.usernum.length!= 0 && e.detail.value.usercode.length!= 0) {
      wx.getStorage({
        key: 'sessionkey',
        success: function (res) {
          wx.request({
            url: 'https://qubing.net.cn/user/binding',
            data: {
              session: res.data,
              phoneNumber: e.detail.value.usernum,
              code: e.detail.value.usercode
            },
            header: {
              'content-type': 'application/json' // 
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        }
      })
      
    }
    },
   
  
  onLoad:function(){
    
  },
  
  inputuserName: function (ev) {
    var data = ev.detail.value;

  },
  
  
})