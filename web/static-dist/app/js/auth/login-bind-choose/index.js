webpackJsonp(["app/js/auth/login-bind-choose/index"],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _notify = __webpack_require__("b334fd7e4c5a19234db2");
	
	var _notify2 = _interopRequireDefault(_notify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var $form = $('#set-bind-new-form');
	var validator = $form.validate({
	  currentDom: '#set-bind-new-btn',
	  ajax: true,
	  rules: {
	    nickname: {
	      required: true,
	      byte_minlength: 4,
	      byte_maxlength: 18,
	      nickname: true,
	      chinese_alphanumeric: true,
	      es_remote: {
	        type: 'get'
	      }
	    },
	    set_bind_emailOrMobile: {
	      required: true,
	      es_email: true,
	      es_remote: {
	        type: 'get'
	      }
	    }
	  },
	  submitSuccess: function submitSuccess(response) {
	    if (!response.success) {
	      $('#bind-new-form-error').html(response.message).show();
	      return;
	    }
	    (0, _notify2["default"])('success', Translator.trans('auth.login_bind_choose.login_success_hint'));
	    window.location.href = response._target_path;
	  },
	
	  submitError: function submitError(data) {
	    (0, _notify2["default"])('danger', Translator.trans('auth.login_bind_choose.login_failed_hint'));
	  }
	});
	
	$('#set-bind-new-btn').click(function () {
	  $('#set-bind-new-form').submit();
	});
	
	$('#user_terms input[type=checkbox]').on('click', function () {
	  if ($(this).attr('checked')) {
	    $(this).attr('checked', false);
	  } else {
	    $(this).attr('checked', true);
	  };
	});

/***/ })
]);
//# sourceMappingURL=index.js.map