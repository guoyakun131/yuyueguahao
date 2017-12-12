Page({
  data: {
    cancel:'取消预约',
    logs: [],
   myReservation:[],
   myReservationAchieve:[],
    leftContont:"textContontgreen",
    rightContont:"textContontgray",
    make:"show",
    complate:"hide"
  
  },
  makeclick:function(){
    this.setData({
      
            
      leftContont: "textContontgreen",
      rightContont: "textContontgray",
      make:"show",
      complate:"hide"         
    })
  },
  comclick:function(){
    this.setData({
     
      leftContont: "textContontgray",
      rightContont: "textContontgreen",
      make: "hide",
      complate: "show"
    })
  },
  
onLoad: function () {
    var that = this;

    wx.getStorage({
      key: 'sessionkey',
      success: function (res) {
        wx.request({
          url: 'https://liangyi120.xin/user/myReservation',
          data: {
            session: res.data
          },
          header: {
            'content-type': 'application/json' // 
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              myReservation: res.data
              //myReservationAchieve: res.data.myReservationAchieve
          })
          }
        })

        wx.request({
          url: 'https://liangyi120.xin/user/myReservationAchieve',
          data: {
            session: res.data
          },
          header: {
            'content-type': 'application/json' // 
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              myReservationAchieve: res.data
              
            })
          }
        })

      }
    })

  },
  
 
cancel: function (event){
  console.log(event.target.dataset.id)
 var that = this;
   wx.getStorage({
     key: 'sessionkey',
     success: function (res) {
       wx.request({
         url: 'https://liangyi120.xin/user/cancel',
         data: {
           session: res.data,
           e_id: event.target.dataset.id
         },
         header: {
           'content-type': 'application/json' // 默认值
         },
         success: function (res) {  
            that.setData({
               cancel: res.data
             })  
            
         }
       })

     }
   })
 }
})
