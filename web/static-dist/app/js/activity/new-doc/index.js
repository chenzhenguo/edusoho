webpackJsonp(["app/js/activity/new-doc/index"],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	var url = $('.js-cloud-url').data('url');
	(function (url) {
		window.QiQiuYun || (window.QiQiuYun = {});
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url + '?' + ~~(Date.now() / 1000 / 60), false); // 可设置缓存时间。当前缓存时间为1分钟。
		xhr.send(null);
		var firstScriptTag = document.getElementsByTagName('script')[0];
		var script = document.createElement('script');
		script.text = xhr.responseText;
		firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
	})(url);
	
	var $element = $('#document-content');
	
	initDocPlayer();
	onFullScreen();
	
	function initDocPlayer() {
		new QiQiuYun.Player({
			id: 'document-content',
			resNo: $element.data('resNo'),
			token: $element.data('token'),
			user: {
				id: $element.data('userId'),
				name: $element.data('userName')
			}
		});
	}
	
	function onFullScreen() {
		window.onmessage = function (e) {
			if (e == null || e == undefined) {
				return;
			}
			var isPageFullScreen = e.data;
			if (typeof isPageFullScreen != "boolean") {
				return;
			}
			var docContent = $('#task-content-iframe', window.parent.document);
			if (isPageFullScreen) {
				docContent.removeClass('screen-full');
				docContent.width('100%');
			} else {
				docContent.addClass('screen-full');
				docContent.width(window.document.body.offsetWidth + "px");
			}
		};
	}

/***/ })
]);
//# sourceMappingURL=index.js.map