var WxParse = require('../wxParse/wxParse.js');

/**
* WxParse.wxParse(bindName , type, data, target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
*/

Page({
  data: {
    details: '',
    author: '',
    time: '',
    img: ''
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://liangyi120.xin/home/articles',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var text = res.data.text
        WxParse.wxParse('article', 'html', text, that, 5);
        that.setData({
          details: res.data.details,
          author: res.data.author,
          time: res.data.time,
          img: res.data.img
        })
      }

    })
  }
})