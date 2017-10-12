webpackJsonp(["app/js/group/thread-add/index"],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _attachmentActions = __webpack_require__("d5fb0e67d2d4c1ebaaed");
	
	var _attachmentActions2 = _interopRequireDefault(_attachmentActions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var $userThreadForm = $('#user-thread-form');
	var groupThreadAddBtn = '#groupthread-save-btn';
	var threadContent = 'thread_content';
	
	new _attachmentActions2["default"]($userThreadForm);
	var editor = CKEDITOR.replace(threadContent, {
	  toolbar: 'Thread',
	  filebrowserImageUploadUrl: $("#" + threadContent).data('imageUploadUrl'),
	  allowedContent: true,
	  height: 300
	});
	editor.on('change', function () {
	  $("#" + threadContent).val(editor.getData());
	});
	editor.on('blur', function () {
	  $("#" + threadContent).val(editor.getData());
	});
	
	var formValidator = $userThreadForm.validate({
	  currentDom: groupThreadAddBtn,
	  rules: {
	    'thread[title]': {
	      required: true,
	      minlength: 2,
	      maxlength: 100
	    },
	    'thread[content]': {
	      required: true,
	      minlength: 2
	    }
	  }
	});
	
	$(groupThreadAddBtn).click(function () {
	  if (formValidator.form()) {
	    $userThreadForm.submit();
	  }
	});

/***/ })
]);
//# sourceMappingURL=index.js.map