webpackJsonp(["app/js/material-lib/global-document-player/index"],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	var $element = $('#global-player');
	new QiQiuYun.Player({
	  id: 'global-player',
	  resNo: $element.data('resNo'),
	  token: $element.data('token'),
	  user: {
	    id: $element.data('userId'),
	    name: $element.data('userName')
	  },
	  clientType: $element.data('clientType')
	});
	
	console.log($element.data('userId'));
	console.log($element.data('userName'));
	console.log($element.data('clientType'));

/***/ })
]);
//# sourceMappingURL=index.js.map