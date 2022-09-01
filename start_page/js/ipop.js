/***************************************************************************
* iPop: Automatic Image Popup
* Copyright (c) 2003-2006 by David Schontzler | www.stilleye.com
* Use allowed under the Academic Free License 2.1
*  http://opensource.org/licenses/afl-2.1.php
* Description:  Automate your image popup windows (centered and sized)
* Compatibility: Win/IE5+, Mozilla/Netscape, degrades otherwise
***************************************************************************
* Version: 2.7 + AutoApply 1.0
***************************************************************************/

///////////////// USER SETTINGS /////////////////
// Set the target for browsers that don't support the script.  By default,
// target is "_self" which will open in the same window as the link.  Change
// it to whatever target you like.  The built in targets (_blank, _self,
// _top, and _parent) are supported.
iPop.DegradeTarget = "_self";

// Set this to true if you want to be able to click on the image to close
// the popup window
iPop.ClickImageToClose = true;

// Set this to true if you want to close the last open popup image when you click
// on a new popup (like window reuse)
iPop.CloseOpenWindows = true;

// Messages displayed, you can customize them for your own language or wording
iPop.Messages = {
	loading: "Caricamento immagine.",
	loadingSub: "Un attimo di attesa...",

	errorLoading: "Immagine non trovata.",
	errorLoadingSub: "Impossibile caricare l'immagine.",
	errorLoadingClose: "Chiudi la finestra",

	noResize: "Immagine caricata.",
	noResizeSub: "Il tuo browser non consente il ridimensionamento della finestra.",
	noResizeView: "Visualizza l'immagine",

	imageCloseTip: "Clicca per chiudere la finestra"
};

///////////////// FUNCTIONALITY /////////////////
/////////////////  DO NOT EDIT  /////////////////
iPop.Version = 2.7;
iPop.imgWin = null;
iPop.ieSp2 = (navigator.appName.toLowerCase().indexOf("internet explorer") > -1
	&& navigator.appMinorVersion.toLowerCase().indexOf("sp2") > -1);

