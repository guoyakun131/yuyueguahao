//logs.js
var WxParse = require('../wxParse/wxParse.js');
const util = require('../../utils/util.js')

Page({
  data: {
    eid: 0,
    img:'',
    name: '',
    position: '',
    expertProfile: '',
    location: '',
    amount: '',
    location: '',
    locations: '',
    kanzhenshijian: '',
    logs: []
    //profiles:''
  },
  inputuserName: function (ev) {
    var data = ev.detail.value;

  },


  /* 微信支付 */
  wxpay: function () {
    var that = this
    wx.getStorage({
      key: 'sessionkey',
      success: function (res) {
        that.getOpenId(res.data);

      }
    })
    // wx.request({
    //   url: 'https://liangyi120.xin/',
    // })
  },
  getOpenId: function (session) {
    var that = this;
    wx.request({
      url: "https://qubing.net.cn/pay/openid",
      data: {
        session: session
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('返回openId')
        console.log(res.data)
        that.generateOrder(res)
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  },

  generateOrder: function (openid) {
    console.log(openid)
    var that = this;
    var eids = that.data.eid
    wx.request({
      url: 'https://qubing.net.cn/pay/order',
      data: {
        openid: openid.data,
        id: eids
      },
      method: 'GET',
      success: function (res) {
        console.log("prepay_id" + res.data);
        that.doWxPay(res);
      }
    })
  },

  doWxPay(param) {
    console.log(param.data.package)
    //小程序发起微信支付
    wx.requestPayment({
      timeStamp: param.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错，我这边在java后端包装成了字符串类型了
      nonceStr: param.data.nonceStr,
      package: param.data.package,
      signType: 'MD5',
      paySign: param.data.paySign,
      success: function (event) {
        // success   
        console.log(event);
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (error) {
        // fail   
        console.log("支付失败")
        wx.showToast({
          title: '支付失败',
          icon: 'success',
          duration: 2000
        });
        console.log(error)
      },
      complete: function () {
        // complete   
        console.log("pay complete")
      }
    });
  },



  onLoad: function (options) {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      name: options.name
    })
    var that = this
    wx.request({
      url: 'https://qubing.net.cn/experts/name',
      data: {
        name: options.name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        var profiles = res.data.profiles
        WxParse.wxParse('article', 'html', profiles, that, 5);
        that.setData({
          eid: res.data.id,
          img:res.data.img,
          position: res.data.position,
          expertProfile: res.data.profile,
          location: res.data.location,
          amount: res.data.amount,
          locations: res.data.locations,
          kanzhenshijian: res.data.kanzhenshijian,
          //profiles: res.data.profiles
        })
      }

    })

  },

})