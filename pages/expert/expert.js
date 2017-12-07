//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    expert:[],
    departmentName:'',
    expertnNumber:0,
    logs: []
  },
  inputuserName: function (ev) {
    var data = ev.detail.value;

  },
  onLoad: function (options) {

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      departmentName: options.departmentName,
      expertnNumber: options.expertnNumber
    })
    var sell = this
    wx.request({
      url: 'https://liangyi120.xin/experts/expertsClassify', 
      data: {
        department: options.departmentName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        sell.setData({
          expert: res.data
        })
      }
      
    })

  }
})