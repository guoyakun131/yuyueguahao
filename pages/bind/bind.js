
var codevalue;
var phonevalue;
Page({
  data: {
    button:"btn",
    logs: []
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
  onLoad:function(){
    
  },
  
  inputuserName: function (ev) {
    var data = ev.detail.value;

  },
  
  
})