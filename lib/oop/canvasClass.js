
function canvasClass(options){
    try{
      this.elements = {};
      this.h = new helperClass();
      this.initializeOptions(options);
      this.initialize();
    }catch(err){
      debugger;
    }
  }
  
  canvasClass.prototype.constructor = canvasClass;

  /*------------------------------------------------------------------------------------------------*/

  canvasClass.prototype.initializeOptions = function(options){
    for( o in options){
      this[o] = options[o];
    }
  }
  
  canvasClass.prototype.destroy = function(){
    this.h.deleteDomElement(this.context);
    this.h.deleteDomElement(this.canvas);
    this.context = null;
    this.canvas = null;
  }
  
  canvasClass.prototype.initialize = function(){
  
    if(!this.id){
      this.id = YAHOO.util.Dom.generateId();
    }
    
    this.h.createAppendDomObject(this.h.createHookObj(this.containerId),'canvas',
                                {id:this.id, width:this.width, height:this.height });
                                
    var canvas = document.getElementById(this.id)
    
    if(this.hide){
      YAHOO.util.Dom.setStyle(this.id,"position",'absolute');
      this.h.hide(this.id, 'v');
    }
    
    if(this.height){
    YAHOO.util.Dom.setStyle(canvas,"height",this.height +"px");
    }
    
    if(this.width){
    YAHOO.util.Dom.setStyle(canvas,"width",this.width+"px");
    }
    this.h.deleteDomElement(canvas);
    canvas = null;
  }
  
  canvasClass.prototype.getId = function(){
    return this.id;
  }
  
  canvasClass.prototype.getContext = function(){
    var canvas = document.getElementById(this.id)
    var ret = canvas.getContext('2d'); 
    this.h.deleteDomElement(canvas);
    canvas = null;
    return ret;
  }
  
  /*----------------------------------------------------------------------------*/
  
  canvasClass.prototype.initifillImage =  function(src, fade, fadeTime){
    var ctx = this.getContext();
    this.img = this.h.createDomObject('img',{'src':src});
    var paramSet = {instanceObj:this, "fade" :  fade, "fadeTime":fadeTime};
    YAHOO.util.Event.addListener(this.img, 'load', this.fillImgLoad, paramSet);
  }
 
 canvasClass.prototype.changeImageSrc =  function(src){
    this.img.src = src;
 }
 
 canvasClass.prototype.fillImgLoad  = function(eventOBj, paramSet){
   if(document.readyState){
     if(paramSet.instanceObj.img.complete){
       paramSet.instanceObj.fillImgLoad_p(eventOBj, paramSet.fade, paramSet.fadeTime);
     }
   }else{
     paramSet.instanceObj.fillImgLoad_p(eventOBj, paramSet.fade, paramSet.fadeTime);
   }
 }
 
 canvasClass.prototype.fillImgLoad_p  = function(eventOBj, fade, fadeTime){
  var ctx = this.getContext();
  var dims = this.getDims()
  ctx.clearRect(0, 0, this.width, this.height);
  ctx.drawImage(this.img,dims[0],dims[1],dims[2],dims[3]);
  instanceObj = this;
  if(fade){
     instanceObj.h.fadeAnimation({run: true, seconds: fadeTime, obj:instanceObj.getId(), start:0.0, finish: 1.0, onStart: function(){
       YAHOO.util.Dom.setStyle(instanceObj.getId(),"opacity",0.0)
       instanceObj.h.show(instanceObj.getId())
    }});
  }
 }
 
  
 canvasClass.prototype.getDims =  function(img){
    var r = this.getimageRatio(this.img);
    var height = this.img.naturalHeight;
    var width =  this.img.naturalWidth;
    
    if(width>height){
      height = r*this.width;
      width = this.width;
      var y = (this.height - height)/2;
      var x = 0;
    }else{
      height = this.height;
      width = r*this.height;
      var x = (this.width - width)/2;
      var y = 0;
    }
  return [x,y,width,height]
 }
 
 canvasClass.prototype.getimageRatio =  function(img){
 
    var height = img.naturalHeight;
   var  width =  img.naturalWidth;
   if(width>height){
     return (height/width);
   }else{
     return (width/height);
   }
 }
 
 canvasClass.prototype.setText =  function(text,x,y, font,fill){
    var ctx = this.getContext();
    if(font){
      ctx.font = font;
    }
    if(fill){
      ctx.fillStyle = fill;
    }
    
    ctx.fillText(text,x,y); 
 }
  
  
  /*----------------------------------------------------------------------------*/
  /*--------get Image Data -----------------------------------------------------*/
  /*----------------------------------------------------------------------------*/
  
  
  canvasClass.prototype.getImageData_src = function(path, paramSet){
    var img = this.h.createDomObject('img', {id:YAHOO.util.Dom.generateId()});
    YAHOO.util.Event.addListener(img, 'load', this.getImageData, 
                                {instanceObj: this, element:paramSet});
    img.src = path;
   }
  
  canvasClass.prototype.getImageData = function(eventObj, paramSet){
    paramSet.instanceObj.getImageData_p(eventObj, paramSet.element);
  }

  canvasClass.prototype.getImageData_p = function(eventObj, paramSet){
      var img = YAHOO.util.Event.getTarget(eventObj);
      var context = this.getContext();
      context.drawImage(img, 0, 0, this.width, this.height);
      try{
        var imageData = context.getImageData(0, 0, this.width, this.height);
      }catch(error){
        try{
          netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
          var imageData = context.getImageData(0, 0, this.width, this.height);
        }catch(error){
          debugger;
        }
        debugger;
      }
      var data = imageData.data;
      this.h.deleteDomElement(img);
      this.h.deleteDomElement(context);
      this.h.deleteDomElement(imageData);
      imageData = null;
      context = null;
      img = null;

      if(paramSet.callBack){
        paramSet.callBack(data, paramSet);
      }
  }
  