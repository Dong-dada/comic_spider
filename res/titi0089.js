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
	AndPos : [{AppId:'3522',PosId:'4780'}],//Android���λ[AppIDӦ��ID��PosId���λ
	IosPos : [{AppId:'3523',PosId:'4781'}],//Ios���λ[AppIDӦ��ID��PosId���λID]ID]
	posType : 'banner',//["banner", "cp"����][Ĭ��banner]
	fillType : 'bottom',//bannerλ��[bottom,top,inner][Ĭ��bottom]
	thisNode : thisNode,
    hasClose : true, //�Ƿ���ʾ�رհ�ť  [Ĭ��true��ʾ]  false����ʾ
    hasICo : false,    //�Ƿ���ʾ���½�LOGO  [Ĭ��true��ʾ]  false����ʾ
	meta : true,//�Ƿ�����ƶ���header[Ĭ�����]��<meta name="viewport" content="width=device-width, initial-scale=1.00, maximum-scale=1.00, minimum-scale=1.00, user-scalable=no">��
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