window.onload = function(){

  var i = 8;
  var orderset20 =  [2, 10, 11, 12, 13, 14, 9, 8, 7, 3, 15, 16, 17, 18, 19, 20, 6, 5, 4, 1 ];
  var orderset15 =  [2, 8, 9, 10, 11, 7, 6, 3, 12, 13, 14, 15, 5, 4, 1];
  var textList =  ["item_0","item_1"];
 
  var h = new helperClass();
  
  h.hide("page")
  h.show(textList[0])
  
  new slideShowClass({fade:true,
                      fadeTime:1.5,
                      initInterval:i,
                      interval: i*2,
                      'textList': textList, 
                      onCompleteDelay:i/2,
                      onComplete: function(){ 
                        new slideShowClass({containerId: 'container',
                                            indexId: 'index',
                                            pbtnId:'pausebtn',
                                            fade:true,
                                            fadeTime:1.5,
                                            width:760, 
                                            height:570, 
                                            initInterval:i,
                                            interval: i,
                                            orderSet: orderset20,
                                            playBtnImage: 'lib/ui_images/play_b.png',
                                            pauseBtnImage: 'lib/ui_images/p_b.png',
                                            imagePrefix: 'https://raw.githubusercontent.com/flyingdeath/slide-show/gh-pages/lib/images/_',
                                            imageExt: 'JPG',
                                            title: ' <br/>Relefections By, <br/>'
                                            });
                      
                      }
                      });
  
                      
  YAHOO.util.Event.onContentReady('page',function(){
    h.fadeAnimation({run: true, seconds: 5.0, obj:"page", start:0.0, finish: 1.0,
                     onStart: function(){
                       YAHOO.util.Dom.setStyle("page","opacity",parseInt(0));
                       h.show("page")
                    }});
  });
  
}
