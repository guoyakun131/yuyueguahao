//logs.js
const util = require('../../utils/util.js')
var app = getApp();
function init(that) {
   
  that.setData({
   
    userInfo: app.globalData.userInfo
  })
}

Page({
  data: {
    about: 0,
    logs: [],
    userInfo:{}
    
  },
  onLoad: function () {
    var that=this;
    init(that);
  
    wx.getStorage({
      key: 'sessionkey',
      success: function (res) {
        wx.request({
          url: 'https://liangyi120.xin/user/about',
          data: {
            session: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              about: res.data
            })
          }
        })


      }
    })
    
  }
})
