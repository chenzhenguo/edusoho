webpackJsonp(["app/js/group/add/index"],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	var $userGroupForm = $('#user-group-form');
	var $groupIntroduce = $('#groupIntroduce');
	var btn = '#group-save-btn';
	
	var editor = CKEDITOR.replace('groupIntroduce', {
		toolbar: 'Full',
		filebrowserImageUploadUrl: $groupIntroduce.data('imageUploadUrl'),
		allowedContent: true,
		height: 300
	});
	
	editor.on('change', function () {
		$groupIntroduce.val(editor.getData());
	});
	editor.on('blur', function () {
		$groupIntroduce.val(editor.getData());
	});
	
	var $groupCreateValidator = $userGroupForm.validate({
		currentDom: btn,
		rules: {
			'group[grouptitle]': {
				required: true,
				minlength: 2,
				maxlength: 100
			}
		}
	});
	
	$(btn).click(function () {
		if ($groupCreateValidator.form()) {
			$userGroupForm.submit();
		}
	});

/***/ })
]);
//# sourceMappingURL=index.js.map