function iPop(img, imgTitle) {

	function degrade() {
		switch(iPop.DegradeTarget) {
			case "_blank" : open(img); break;
			case "_self" : location = img; break;
			case "_top" : top.location = img; break;
			case "_parent" : parent.location = img; break;
			default : open(img, iPop.DegradeTarget);
		}
		return false;
	}
	
	// just follow the link in browsers that do not support images or the DOM
	// or launch in specified target if that's what you wanted it to do
	if(!document.images || !document.getElementById) { return degrade(); }
	
	// check to close open popups (if set to do so)
	if(iPop.CloseOpenWindows && iPop.imgWin) {
		if(iPop.imgWin.close) { iPop.imgWin.close(); }
		iPop.imgWin = null;
	}
	
	// initial (small) window with loading screen
	var width = 200, height = 150;
	if(iPop.ieSp2) { height += 20; }
	var left = (screen.availWidth - width)/2, top = (screen.availHeight - height)/ 2;
	var imgWin = window.open("about:blank", "", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
	// when moz disables all popups, imgWin will be false
	if(!imgWin) { return degrade(); }
	
	// user can pass an image title if they wish.  by default,
	// window title will display: "Image (img source)"
	imgTitle = imgTitle || "Image (" + img + ")";
	
	// before the script is loaded, at least in Win/IE when doing local testing;
	// timeout should (presumably) prevent that
	var html = '<!--\niPop Script (http://stilleye.com/projects/dhtml/iPop/)'
		+ '\niPop.Version = ' + iPop.Version + '\n-->'
		+ '\n<html><head><title>Loading</title>'
		+ '\n<script type="text/javascript">\nvar _e = null;'
		+ '\nvar ip = window.opener.iPop;'
		+ '\nvar _pageLoaded = false;'
		+ '\nvar _title = "' + imgTitle + '"'
		+ '\nonload = function(e) { _pageLoaded = true; }'
		+ '\nfunction imgLoad(e) { ip.ImageLoaded(e, window); }'
		+ '\nfunction imgError(e) { ip.ErrorLoading(e, window); }'
		+ '\nimgShow = ip.ImageShow;'
		+ '\nimgManualPopup = ip.ImageLoadedManualPopup;'
		+ '\n</script>'
		+ '\n<style type="text/css">'
		+ '\nhtml, body { font : 12px Arial; margin : 0; overflow : hidden; } h1 { font-size : 1.5em; }'
		+ '\n h2 { font-size : 1.2em; } a { color : blue; } img { visibility: hidden; border-color : black; }'
		+ '\n .message { position : absolute; left : 0px; top : 0px; width : 150px; height : 100px; background : white; text-align : center; }'
		+ '\n .message .main-message { font-weight : bold; display : block; }'
		+ '\n .message .secondary-message { color : #999; font-size : 11px; }'
		+ '\n .main-message.loading { margin-top : 35px; } .main-message.loaded { margin-top : 33px; } .main-message.error { margin-top : 25px; }'
		+ '\n #loading { z-index : 50; } #resize { z-index : 30; } #error { z-index : 40; }'
		+ '\n #image { position : absolute; left : 0px; top : 0px; width : 100%; height : 100%; z-index : 20; padding : 10px; background : white; }'
		+ '\n</style>'
		+ '\n</head>\n<body>'
		+ '\n<div id="loading" class="message"><span class="main-message loading">'
		+ iPop.Messages.loading
		+ '</span> <span class="secondary-message">'
		+ iPop.Messages.loadingSub
		+ '</span></div>'
		+ '\n<div id="error" class="message"><span class="main-message error">'
		+ iPop.Messages.errorLoading
		+ '</span> <span class="secondary-message">'
		+ iPop.Messages.errorLoadingSub
		+ '<br><a href="javascript:window.close()">'
		+ iPop.Messages.errorLoadingClose
		+ '</a></span></div>'
		+ '\n<div id="resize" class="message"><span class="main-message error">'
		+ iPop.Messages.noResize
		+ '</span> <span class="secondary-message">'
		+ iPop.Messages.noResizeSub
		+ '<br><a href="javascript:imgManualPopup(_e, window)">'
		+ iPop.Messages.noResizeView
		+ '</a></span></div>'
		+ '\n<div id="image">';
	if(iPop.ClickImageToClose) {
			html += '\n<a href="javascript:window.close()" title="'
			+ iPop.Messages.imageCloseTip
			+ '">';
	}
	html += '\n<img src="' + img + '" id="theImg" border="1" onload="imgLoad(this)" onerror="imgError(this)">';
	if(iPop.ClickImageToClose) { html += '</a>'; }
	html += '\n</div>'
		+ '\n</body></html>';
	
	imgWin.document.open();
	imgWin.document.write(html);
	imgWin.document.close();
	
	iPop.imgWin = imgWin;
	
	return false;
}

iPop.ImageLoaded = function(e, win) {
	if(!e || !win) { return; }
	e.onload = null;
	e.onerror = null;
	if(win._pageLoaded) {
		function show() {
			win.imgShow(e, win);
		}
		win.setTimeout(show, 100);
	} else {
		function noShow() {
			win.imgLoad(e, win);
		}
		win.setTimeout(noShow, 100);
	}
}

iPop.ImageShow = function(e, win) {
	if(!e || !win) { return; }
	e.onload = null; e.onerror = null;
	
	var doc = win.document;
	var width = e.width + 30,
		height = e.height + 80;
	if(iPop.ieSp2 || (win.statusbar && win.statusbar.visible)) { height += 20; }

	var tooLarge = false;
	
	if(width > screen.availWidth) {
		width = screen.availWidth - 20;
		tooLarge = true;
	}
	if(height > screen.availHeight) {
		height = screen.availHeight - 20;
		tooLarge = true;
	}
	if(tooLarge) {
		doc.getElementById("image").style.overflow = "auto";
	}
	
	var tooSmall = false;
	if(e.width < doc.body.clientWidth && e.height < doc.body.clientHeight) {
		tooSmall = true;
	}
	
	var left = (screen.availWidth - width)/2, top = (screen.availHeight - height)/ 2;
	win.moveTo(left, top);
	win.resizeTo(width, height);
	
	var docElm = doc.documentElement || {};
	var winWidth = docElm.clientWidth||doc.body.clientWidth||win.innerWidth,
		winHeight = docElm.clientHeight||doc.body.clientHeight||win.innnerHeight;
	if( (tooLarge && (winWidth < 200 || winHeight < 200) )
		|| !tooLarge && !tooSmall && (e.width > 150 && winWidth <= 150 || e.height > 100 && winHeight <= 100) ) {
		win._e = {
			src : e.src,
			width : e.width,
			height : e.height,
			tooLarge : tooLarge
		}
		doc.getElementById("loading").style.display = "none";
		doc.getElementById("error").style.display = "none";
		doc.getElementById("image").style.display = "none";
		doc.title = "Image Loaded";
	} else { // can resize
		doc.getElementById("loading").style.display = "none";
		doc.getElementById("error").style.display = "none";
		doc.getElementById("resize").style.display = "none";
		doc.getElementById("theImg").style.visibility = "visible";
		doc.title = win._title;
	}
}

iPop.ErrorLoading = function(e, win) {
	if(!e || !win) { return; }
	var doc = win.document;
	e.onload = null; e.onerror = null;
	
	doc.getElementById("loading").style.display = "none";
	doc.getElementById("resize").style.display = "none";
	doc.getElementById("image").style.display = "none";
	doc.title = "Image not found";
}

iPop.ImageLoadedManualPopup = function(e, win) {
	if(!e || !win) { return; }
	var width = e.width + 10, height = e.height + 10;
	if(width > screen.availWidth) { width = screen.availWidth - 10; }
	if(height > screen.availHeight) { height = screen.availHeight - 100; }
	var left = (screen.availWidth - width)/2, top = (screen.availHeight - height)/ 2;
	win.open(e.src, "ManualImageViewer", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + (e.tooLarge ? ",scrollbars" : ""));
	win.close();
}

///////////////// EXTENSIONS /////////////////

iPop.AutoApply = function(container) {
	if(!container) { container = document; }
	var a = container.getElementsByTagName("A");
	for(var i = 0; i < a.length; i++) {
		if( a[i].href.match(/\.(gif|jpg|jpeg|png|bmp)$/i) ) {
			applyPopup(a[i]);
		}
	}
	
	function applyPopup(link) {
		// check to see if link holds *just* a thumbnail and get
		// the thumbnail's alternate text for image popup title
		var n, imgs = 0, whitespace = 0, alt = null;
		for(var i = 0; n = link.childNodes[i]; i++) {
			if(n.tagName == "IMG") {
				imgs++;
				alt = n.alt;
			} else if(n.nodeValue) {
				var val = n.nodeValue;
				if(val.replace(/\s+/g, "") == "") { whitespace++; }
			}
		}
		n = null;
		if(!alt) { alt = link.title; }
		
		// apply iPop to link
		link.onclick = function(e) { return iPop(this.href, alt); }
	}
}