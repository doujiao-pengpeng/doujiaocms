var TagsBox = function(tagBox) {
	this.tagBox = $('#' + tagBox);
	this.maxNumtags = 30;
	this.switchBtn = ['展开推荐标签', '收起推荐标签'];
	this.delTips();
	this.addTipsFormAdvice('.default-tag');
	this.addTipsFormInput('.addtagsbtn', '#tagsinput');
	this.toggleSuggestList();
	this.changeSuggestList();
}

TagsBox.prototype.hasTips = function(tagTitle) {
	var c = false;
	$('a', this.tagBox).each(function() {
		if ($(this).attr('title') == tagTitle) {
			c = true;
		}
	});
	return c;
}
TagsBox.prototype.isMaxTips = function(tagTitle) {
	return $('a', this.tagBox).length > this.maxNumtags;
}
TagsBox.prototype.addTips = function(tagTitle, tagValue) {
	if (this.hasTips(tagTitle) || (tagTitle.length == 0)) {
		return false;
	}
	if (this.isMaxTips(tagTitle)) {
		return false;
	}
	var b = tagValue ? 'value="' + tagValue + '"' : "";
	this.tagBox.append($("<a " + b + ' title="' + tagTitle + '" href="javascript:void(0);" ><span>' + tagTitle + "</span><em></em></a>"));
	return true

}
TagsBox.prototype.delTips = function(tagTitle) {
	this.tagBox.on('click', 'em', function(e) {
		$(e.target).parent().remove();
	})
}
TagsBox.prototype.addTipsFormAdvice = function(suggestBoxClass) {

	var _this = this;
	$(suggestBoxClass).delegate('a', 'click', function(e) {
		console.log(e.target.parentNode);
		if (e.target.parentNode.tagName.toLowerCase() == 'a') {
			var $this = $(e.target).parent(),
				name = $this.attr('title'),
				id = $this.attr('value');
			//alert(name + id);
			_this.addTips(name, id);
		}
	});
}
TagsBox.prototype.addTipsFormInput = function(addtagsbtn, tagsinput) {
	var _this = this;
	$(addtagsbtn).on('click', function() {
		var taginput = $(tagsinput).val();
		console.log(taginput);
		_this.addTips(taginput, -1);
		$(tagsinput).val('');
	})
}
TagsBox.prototype.toggleSuggestList = function() {
	var _this = this;
	$('.plus-tag-add a').on('click', function() { //展开标签按钮，显示选项列表
		var $this = $(this),
			$con = $('#mycard-plus');

		if ($this.hasClass('plus')) {
			$this.removeClass('plus').text(_this.switchBtn[0]);
			$con.hide();
		} else {
			$this.addClass('plus').text(_this.switchBtn[1]);
			$con.show();
		}
	});
}
TagsBox.prototype.changeSuggestList = function() {
	var $b = $('#change-tips'),
		$d = $('.default-tag div'),
		len = $d.length,
		t = 'nowtips';
	$b.click(function() {
		var i = $d.index($('.default-tag .nowtips')); //获取当前索引
		i = (i + 1 < len) ? (i + 1) : 0;
		$d.hide().removeClass(t);
		$d.eq(i).show().addClass(t);
	});
	$d.eq(0).addClass(t);
}

$(function() {
	var tagsbox = new TagsBox('myTags');
	$('.submit-btn').click(function() {
		var cmtTitle = $("input[name='cmt-title']").val();
		var cmtTag='';
		$('#myTags a').each(function(){
			cmtTag += $(this).attr('title')+',' ;
		});
		var brief=ue.getContentTxt().substring(0,100);
		var cmtHtml = ue.getContent();
		var data = {
				cmtTitle: cmtTitle,
				cmtContent: cmtHtml,
				cmtTag: cmtTag,
				brief:brief
			}
		$.ajax({
			url: '/addcomment',
			type: 'POST',
			data: data,
			success: function(data, status) {
				if (status == 'success') {
					location.href = '/commentList';
				}
			},
			error: function(res, err) {
				//location.href = '/addcomment';
				alert(err);
			}
		})
	})
	$('.addAnswer').click(function() {
		var id=$('.cmt-title').attr('id');
		var cmtHtml = ue.getContent();
		var data = {
				_id: id,
				cmtAnswer: cmtHtml,
			}
		$.ajax({
			url: '/'+id+'/answer',
			type: 'POST',
			data: data,
			success: function(data, status) {
				if (status == 'success') {
					location.href = '/'+id;
				}
			},
			error: function(err) {
				alert(err);
			}
		})
	})
	


})