webpackJsonp(["app/js/classroom-manage/set-price/index"],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	var $form = $('#classroom-set-form');
	var validator = $form.validate({
	  currentDom: '#classroom-save',
	  rules: {
	    price: {
	      required: true,
	      currency: true
	    }
	  }
	});
	
	$('#classroom-save').click(function () {
	  validator.form();
	});
	
	$("#price").on('input', function () {
	  var price = $("#price").val();
	  var rate = $("#coinPrice").data('rate');
	  var name = $("#coinPrice").data('name');
	  $("#coinPrice").text(Translator.trans('classroom.manage.coin_price_hint', { 'coinPrice': price * rate, 'coinName': name }));
	});

/***/ })
]);
//# sourceMappingURL=index.js.map