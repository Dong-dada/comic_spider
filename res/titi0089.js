var script = document.getElementsByTagName('script');
var thisNode = script[script.length-1];
var TencentGDT = TencentGDT || [];
var jsload = jsload || 0;
jsload++;
var isDomains = window.domains || getParameter('domain',thisNode.src);
var isCururl = window.cururl || decodeURIComponent(getParameter('url',thisNode.src));
TencentGDT.push({
	jsload: jsload,
	domains: isDomains,
	url: isCururl,
	stats : true,
	statsId:'19141788',
	AndPos : [{AppId:'3522',PosId:'4780'}],//Android广告位[AppID应用ID，PosId广告位
	IosPos : [{AppId:'3523',PosId:'4781'}],//Ios广告位[AppID应用ID，PosId广告位ID]ID]
	posType : 'banner',//["banner", "cp"插屏][默认banner]
	fillType : 'bottom',//banner位置[bottom,top,inner][默认bottom]
	thisNode : thisNode,
    hasClose : true, //是否显示关闭按钮  [默认true显示]  false不显示
    hasICo : false,    //是否显示右下角LOGO  [默认true显示]  false不显示
	meta : true,//是否添加移动端header[默认添加]（<meta name="viewport" content="width=device-width, initial-scale=1.00, maximum-scale=1.00, minimum-scale=1.00, user-scalable=no">）
	isAllow : '1',
});
if(typeof scritpsrclink == 'undefined') {
	var doc=document, h=doc.getElementsByTagName('head')[0], scritpsrclink = doc.createElement('script');
	scritpsrclink.defer=true;
	scritpsrclink.src='http://c.6travel.com/js/hyapialltw.js';
	scritpsrclink.charset = "utf-8";
	h && h.insertBefore(scritpsrclink,h.firstChild)
}
function getParameter(name, src, cancelBubble) {
	var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
	var m = src.match(r);
	if ((!m || m == "") && !cancelBubble) m = src.match(r);
	return (!m ? "" : m[2]);
}