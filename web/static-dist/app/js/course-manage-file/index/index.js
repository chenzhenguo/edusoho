webpackJsonp(["app/js/course-manage-file/index/index"],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _notify = __webpack_require__("b334fd7e4c5a19234db2");
	
	var _notify2 = _interopRequireDefault(_notify);
	
	var _batchSelect = __webpack_require__("de585ca0d3c2d0205c51");
	
	var _batchSelect2 = _interopRequireDefault(_batchSelect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var $panel = $('#file-manage-panel');
	new _batchSelect2["default"]($panel);
	
	$panel.on('click', '.convert-file-btn', function () {
	  console.log('re');
	  $.post($(this).data('url'), function (response) {
	    if (response.status == 'error') {
	      alert(response.message);
	    } else {
	      window.location.reload();
	    }
	  }, 'json').fail(function () {
	    alert(Translator.trans('alert.file_convert_error.message'));
	  });
	});
	
	$('.tip').tooltip();
	
	$("#modal").modal({
	  backdrop: 'static',
	  keyboard: false,
	  show: false
	});
	
	$("button", ".panel-heading").on('click', function () {
	  var url = $(this).data("url");
	  $("#modal").html('');
	  $("#modal").modal('show');
	  $.get(url, function (html) {
	    $("#modal").html(html);
	  });
	});
	
	$("[rel='tooltip']").tooltip();
	
	asyncLoadFiles();
	
	$('[data-role=batch-delete]').click(function () {
	  var flag = false;
	  var ids = [];
	  $('[data-role=batch-item]').each(function () {
	    if ($(this).is(":checked")) {
	      flag = true;
	      ids.push(this.value);
	    }
	  });
	
	  if (flag) {
	    $('#modal').html('');
	    $('#modal').load($(this).data('url'), { ids: ids });
	    $('#modal').modal('show');
	  } else {
	    (0, _notify2["default"])('danger', Translator.trans('notify.file_not_select.message'));
	    return;
	  }
	});
	
	function asyncLoadFiles() {
	  var fileIds = new Array();
	  $('tbody [type=checkbox]').each(function () {
	    if (!isNaN($(this).val())) {
	      fileIds.push($(this).val());
	    }
	  });
	
	  if (fileIds.length == 0) {
	    return;
	  }
	
	  $.post($("#file-manage-panel").data("fileStatusUrl"), { 'ids': fileIds.join(",") }, function (data) {
	    if (!data || data.length == 0) {
	      return;
	    }
	
	    for (var i = 0; i < data.length; i++) {
	      var file = data[i];
	      if ($.inArray(file.type, ['video', 'ppt', 'document']) > -1 && file.storage == 'cloud') {
	        if (file.convertStatus == 'waiting' || file.convertStatus == 'doing') {
	          $("#upload-file-tr-" + file.id).find('a:first ~ br:first').after("<span class='color-warning mr5 text-sm'>" + Translator.trans('page.file_converting.message') + "</span><br/>");
	        } else if (file.convertStatus == 'error') {
	          $("#upload-file-tr-" + file.id).find('a:first ~ br:first').after("<span class='color-danger mr5 text-sm'>" + Translator.trans('page.file_convert_failed.message') + "</span><br/>");
	        } else if (file.convertStatus == 'none') {
	          $("#upload-file-tr-" + file.id).find('a:first ~ br:last').after("<span class='label label-default mr5 tip'>" + Translator.trans('page.file_not_convert.message') + "</span>");
	        } else if (file.convertStatus == 'success') {
	          $("#upload-file-tr-" + file.id).find('a:first ~ br:last').after("<span class='label label-success mr5 tip'>" + Translator.trans('page.file_converted.message') + "</span>");
	        }
	      }
	      if (file.type == 'video' && file.metas2) {
	        if (file.metas2.shd) {
	          $("#upload-file-tr-" + file.id).find('a:first ~ br:first').after('<span class="label label-info mr5 tip">' + Translator.trans('page.video_sd.message') + '</span>');
	        } else if (file.metas2.hd) {
	          $("#upload-file-tr-" + file.id).find('a:first ~ br:first').after('<span class="label label-info mr5 tip">' + Translator.trans('page.video_hd.message') + '</span>');
	        } else if (file.metas2.sd) {
	          $("#upload-file-tr-" + file.id).find('a:first ~ br:first').after('<span class="label label-info mr5 tip">' + Translator.trans('page.video_sd.message') + '</span>');
	        }
	      }
	
	      if (file.type == 'video' && file.metas && file.metas.caption) {
	        $("#upload-file-tr-" + file.id).find('a:first ~ br:first').after('<span class="label label-primary tip">' + Translator.trans('page.video_subtitle.message') + '</span>');
	      }
	    }
	  });
	}

/***/ })
]);
//# sourceMappingURL=index.js.map