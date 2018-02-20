//基本信息/薪酬信息/社保信息 切换
$(document).ready(function(){
	var _index = 0;
	var tabBtn = $(".main ul li");
	tabBtn.click(function(){
		_index = $(this).index();
		$(this).addClass("hover").siblings().removeClass("hover");
		$(".nav_con .tab").eq(_index).show().siblings().hide();
	});
});
