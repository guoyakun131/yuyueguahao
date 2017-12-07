//logs.js
const util = require('../../utils/util.js')

Page({
  
  data: {
    message:[],
    attention:0,
    quantity:0,
    department:[],
    //得到后端数据到数组
    doctorData: [],
    logs: []
  },
  inputuserName:function(ev){
    var data  =ev.detail.value;
   
  },
  //搜索框按专家姓名查询
  sousuo:function(ev){
    if (ev.detail.value){
    wx.request({
      url: 'https://liangyi120.xin/experts/name', 
      data: {
        name: ev.detail.value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
      }
    })
}
  },
  

  onLoad: function () {
    //请求后端得到医生数据
    
    var sell = this
    wx.request({
      url: 'https://liangyi120.xin/experts/expertsAll', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        //赋值给doctorData
        sell.setData({ doctorData: res.data
        })
       
      }
    })

    //var list = this
    wx.request({
      url: 'https://liangyi120.xin/depatment/list', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        sell.setData({
          department: res.data
        })

      }
    })

   //var quantitys = this
    wx.request({
      url: 'https://liangyi120.xin/experts/quantity', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        
        sell.setData({
          quantity : res.data
        })

      }
    })

    wx.getStorage({
      key: 'sessionkey',
      success: function (res) {
        wx.request({
          url: 'https://liangyi120.xin/user/atten',
          data: {
            session: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            //console.log(res.data)
            sell.setData({
              attention: res.data.attention,
              message: res.data.message
            })
          }
        })
       
       
      }
    })

    


    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
