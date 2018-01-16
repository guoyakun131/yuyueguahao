//app.js
App({

  onLaunch: function () { 
     var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
   

    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo.nickName)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
           
            }
          })
        }
      }
    })

    wx.getUserInfo({
      success: function (res) {
        console.log("dfass")
        var data = {
          nickName: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl
        }
        wx.getStorage({
          key: 'sessionkey',
          success: function (res) {
            console.log("sions")
            wx.request({
              url: 'https://qubing.net.cn/user/addUser',
              data: {
                session: res.data,
                user: data
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log("成功")
              }
            })
          },
          fail: function (res) {
            console.log("123")
          },
          complete: function (res) { },
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })





    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://qubing.net.cn/login/login',
            data: {
              code: res.code,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              wx.setStorage({
                key: "sessionkey",
                data: res.data.session_key
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }

      }
    })
  },

  globalData: {
    userInfo: null
  },

})