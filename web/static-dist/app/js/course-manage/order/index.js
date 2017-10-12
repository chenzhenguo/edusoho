webpackJsonp(["app/js/course-manage/order/index"],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	$('#startDate, #endDate').datetimepicker({
	  autoclose: true,
	  language: document.documentElement.lang
	});
	
	$('#startDate').datetimepicker().on('changeDate', function () {
	  $('#endDate').datetimepicker('setStartDate', $('#startDate').val().substring(0, 16));
	});
	
	$('#startDate').datetimepicker('setEndDate', $('#endDate').val().substring(0, 16));
	
	$('#endDate').datetimepicker().on('changeDate', function () {
	  $('#startDate').datetimepicker('setEndDate', $('#endDate').val().substring(0, 16));
	});
	
	$('#endDate').datetimepicker('setStartDate', $('#startDate').val().substring(0, 16));

/***/ })
]);
//# sourceMappingURL=index.js.map