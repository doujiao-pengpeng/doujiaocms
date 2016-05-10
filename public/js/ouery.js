$(function(){
	/*************************
	 *导航部分开始
	 */
	 var oDropBox=$('.dropdown_box');
	 var oDropTimer=null;
	 $('.fn_manage').hover(function(){//功能管理按钮hover事件
	 	clearTimeout(oDropTimer);
	 	oDropBox.fadeIn('slow');
	 },function(){
	 	oDropTimer=setTimeout(function(){
	 		oDropBox.fadeOut('slow');
	 	}, 100);
	 	
	 })

	 //下拉盒子移入事件
	 oDropBox.hover(function(){
	 	clearTimeout(oDropTimer);
	 },function(){
	 	oDropTimer=setTimeout(function(){
	 		oDropBox.fadeOut('slow');
	 	}, 100);
	 })

	 $('.out_nav>li').each(function(i){
	 	$(this).hover(function(){
	 		$('.inner_nav').hide();
	 		$(this).children('ul').slideDown();
	 	},function(){
	 		$(this).children('ul').slideUp();
	 	})
	 });


	 //右边用户栏移入
	$('.top-username').hover(function(){
		$('.top-user-box').toggle();
	});
	$('.service-support').hover(function(){
	 	$('.service-menu').toggle();
	});
	/*
	*导航部分结束
	**************************/
})