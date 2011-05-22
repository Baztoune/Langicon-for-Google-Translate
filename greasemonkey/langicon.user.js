// ==UserScript==
// @name           Langicon for Google translate
// @author         Bastien Colmard
// @namespace      http://github.com/Baztoune
// @description    Adds stars on Google Translate for your preferred languages
// @include        http://translate.google.*
// ==/UserScript==


var debugEnabled = true;
var plusImgOrig = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHVQTFRFwcHBwMDA+/v7u7u7/Pz8rq6uMzMz/v7+9/f37u7utLS0////5+fnDw8P7+/vQEBA5ubms7OzsLCw29vb3NzcysrKKysr6+vrODg49fX1+fn59vb27e3t+vr63t7esbGxvr6+ubm57Ozs8/Pzurq69PT0/f39808chgAAAGZJREFUeNokyAcSgzAMRFGBCYEUUiDFVcTy+v5HDMZ/ZkdvRIHTr5Q40MPnmrkQlXvcNoy0FjdtNhKrb87q3eemv76fXf23n+9rmbDby2GO2EydAbwTiKOTtQAEWt8psEolxeEvwACFcA1c1mQTHgAAAABJRU5ErkJggg==";
var plusImgFade = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhQTFRF9fX18fHx39/fs7Ozn5+fqqqq4eHh/Pz8+fn56urqr6+vra2t+Pj48vLy4uLi4ODg+vr69/f3/f395ubm4+Pj+/v7/////v7+YjGLWwAAAFRJREFUeNokjUkOwCAMA0P3JTQhYPj/TwtkJMsjX0xRyjcoEkmsOUaUR9eek92zNdPkvjIwveZ325fmu6XnDhfcdQkJ0w0wVijTgYH2EPVfR+IvwAApRgg/uGTlgQAAAABJRU5ErkJggg==";
var starPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTREOUE0QzQ4MzI0MTFFMEI2QTFFNThCMzkxRkU1NDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTREOUE0QzM4MzI0MTFFMEI2QTFFNThCMzkxRkU1NDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5kaWQ6RTE5NkJBRjkyMzgzRTAxMThENDdCNzA4Qjk3OTU5MUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTE5NkJBRjkyMzgzRTAxMThENDdCNzA4Qjk3OTU5MUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5YpVj6AAAAvVBMVEX/9Da/0uT/9oLy9vrQ3ev/+QAuaam2wlf6+/zZ5O/+/v+otzzw9fmdr0/K1+eGoXvz7UBXiLL/8ADH1+lMfrqjtnL98ont8vZEeatrlKyCnnj09/o/dqj/9ACowNhZiLj/8wBbgoWXstCWstBFd57//65/n7z58Yb//612msLEySOYrZJEdp6XrZJulsY/daj/9QAJTJdtlsZZh7hXhaB/nrv/8jfEySL/9YhXhZ/w5gt/m5758oZ2mcL///+4sNZ0AAAAP3RSTlP//////////////////////////////////////////////////////////////////////////////////wCOJnwXAAAAfElEQVR42izMxxKCABAD0KX33kHFRrFSLKDg/v9nuc54yORdEkBEle94lRooWTk9sr+5c73nfv4sYvFevMS4OcDtws7hGFbsKYfISW14gp06EaDuG8t1a/g6beXrILyFYy+TTcvVNpprmWRPCrarXSB5ZCZR6FtJGPwKMACa4hBgqt1ZGAAAAABJRU5ErkJggg=="
var iconGenerated = new Array();

function addCss(){
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = ""
						+'.langicon-box {'
						+'background-repeat:no-repeat;'
						+'background-position:right center;'
						+'margin:5px 5px 0px 0px;'
						+'width:11px;'
						+'height:11px;'
						+'float:left;'
						+'}'
						+'.langicon-plus {'
						+'background-image:url("' + plusImgFade + '");'
						+'}'
						+'.langicon-plus:hover {'
						+'background-image:url("' + plusImgOrig + '");'
						+'cursor:pointer;'
						+'}'
						+'.langicon-star {'
						+'background-image:url("' + starPng + '");'
						+'}'
						;
	document.getElementsByTagName('head')[0].appendChild(style);
}

function toggleLang(idButton, lang){
	var ar = new Array();
	var val = GM_getValue(idButton+"-langs");
	if(val !== undefined && val !==""){
		ar = val.split(",");
	}
	var indexLang = ar.indexOf(lang);
	if(indexLang !== -1){
		// exists
		while (indexLang !== -1){
			// remove every instance, just in case
			ar.splice(indexLang, 1);
			indexLang = ar.indexOf(lang);
		}
	} else {
		// does not exist
		ar.push(lang);
	}
	GM_setValue(idButton+"-langs", ar.toString());
}

function buildMenu(idButton){
	if(iconGenerated.indexOf(idButton)===-1){
		iconGenerated.push(idButton); // remember so we don't insert icons 2 times
		/* util - prepare array so we load it just 1 time*/
		var ar = new Array();
		var val = GM_getValue(idButton+"-langs");
		if(val !== undefined && val !==""){
			ar = val.split(",");
		}
		
		/* Prepare the div */
		var div = document.createElement('div');
		div.classList.add("langicon-box");
		
		/* get the right menu */
		var menu = document.getElementById(idButton+'-menu');
		var langArray = menu.getElementsByClassName('goog-option');
		
		/* insert new elements */
		var newElementsArray = new Array();
		var arLen=langArray.length;
		while (arLen--) {
			var newDiv = div.cloneNode(true);
			if(ar.indexOf(langArray[arLen].textContent) !== -1){
				newDiv.classList.add("langicon-star");
			} else {
				newDiv.classList.add("langicon-plus");
			}
			newElementsArray.push(langArray[arLen].parentNode.insertBefore(newDiv, langArray[arLen]));
		}
		
		/* add event listener and style to new elements */
		var arLen=newElementsArray.length;
		while (arLen--) {
			newElementsArray[arLen].addEventListener("click", function(evt){
				toggleLang(idButton,evt.target.nextSibling.textContent);
					evt.target.classList.toggle("langicon-plus");
					evt.target.classList.toggle("langicon-star");
			}, true);
		}
	}
}

window.addEventListener("load", function(e) {
	addCss();
	window.setTimeout(function(){
		// wait for the buttons to be loaded TODO add timer and retry
		/* wait for the menus to be created after clicking on the button */
		var srcButton = document.getElementById('gt-sl-gms');
		var tgtButton = document.getElementById('gt-tl-gms');
		srcButton.addEventListener("click", function(){buildMenu("gt-sl-gms")}, true);
		tgtButton.addEventListener("click", function(){buildMenu("gt-tl-gms")}, true);
	}, 1000);
}, false);