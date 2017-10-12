webpackJsonp(["app/js/testpaper-manage/index"],{

/***/ "f637e828bcb096623369":
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _notify = __webpack_require__("b334fd7e4c5a19234db2");
	
	var _notify2 = _interopRequireDefault(_notify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DeleteAction = function () {
	  function DeleteAction($element, onSuccess) {
	    _classCallCheck(this, DeleteAction);
	
	    this.$element = $element;
	    this.onSuccess = onSuccess;
	    this.initEvent();
	  }
	
	  _createClass(DeleteAction, [{
	    key: 'initEvent',
	    value: function initEvent() {
	      var _this = this;
	
	      this.$element.on('click', '[data-role="item-delete"]', function (event) {
	        return _this._itemDelete(event);
	      });
	      this.$element.on('click', '[data-role="batch-delete"]', function (event) {
	        return _this._batchDelete(event);
	      });
	    }
	  }, {
	    key: '_itemDelete',
	    value: function _itemDelete(event) {
	      var $btn = $(event.currentTarget);
	
	      var name = $btn.data('name');
	      var message = $btn.data('message');
	      var self = this;
	
	      if (!message) {
	        message = Translator.trans('site.data.delete_name_hint', { 'name': name });
	      }
	
	      if (!confirm(message)) {
	        return;
	      }
	
	      $.post($btn.data('url'), function () {
	        if ($.isFunction(self.onSuccess)) {
	          self.onSuccess.call(self.$element);
	        } else {
	          $btn.closest('[data-role=item]').remove();
	          (0, _notify2["default"])('success', "删除成功");
	          window.location.reload();
	        }
	      });
	    }
	  }, {
	    key: '_batchDelete',
	    value: function _batchDelete(event) {
	      var $btn = $(event.currentTarget);
	      var name = $btn.data('name');
	
	      var ids = [];
	      this.$element.find('[data-role="batch-item"]:checked').each(function () {
	        ids.push(this.value);
	      });
	
	      if (ids.length == 0) {
	        (0, _notify2["default"])('danger', Translator.trans('site.data.uncheck_name_hint', { 'name': name }));
	        return;
	      }
	
	      if (!confirm(Translator.trans('site.data.delete_check_name_hint', { 'name': name }))) {
	        return;
	      }
	
	      (0, _notify2["default"])('info', Translator.trans('site.data.delete_submiting_hint'));
	
	      $.post($btn.data('url'), { ids: ids }, function () {
	        window.location.reload();
	      });
	    }
	  }]);
	
	  return DeleteAction;
	}();
	
	exports["default"] = DeleteAction;

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _notify = __webpack_require__("b334fd7e4c5a19234db2");
	
	var _notify2 = _interopRequireDefault(_notify);
	
	var _batchSelect = __webpack_require__("de585ca0d3c2d0205c51");
	
	var _batchSelect2 = _interopRequireDefault(_batchSelect);
	
	var _deleteAction = __webpack_require__("f637e828bcb096623369");
	
	var _deleteAction2 = _interopRequireDefault(_deleteAction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TestpaperManage = function () {
	  function TestpaperManage($container) {
	    _classCallCheck(this, TestpaperManage);
	
	    this.$container = $container;
	    this._initEvent();
	    this._init();
	  }
	
	  _createClass(TestpaperManage, [{
	    key: '_initEvent',
	    value: function _initEvent() {
	      var _this = this;
	
	      this.$container.on('click', '.open-testpaper,.close-testpaper', function (event) {
	        return _this.testpaperAction(event);
	      });
	    }
	  }, {
	    key: '_init',
	    value: function _init() {}
	  }, {
	    key: 'testpaperAction',
	    value: function testpaperAction(event) {
	      var $target = $(event.currentTarget);
	      var $tr = $target.closest('tr');
	
	      if (!confirm($target.attr('title'))) {
	        return;
	      }
	
	      $.post($target.data('url'), function (html) {
	        (0, _notify2["default"])('success', Translator.trans("testpaper_manage.save_success_hint"));
	        $tr.replaceWith(html);
	      }).error(function () {
	        (0, _notify2["default"])('danger', Translator.trans("testpaper_manage.save_error_hint"));
	      });
	    }
	  }]);
	
	  return TestpaperManage;
	}();
	
	var $container = $('#quiz-table-container');
	new TestpaperManage($container);
	new _batchSelect2["default"]($container);
	new _deleteAction2["default"]($container);

/***/ })

});
//# sourceMappingURL=index.js.map