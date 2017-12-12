Page({


  data: {
    details: '',
    author: '',
    time: '',
    text:'',
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
        that.setData({
          details: res.data.details,
          author: res.data.author,
          time: res.data.time,
          text: res.data.text,
          img: res.data.img
        })
      }

    })
  }
})