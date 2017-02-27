'use strict';


(function (){
    //自动缩放屏幕大小
    var viewport = document.querySelector("meta[name='viewport']");
    viewport.parentNode.removeChild(viewport);

    //var min = Math.min(window.innerWidth,window.innerHeight);
    var min = Math.min(window.screen.width,window.screen.height);       //按长宽中较小的值缩放，以便横屏恢复时能全显示
    //alert("min="+min);
    var phoneScale = parseInt(min)/320;

    document.write('<meta name="viewport" content="width=320, initial-scale = '+phoneScale+', maximum-scale = '+phoneScale+', maximum-scale = '+phoneScale+'">');
})();

