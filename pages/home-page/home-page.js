//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    //types: [0, 1, 2, 3, 4],
    a:[],
    b: [],
    c: [],
    d: [],
    e: [],
   tabsName:"皮科疾病",
   //details:"内科迎来最年轻鲜肉医生，女患者和女医师都疯狂了",
  // Time:"2017-10-24",
  // browseInt:"3",
  // FabulousInt:"0",
  
   scrollLeft: 0, //tab标题的滚动条位置
   currentTab: 0, //预设当前项的值
   imgUrls:[],
    // imgUrls: [
    //   {
       
    //     url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'
    //   }, {
        
    //     url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'
    //   }, {
     
    //     url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'
    //   }
    // ],
    indicatorDots: true,
    autoplay: true,
 
    interval: 5000,
    duration: 500,
    userInfo: {}  
    
  },
  switchTab: function (e) {
    
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
   
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 2) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  locationClick:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name:"邯郸市丛台区政通小区",
          scale: 28
        })
      }
    })
  },
  telephoneClick:function(){
    wx.makePhoneCall({
      phoneNumber: '17611028621' //仅为示例，并非真实的电话号码
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  
  
  onLoad: function () {
   
   //请求后端数据
    var taht =this
    wx.request({
      url: 'https://liangyi120.xin/home/wenzhang', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        taht.setData({
          a:res.data.a,
          b: res.data.b,
          c: res.data.c,
          d: res.data.d,
          e: res.data.e,
          //types:res.data.type
          })
       
      }
    })

    wx.request({
      url: 'https://liangyi120.xin/home/imgUrl', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        taht.setData({
          imgUrls:res.data
        })

      }
    })


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})
