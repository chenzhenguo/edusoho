webpackJsonp(["app/js/course-manage/marketing/index"],[
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Marketing = function () {
	  function Marketing() {
	    _classCallCheck(this, Marketing);
	
	    this.validator = null;
	    this.init();
	  }
	
	  _createClass(Marketing, [{
	    key: 'init',
	    value: function init() {
	      this.initDatePicker('#expiryStartDate');
	      this.initDatePicker('#expiryEndDate');
	      this.initDatePicker('#deadline');
	      this.initValidator();
	      this.initExpiryMode();
	      this.initenableBuyExpiry();
	      this.taskPriceSetting();
	      this.checkBoxChange();
	      this.initDatetimepicker();
	      this.setService();
	    }
	  }, {
	    key: 'setService',
	    value: function setService() {
	      $('.js-service-item').click(function (event) {
	        var $item = $(event.currentTarget);
	        var $values = $('#course_services').val();
	        var values = void 0;
	        if (!$values) {
	          values = [];
	        } else {
	          values = JSON.parse($values);
	        }
	
	        if ($item.hasClass('label-primary')) {
	          $item.removeClass('label-primary').addClass('label-default');
	          values.splice(values.indexOf($item.data('code')), 1);
	        } else {
	          $item.removeClass('label-default').addClass('label-primary');
	          values.push($item.data('code'));
	        }
	
	        $('#course_services').val(JSON.stringify(values));
	      });
	    }
	  }, {
	    key: 'initDatetimepicker',
	    value: function initDatetimepicker() {
	      var _this = this;
	
	      $('input[name="buyExpiryTime"]').datetimepicker({
	        format: 'yyyy-mm-dd',
	        language: document.documentElement.lang,
	        minView: 2, //month
	        autoclose: true
	      }).on('hide', function () {
	        _this.validator && _this.validator.form();
	      });
	      this.updateDatetimepicker();
	    }
	  }, {
	    key: 'initValidator',
	    value: function initValidator() {
	      var _this2 = this;
	
	      var $form = $('#course-marketing-form');
	      $('.js-task-price-setting').perfectScrollbar();
	      this.validator = $form.validate({
	        groups: {
	          date: 'expiryStartDate expiryEndDate'
	        },
	        rules: {
	          originPrice: {
	            required: function required() {
	              return $("[name=isFree]:checked").val() == 0;
	            },
	            positive_currency: function positive_currency() {
	              return $("[name=isFree]:checked").val() == 0;
	            }
	          },
	          watchLimit: {
	            digits: true
	          },
	          rewardPoint: {
	            required: true,
	            max: 100000,
	            unsigned_integer: true
	          },
	          taskRewardPoint: {
	            required: true,
	            max: 100000,
	            unsigned_integer: true
	          }
	        },
	        messages: {
	          buyExpiryTime: {
	            required: Translator.trans('course.manage.buy_expiry_time_error_hint'),
	            date: Translator.trans('course.manage.buy_expiry_time_error_hint')
	          },
	          rewardPoint: {
	            required: Translator.trans('请输入教学计划奖励积分'),
	            max: Translator.trans('请输入0-100000的整数')
	          },
	          taskRewardPoint: {
	            required: Translator.trans('请输入计划任务奖励积分'),
	            max: Translator.trans('请输入0-100000的整数')
	          }
	        }
	      });
	      $('#course-submit').click(function (event) {
	        if (_this2.validator && _this2.validator.form()) {
	          $(event.currentTarget).button('loading');
	          $form.submit();
	        }
	      });
	    }
	  }, {
	    key: 'updateDatetimepicker',
	    value: function updateDatetimepicker() {
	      $('input[name="buyExpiryTime"]').datetimepicker('setStartDate', new Date(Date.now()));
	      $('input[name="buyExpiryTime"]').datetimepicker('setEndDate', new Date(Date.now() + 86400 * 365 * 10 * 1000));
	    }
	  }, {
	    key: 'checkBoxChange',
	    value: function checkBoxChange() {
	      var _this3 = this;
	
	      $('input[name="buyable"]').on('change', function (event) {
	        if ($('input[name="buyable"]:checked').val() == 0) {
	          $('.js-course-add-close-show').removeClass('hidden');
	          $('.js-course-add-open-show').addClass('hidden');
	        } else {
	          $('.js-course-add-close-show').addClass('hidden');
	          $('.js-course-add-open-show').removeClass('hidden');
	        }
	        _this3.initenableBuyExpiry();
	      });
	      $('input[name="enableBuyExpiryTime"]').on('change', function (event) {
	        if ($('input[name="enableBuyExpiryTime"]:checked').val() == 0) {
	          $('#buyExpiryTime').addClass('hidden');
	        } else {
	          $('#buyExpiryTime').removeClass('hidden');
	          _this3.updateDatetimepicker();
	        }
	        _this3.initenableBuyExpiry();
	      });
	
	      $('input[name="deadlineType"]').on('change', function (event) {
	        if ($('input[name="deadlineType"]:checked').val() == 'end_date') {
	          $('#deadlineType-date').removeClass('hidden');
	          $('#deadlineType-days').addClass('hidden');
	        } else {
	          $('#deadlineType-date').addClass('hidden');
	          $('#deadlineType-days').removeClass('hidden');
	        }
	        _this3.initExpiryMode();
	      });
	
	      $('input[name="expiryMode"]').on('change', function (event) {
	        if ($('input[name="expiryMode"]:checked').val() == 'date') {
	          $('#expiry-days').removeClass('hidden').addClass('hidden');
	          $('#expiry-date').removeClass('hidden');
	        } else if ($('input[name="expiryMode"]:checked').val() == 'days') {
	          $('#expiry-date').removeClass('hidden').addClass('hidden');
	          $('#expiry-days').removeClass('hidden');
	        } else {
	          $('#expiry-date').removeClass('hidden').addClass('hidden');
	          $('#expiry-days').removeClass('hidden').addClass('hidden');
	        }
	        _this3.initExpiryMode();
	      });
	
	      $('input[name="isFree"]').on('change', function (event) {
	        if ($('input[name="isFree"]:checked').val() == 0) {
	          $('.js-is-free').removeClass('hidden');
	        } else {
	          $('.js-is-free').addClass('hidden');
	        }
	      });
	      $('input[name="tryLookable"]').on('change', function (event) {
	        if ($('input[name="tryLookable"]:checked').val() == 1) {
	          $('.js-enable-try-look').removeClass('hidden');
	        } else {
	          $('.js-enable-try-look').addClass('hidden');
	        }
	      });
	
	      $('input[name="showServices"]').on('change', function (event) {
	        if ($('input[name="showServices"]:checked').val() == 1) {
	          $('.js-services').removeClass('hidden');
	        } else {
	          $('.js-services').addClass('hidden');
	        }
	      });
	    }
	  }, {
	    key: 'taskPriceSetting',
	    value: function taskPriceSetting() {
	      $('.js-task-price-setting').on('click', 'li', function (event) {
	        var $li = $(this).toggleClass('open');
	        var $input = $li.find('input');
	        $input.prop("checked", !$input.is(":checked"));
	      });
	
	      $('.js-task-price-setting').on('click', 'input', function (event) {
	        event.stopPropagation();
	        var $input = $(this);
	        $input.closest('li').toggleClass('open');
	      });
	    }
	  }, {
	    key: 'initDatePicker',
	    value: function initDatePicker($id) {
	      var _this4 = this;
	
	      var $picker = $($id);
	      $picker.datetimepicker({
	        format: 'yyyy-mm-dd',
	        language: "zh",
	        minView: 2, //month
	        autoclose: true,
	        endDate: new Date(Date.now() + 86400 * 365 * 10 * 1000)
	      }).on('hide', function () {
	        _this4.validator.form();
	      });
	      $picker.datetimepicker('setStartDate', new Date());
	    }
	  }, {
	    key: 'initenableBuyExpiry',
	    value: function initenableBuyExpiry() {
	      var $enableBuyExpiryTime = $('[name="enableBuyExpiryTime"]:checked');
	      var $buyable = $('[name="buyable"]:checked');
	      var $buyExpiryTime = $('[name="buyExpiryTime"]');
	      if ($buyable.val() == 1 && $enableBuyExpiryTime.val() == 1) {
	        this.elementAddRules($buyExpiryTime, this.getBuyExpiryTimeRules());
	      } else {
	        this.elementRemoveRules($buyExpiryTime);
	      }
	      this.validator.form();
	    }
	  }, {
	    key: 'initExpiryMode',
	    value: function initExpiryMode() {
	      var $deadline = $('[name="deadline"]');
	      var $expiryDays = $('[name="expiryDays"]');
	      var $expiryStartDate = $('[name="expiryStartDate"]');
	      var $expiryEndDate = $('[name="expiryEndDate"]');
	      var expiryMode = $('[name="expiryMode"]:checked').val();
	      this.elementRemoveRules($deadline);
	      this.elementRemoveRules($expiryDays);
	      this.elementRemoveRules($expiryStartDate);
	      this.elementRemoveRules($expiryEndDate);
	
	      switch (expiryMode) {
	        case 'days':
	          var $deadlineType = $('[name="deadlineType"]:checked');
	          if ($deadlineType.val() === 'end_date') {
	            this.elementAddRules($deadline, this.getDeadlineEndDateRules());
	            this.validator.form();
	            return;
	          }
	          this.elementAddRules($expiryDays, this.getExpiryDaysRules());
	          this.validator.form();
	          break;
	        case 'date':
	          this.elementAddRules($expiryStartDate, this.getExpiryStartDateRules());
	          this.elementAddRules($expiryEndDate, this.getExpiryEndDateRules());
	          this.validator.form();
	          break;
	        default:
	          this.validator.form();
	          break;
	      }
	    }
	  }, {
	    key: 'getBuyExpiryTimeRules',
	    value: function getBuyExpiryTimeRules() {
	      return {
	        required: true,
	        messages: {
	          required: Translator.trans('course.manage.buy_expiry_time_required_error_hint')
	        }
	      };
	    }
	  }, {
	    key: 'getExpiryEndDateRules',
	    value: function getExpiryEndDateRules() {
	      return {
	        required: true,
	        date: true,
	        after_date: '#expiryStartDate',
	        messages: {
	          required: Translator.trans('course.manage.expiry_end_date_error_hint')
	        }
	      };
	    }
	  }, {
	    key: 'getExpiryStartDateRules',
	    value: function getExpiryStartDateRules() {
	      return {
	        required: true,
	        date: true,
	        before_date: '#expiryEndDate',
	        messages: {
	          required: Translator.trans('course.manage.expiry_start_date_error_hint')
	        }
	      };
	    }
	  }, {
	    key: 'getExpiryDaysRules',
	    value: function getExpiryDaysRules() {
	      return {
	        required: true,
	        positive_integer: true,
	        max_year: true,
	        messages: {
	          required: Translator.trans(Translator.trans('course.manage.expiry_days_error_hint'))
	        }
	      };
	    }
	  }, {
	    key: 'getDeadlineEndDateRules',
	    value: function getDeadlineEndDateRules() {
	      return {
	        required: true,
	        date: true,
	        messages: {
	          required: Translator.trans('course.manage.deadline_end_date_error_hint')
	        }
	      };
	    }
	  }, {
	    key: 'elementAddRules',
	    value: function elementAddRules($element, options) {
	      $element.rules("add", options);
	    }
	  }, {
	    key: 'elementRemoveRules',
	    value: function elementRemoveRules($element) {
	      $element.rules('remove');
	    }
	  }]);
	
	  return Marketing;
	}();
	
	new Marketing();

/***/ })
]);
//# sourceMappingURL=index.js.map