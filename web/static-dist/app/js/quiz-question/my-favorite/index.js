webpackJsonp(["app/js/quiz-question/my-favorite/index"],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	$('body').on('click', '.showQuestion', function () {
	  $(this).parent().find('.panel').toggle();
	});
	
	$('body').on('click', '.unfavorite-btn', function () {
	  $btn = $(this);
	
	  $.post($(this).data('url'), function () {
	    $btn.parents('tr').hide();
	  });
	});

/***/ })
]);
//# sourceMappingURL=index.js.map