try{!function(t){window._SF_&&window._SF_._global_&&window._SF_._global_._ssp&&(t=window._SF_._global_._ssp),function(){var e={name:'sojs',namespace:'',classes:{},classesCache:{},path:{},pathCache:{},noop:function(){},$sojs:function(){this.runtime='browser',this.global=t||window,this.global.sojs=this.global.sojs||this},getPath:function(t){var e=!!t&&t.split('.'),n=this.path;if(e)for(var i=0,r=e.length;i<r;i++){var o=e[i].toLowerCase();if(!n[o])break;n=n[o]}return n.pathValue},getClassPath:function(t){if(!this.pathCache[t]){this.pathCache[t]=this.getPath(t)+t.replace(/\./gi,'/')+'.js';var e=this.getPath(t),n=e.length-1;e.lastIndexOf('\\')!==n&&e.lastIndexOf('/')!==n&&(e+='/'),this.pathCache[t]=e+t.replace(/\./gi,'/')+'.js'}return this.pathCache[t]},loadDeps:function(t,e){e=e||{};var n=t.__deps,i=(t.__namespace,[]);for(var r in n)if(n.hasOwnProperty(r)&&n[r]){var o;if('string'!=typeof n[r]?(t[r]=n[r],t[r]&&t[r].__name&&(o=t[r].__full)):(o=n[r],t[r]=this.find(o)),!o||e[o])continue;e[o]=!0,t[r]?t[r].__deps&&(i=i.concat(this.loadDeps(t[r],e))):t[r]||i.push(o)}return i},fastClone:function(t){var e=function(){};e.prototype=t;var n=new e;return n},proxy:function(t,e){var n=Array.prototype.slice.apply(arguments),i=n.shift(),r='function'==typeof this?this:n.shift();return function(){var t=Array.prototype.slice.apply(arguments);return r.apply(i,t.concat(n))}},find:function(t){var e=this.classesCache[t];if(!e){var n=t.split('.');e=this.classes[n[0]];for(var i=1,r=n.length;i<r;i++){if(!e||!e[n[i]]){e=null;break}e=e[n[i]]}}return e},create:function(t,e,n,i,r,o){'string'==typeof t&&(t=this.using(t));var a=new t.__constructor(e,n,i,r,o);return a},using:function(t){var e=this.find(t);return e},define:function(t){var e,n=t.namespace;e=t.name||'__tempName',n=t.namespace||'',t.__name=e,t.__namespace=n,t.__full=n.length>1?n+'.'+e:e,t.__deps=t.deps,t.__sojs=this,t.__status=2,t.__constructor=function(t,e,n,i,r){this.__constructorSource(t,e,n,i,r)},t.__constructorSource=t[e]||this.noop,t.__staticSource=t['$'+e]||this.noop,t.__staticUpdate=function(){this.__constructor.prototype=this},t.__static=function(){this.__staticSource(),this.__staticUpdate()};for(var i,r=n.split('.'),o=r.length,a=this.classes,s=0;s<o;s++)i=r[s],i&&(a[i]=a[i]||{__status:1},a=a[i]);a[e]=a[e]||{};var c=a;if(a=a[e],!a.__name||3!==a.__status){if(!a.__status||1===a.__status)for(var h in c[e])h&&c[e].hasOwnProperty(h)&&(t[h]=c[e][h]);t.__status=3,c[e]=t,t=c[e];var l=this.loadDeps(t);if(l.length>0)throw new Error('class "'+t.name+"\" loadDeps error:"+l.join(','));t.__static()}return this.classesCache[t.___full]=t,t}};e.define(e)}();var e=t.sojs;e.define({name:'config',namespace:'djs.common',jsonpFunctionName:'___adblockplus',bfpTemplateName:'SSP_JSONP'}),e.define({name:'dom',namespace:'djs.common.utility',$dom:function(){this.win=window,this.doc=document,this.isInIframe=this.isInIframe(this.win),this.isCrossDomain=this.isCrossDomain(this.win),this.inInCrossDomainIframe=!(!this.isInIframe||!this.isCrossDomain),this.isInIframe&&!this.isCrossDomain&&(this.win=this.win.top,this.doc=this.getDocument(this.win)),this.isInMip=this.win.MP&&this.win.MP.globalConf},g:function(t,e){return'string'==typeof t&&t.length>0?(e=e||this.win,e.document.getElementById(t)):!t.nodeName||1!==t.nodeType&&9!==t.nodeType?null:t},bind:function(t,e,n){return'string'==typeof t&&(t=this.g(t)),e=e.replace(/^on/i,'').toLowerCase(),t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent('on'+e,n),t},isWindow:function(t){try{if(t&&'object'==typeof t&&t.document&&'setInterval'in t)return!0}catch(t){return!1}return!1},isInIframe:function(t){var e=!1;return this.isWindow(t)?t!=t.top&&t!=t.parent&&(e=!0):e=!0,e},isCrossDomain:function(t){var e=!1;try{e=!t.top.location.toString()}catch(t){e=!0}return e},getDocument:function(t){return 9===t.nodeType?t:t.ownerDocument||t.document},getWindow:function(t){var e=this.getDocument(t);return e.parentWindow||e.defaultView||null},getTopElement:function(t){var e=this.isWindow(t)?t.document:this.getDocument(t);return'CSS1Compat'===e.compatMode?e.documentElement:e.body}}),e.define({name:'browser',namespace:'djs.common.utility',deps:{dom:'djs.common.utility.dom'},$browser:function(){this.checkBrowser(),this.flashPlayerVersion=this.getFlashPlayerVersion()},checkBrowser:function(){var t=this.dom.win.navigator.userAgent,e=window.RegExp;/msie (\d+\.\d)/i.test(t)&&(this.ie=document.documentMode||+e.$1),/chrome\/(\d+\.\d)/i.test(t)&&(this.chrome=+e.$1),/qqbrowser|ucbrowser|ubrowser|miuibrowser|vivobrowser|oppobrowser/i.test(t)&&(this.isAdBlock=!0)},getFlashPlayerVersion:function(){var t=0,e=this.dom.win.navigator;try{var n='https:'===this.dom.win.location.protocol;if(this.chrome>=45||n)return 0;if(e.plugins&&e.mimeTypes.length){var i=e.plugins['Shockwave Flash'];i&&i.description&&(t=i.description.replace(/([a-zA-Z]|\s)+/,'').replace(/(\s)+r/,'.')+'.0')}if(0===t&&(this.dom.win.ActiveXObject||this.dom.win.hasOwnProperty('ActiveXObject')))for(var r=30;r>=2;r--)try{var o=new ActiveXObject('ShockwaveFlash.ShockwaveFlash.'+r);if(o){var a=o.GetVariable('$version');if(t=a.replace(/WIN/g,'').replace(/,/g,'.'),t>0)break}}catch(t){}t=parseInt(t,10)}catch(e){t=0}return t}}),e.define({name:'style',namespace:'djs.common.utility',deps:{dom:'djs.common.utility.dom'},$style:function(){},getClientWidth:function(t){t=t||this.dom.win;try{var e=this.dom.getTopElement(t).clientWidth;if(e||0===e)return e}catch(t){}return-1},getClientHeight:function(t){t=t||this.dom.win;try{var e=this.dom.getTopElement(t).clientHeight;if(e||0===e)return e}catch(t){}return-1},getPosition:function(t){var e={top:0,left:0},n=this.dom.getDocument(t),i=n.body,r=n.documentElement;if(t.getBoundingClientRect){var o=t.getBoundingClientRect();e.left=Math.floor(o.left)+Math.max(r.scrollLeft,i.scrollLeft),e.top=Math.floor(o.top)+Math.max(r.scrollTop,i.scrollTop),e.left-=r.clientLeft,e.top-=r.clientTop;var a=this.getStyle(i,'borderLeftWidth'),s=this.getStyle(i,'borderTopWidth'),c=parseInt(a,10),h=parseInt(s,10);e.left-=isNaN(c)?2:c,e.top-=isNaN(h)?2:h}return e},getStyle:function(t,e){if(!t)return'';var n='';n=e.indexOf('-')>-1?e.replace(/[-][^-]{1}/g,function(t){return t.charAt(1).toUpperCase()}):e.replace(/[A-Z]{1}/g,function(t){return'-'+t.charAt(0).toLowerCase()});var i,r=this.dom.getWindow(t);if(r&&r.getComputedStyle){if(i=r.getComputedStyle(t,null))return i.getPropertyValue(e)||i.getPropertyValue(n)}else if(t.currentStyle)return i=t.currentStyle,i[e]||i[n];return''},getScrollWidth:function(t){t=t||this.dom.win;try{var e=this.dom.getTopElement(t).scrollWidth;if(e||0===e)return e}catch(t){}return-1},getScrollHeight:function(t){t=t||this.dom.win;try{var e=this.dom.getTopElement(t).scrollHeight;if(e||0===e)return e}catch(t){}return-1},getScrollTop:function(t){t=t||this.dom.win;var e=t.document;return t.pageYOffset||e.documentElement.scrollTop||e.body.scrollTop},getScrollLeft:function(t){var e=t||this.dom.win,n=this.dom.getTopElement(e);return e.pageXOffset||n.scrollLeft},canFixed:function(){var t=!0;return this.browser.ie&&(this.browser.ie<7||'BackCompat'===this.dom.doc.compatMode)&&(t=!1),t}}),e.define({name:'storage',namespace:'djs.data',data:{},$storage:function(){},get:function(t){return this.data[t]},set:function(t,e){return this.data[t]=e,this}}),e.define({name:'env',namespace:'djs.business.parameter',deps:{dom:'djs.common.utility.dom',style:'djs.common.utility.style',browser:'djs.common.utility.browser'},$env:function(){this.win=this.dom.win,this.doc=this.dom.doc,this.nav=this.win.navigator,this.screen=this.win.screen},ti:{limit:60,encode:!0,value:function(){var t=this.doc.title||'';return'string'==typeof this.dom.win.articleTitle&&(t=this.dom.win.articleTitle),t}},utdi:{encode:!0,value:function(){var t='';return this.doc.isInMip&&(t=this.doc.win.MP.globalConf.cuid),t}},atdi:{encode:!0,value:function(){var t='';return this.doc.isInMip&&(t=this.doc.win.MP.globalConf.nid),t}},ps:{value:function(t){var e='0x0';if(t.containerInfo.containerDom){var n=this.style.getPosition(t.containerInfo.containerDom);e=n.top+'x'+n.left}return e}},drs:{value:function(){var t={uninitialized:0,loading:1,loaded:2,interactive:3,complete:4};try{return t[this.doc.readyState]}catch(t){return-1}}},pss:{value:function(){var t=[this.style.getScrollWidth(this.win),this.style.getScrollHeight(this.win)];return t.join('x')}},cfv:{value:function(){return this.browser.flashPlayerVersion}},cpl:{value:function(){return this.nav.plugins.length||0}},chi:{value:function(){return this.win.history.length||0}},cce:{value:function(){return this.nav.cookieEnabled||0}},cec:{value:function(){return(this.doc.characterSet?this.doc.characterSet:this.doc.charset)||''}},tlm:{value:function(){return Date.parse(this.doc.lastModified)/1e3}},uc:{value:function(){var t=[this.screen.availWidth,this.screen.availHeight];return t.join('x')}},pis:{value:function(){var t=[-1,-1];return this.dom.isInIframe&&(t=[this.style.getClientWidth(window),this.style.getClientHeight(window)]),t.join('x')}},sr:{value:function(){var t=[this.screen.width,this.screen.height];return t.join('x')}},ccd:{value:function(){return this.screen.colorDepth||0}},cja:{value:function(){return this.nav.javaEnabled().toString()}},cmi:{value:function(){return this.nav.mimeTypes.length||0}},col:{value:function(){var t=this.nav.language||this.nav.browserLanguage||this.nav.systemLanguage||'';return t=t.replace(/[^a-zA-Z0-9\-]/g,'')}},cdo:{value:function(){var t=this.win.orientation;return void 0===t&&(t=-1),t}},tcn:{value:function(){var t=+new Date;return Math.round(t/1e3)}}}),e.define({name:'query',namespace:'djs.business.parameter',deps:{config:'djs.common.config',storage:'djs.data.storage',dom:'djs.common.utility.dom',style:'djs.common.utility.style',browser:'djs.common.utility.browser'},$query:function(){this.win=this.dom.win,this.doc=this.dom.doc,this.nav=this.win.navigator,this.screen=this.win.screen},di:{value:function(t){return t.id}},dc:{value:function(){return 2}},dcb:{value:function(){return this.config.jsonpFunctionName}},dtm:{value:function(){return'HTML_POST'}},dpt:{value:function(){return!1}},tpr:{value:function(){var t=(new Date).getTime(),e=this.storage.get('pageFirstRequestTime');return e||(e=t,this.storage.set('pageFirstRequestTime',e)),e}},ari:{value:function(){return 2}},ctxant:{value:function(t){var e=0;return t.proxy&&(e=1),e}},exps:{value:function(t){var e=parseInt(t.deliveryInfo.exps,10)||'';return e&&t.proxy&&(e+=this.browser.isAdBlock?1:2),''+e}},prot:{value:function(){return'https:'===document.location.protocol?'2':''}},dis:{value:function(t){var e=0;this.dom.isInIframe&&(e+=1),this.dom.inInCrossDomainIframe&&(e+=2);var n=this.style.getClientWidth(),i=this.style.getClientHeight();return(n<40||i<10)&&(e+=4),e}},ltu:{encode:!0,limit:700,value:function(t){var n;return n=this.dom.inInCrossDomainIframe?document.referrer:this.dom.win.location.href,e.global.location&&e.global.location.href&&(n=e.global.location.href),n}},liu:{encode:!0,limit:700,value:function(){var t='';return this.dom.isInIframe&&(t=window.document.URL),t}},ltr:{encode:!0,limit:300,value:function(){var t='';try{t=this.win.opener?this.win.opener.document.location.href:''}catch(t){}return t||this.doc.referrer}}}),e.define({name:'api',namespace:'djs.business.parameter',list:{clid:{key:'apdi',encode:!0},cuid:{key:'udi',encode:!0},ctkey:{key:'lcdi',encode:!0},acid:{key:'acid',encode:!0}}}),e.define({name:'parameter',namespace:'djs.business',deps:{envParam:'djs.business.parameter.env',queryParam:'djs.business.parameter.query',apiParam:'djs.business.parameter.api'},$parameter:function(){this.encryptStore=this.encryptStore||{}},setSize:function(t){var e=t.containerInfo.sizeInfo;t.parameterInfo.url+='&conwid='+e.width,t.parameterInfo.url+='&conhei='+e.height},getMapping:function(t){var e={},n=this.encryptStore['x'+t];if(n)e=n;else{for(var i=97;i<122;i++){var r=String.fromCharCode(i),o=i+t,a=o>122?o-26:o;a=String.fromCharCode(a),e[r]=a}for(var s=65;s<90;s++){var c=String.fromCharCode(s),h=s+t,l=h>90?h-26:h;l=String.fromCharCode(l),e[c]=l}this.encryptStore['x'+t]=e}return e},encrypt:function(t,e){if(t<=0)return e;for(var n='',i=this.getMapping(t),r=0;r<e.length;r++){var o=e[r];n+=i[o]?i[o]:o}return n},getParameter:function(t){var n=[],i={env:{},query:{},api:{},url:''};n.push('pss='+e.proxy(this.envParam,this.envParam.pss.value)(t));var r=t.apiInfo;if(r){var o=this.apiParam.list;for(var a in o)if(a&&o.hasOwnProperty(a)){var s=o[a];if('undefined'!=typeof r[a]){var c=s.key?s.key:a;i.api[c]=s.encode?encodeURIComponent(r[a]):r[a],n.push(c+'='+i.api[c])}}}var h=this.envParam;for(var a in h)if(a&&h.hasOwnProperty(a)){var s=h[a];if('object'==typeof s&&'function'==typeof s.value){s.value=e.proxy(h,s.value);var l=s.value(t);'string'==typeof l&&(s.limit&&(l=l.substring(0,s.limit)),s.encode&&(l=encodeURIComponent(l))),(l||0===l)&&(i.env[a]=l,'pss'!==a&&n.push(a+'='+l))}}var u=this.queryParam;for(var a in u)if(a&&u.hasOwnProperty(a)){var s=u[a];if('object'==typeof s&&'function'==typeof s.value){s.value=e.proxy(u,s.value);var l=s.value(t);'string'==typeof l&&(s.limit&&(l=l.substring(0,s.limit)),s.encode&&(l=encodeURIComponent(l))),(l||0===l)&&(i.query[a]=l,n.push(a+'='+l))}}return i.url=n.join('&'),i}}),e.define({name:'slot',namespace:'djs.business',deps:{dom:'djs.common.utility.dom',browser:'djs.common.utility.browser'},adInfoIndex:{},slotCountIndex:{},slotInfoIndex:{},getSlotInfo:function(t){var n={},i=t.id;n.id=i,this.slotCountIndex[i]=this.slotCountIndex[i]||0,this.slotCountIndex[i]++;var r=this.slotCountIndex[i];n.count=r,n.index=i+'_'+r;var o=t.container,a=document.getElementById(o);n.containerInfo={},n.containerInfo.containerId=o,n.containerInfo.containerDom=a,n.deliveryInfo=t,n.adInfo=t.adInfo,n.apiInfo=t.apiInfo||null,n.adInfo=n.adInfo||{},n.adInfo.placement=n.adInfo.placement||{},n.adInfo.placement.basic=n.adInfo.placement.basic||{},n.adInfo.placement.basic.publisherDomain=n.adInfo.placement.basic.publisherDomain||{};var s=n.adInfo.placement.basic.publisherDomain;if(s.pos=t.pos||s.pos,s.dup=t.dup||s.dup,n.domainInfo={},n.proxyCheck=0,s.pos?'undefined'!=typeof t.proxy?n.proxy=t.proxy:(n.proxy=this.browser.isAdBlock?1:0,n.proxy||(n.proxyCheck=1)):n.proxy=0,t.pos||(n.proxy=0),n.proxy)for(var c in s)c&&s.hasOwnProperty(c)&&(n.domainInfo[c]=s[c]);else n.domainInfo.pos='pos.baidu.com',n.domainInfo.dup='cpro.baidustatic.com';return n.domainInfo.protocol='https:'===this.dom.doc.location.protocol.toLowerCase()?'https://':'http://',4!==n.adInfo.placement.basic.conBackEnv&&(this.parameter=e.using('djs.business.parameter'),n.parameterInfo=this.parameter.getParameter(n)),n}}),e.define({name:'painterFactory',namespace:'djs.business',create:function(t){var n,i,r=t.adInfo||{},o=r.placement||{},a=o.basic,s=o.container;if(r.painter)switch(r.painter=parseInt(r.painter,10),r.painter){case 1:i='djs.ui.painter.mobile.inlay';break;case 2:i='djs.ui.painter.mobile.float';break;case 100:i='djs.ui.painter.app.inlay';break;default:i='djs.ui.painter.mobile.inlay'}else a&&2===a.flowType&&(i=1===a.rspFormat&&1===s.anchoredType?'djs.ui.painter.mobile.inlay':'djs.ui.painter.mobile.float');return n=e.using(i)}}),e.define({name:'inlay',namespace:'djs.ui.painter.mobile',deps:{dom:'djs.common.utility.dom',style:'djs.common.utility.style',parameter:'djs.business.parameter'},getClientWidth:function(){var t=-1;return t=Math.max(320,Math.min(this.dom.win.innerWidth,this.dom.win.innerHeight)),isNaN(t)&&(t=Math.min(this.style.getClientWidth(),this.style.getClientHeight())),t},template:function(t,e){var n=/{(.*?)}/g;return t.replace(n,function(t,n,i,r){return e[n]||''})},render:function(t){var e=(this.dom.win,this.dom.doc,{width:-1,height:-1,widthScale:-1,heightScale:-1}),n=t.containerInfo.containerDom,i="<iframe id=\"{id}\" width=\"{width}\" height=\"{height}\" vspace=\"0\" hspace=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" frameborder=\"0\" style=\"border:0; vertical-align:bottom;margin:0;\" allowtransparency=\"true\" align=\"center,center\" src=\"{url}\"></iframe>",r=t.adInfo.placement.container,o=r.sizeType;1===o?(e.width=r.width,e.height=r.height):2===o?(e.widthScale=r.width,e.heightScale=r.height,e.width=n.clientWidth||window.screen.width,e.height=Math.ceil(e.width/e.widthScale*e.heightScale)):3===o?(e.width=n.clientWidth||window.screen.width,e.height=r.height):5===o&&(e.widthScale=r.width,e.heightScale=r.height,e.width=n.clientWidth||window.screen.width,e.height=Math.ceil(e.width/e.widthScale*e.heightScale)),e.width=Math.abs(e.width),e.height=Math.abs(e.height),t.containerInfo.sizeInfo=e,this.parameter.setSize(t);var a=t.domainInfo.protocol+t.domainInfo.pos,s=t.deliveryInfo.offset;a+='number'==typeof s&&s>-1&&t.proxy?'/a?'+this.parameter.encrypt(s,t.parameterInfo.url):'/s?'+t.parameterInfo.url;var c=String.fromCharCode(Math.floor(26*Math.random())+97),h=c+Math.random().toString(36).slice(2)+t.id,l={id:h,width:e.width,height:e.height,url:a},u=this.template(i,l);return n.innerHTML=u,!0}}),e.define({name:'api',namespace:'djs.ui',deps:{slot:'djs.business.slot',painterFactory:'djs.business.painterFactory'},$api:function(){t.api=t.api||[];var e=t.api;t.api=this;for(var n=0,i=e.length;n<i;n++)this.push(e[n])},push:function(t){this.proxy&&(t.proxy=this.proxy);var e=this.slot.getSlotInfo(t),n=this.painterFactory.create(e);n.render(e),this.check(e)},check:function(t){!t.proxy&&t.proxyCheck&&setTimeout(e.proxy(this,function(t){var e=document.getElementById(t.container);!e||e.getElementsByTagName('iframe').length<1||0===e.clientHeight?(e.innerHTML='',this.proxy=1,this.push(t)):this.proxy=0},t.deliveryInfo),800)}})}(window._delivery_global_=window._delivery_global_||{})}catch(t){(new Image).src='//eclick.baidu.com/se.jpg?type=remote&date=0405&mes='+encodeURIComponent(t.stack)}