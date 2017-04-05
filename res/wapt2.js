

  var sUserAgent= navigator.userAgent.toLowerCase();
    var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp= sUserAgent.match(/midp/i) == "midp";
    var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid= sUserAgent.match(/android/i) == "android";
    var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";
if(bIsIphoneOs || bIsIpad){
//在iOS  pad 显示广告
document.writeln("<script type=\'text/javascript\' src=\'http://j.12365chia.com/jquery.js\'></script>");
document.writeln("<div id=\'lts-rotation\' class=\'owl-carousel owl-theme\'></div>");
document.writeln("<script type=\'text/javascript\'>var LTSMindZoneid = 1385 ;</script>");
document.writeln("<script type=\'text/javascript\' src=\'http://j.12365chia.com/js/rotation.js\'></script>");
   }
else
{  
//android 显示广告
document.writeln("<div id=\'aikanman_320_50_a\' style=\'width:320px;height:50px;\'><script type=\'text/javascript\' src=\'http://pmp.adinall.com/aikanman_320_50_a.js\'></script></div>");
}
