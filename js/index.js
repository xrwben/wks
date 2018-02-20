$(window).ready(function(){
	
	//index.html页面左侧面板伸缩事件
	$(".panel_content ul li").click(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		$(this).find(".list").slideToggle();
		$(this).siblings().find(".list").slideUp();
	});
	$(".list").click(function(e){
		e.stopPropagation();//阻止冒泡事件 只执行一次
	});
	

	//修改密码/退出登陆弹窗
	$(".logOut .log_info").click(function(){
		$(".log_select").toggle();
	})
//	$(".logOut .log_info").hover(function(){
//		$(".log_select").stop(true).show();
//	},function(){
//		$(".log_select").stop(true).fa();
//	});
//	$(".log_select").hover(function(){
//		$(this).stop();
//	},function(){
//		$(this).hide();
//	});

});
	
	//拿到cookie 填入角色和用户名
	$(function(){
		$(".userName").text($.cookie("name"));
		$(".roleId").text($.cookie("roleId"));
	})

    //退出登录
	function logOff(){
		localStorage.removeItem("token");
		window.location.href = "login.html";
	}
