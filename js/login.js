$(function(){
	//登录提交
	$("#login_tj").click(function(){
		var userName = $("#userName").val();
		var userPassword = $("#userPassword").val();
		var n_p = userName +",," + userPassword;
		$.ajax({
			type:"post",
			url:serverPath +"/wks/user/login_login",
			data : {KEYDATA:n_p},
			dataType: "json",
			success : function(result){
				console.log(result);
				if(result.success){
					console.log(result.success);
					$.cookie("userName",result.data.USERNAME);
					$.cookie("roleId",result.data.ROLE_ID);
					console.log(result.data.ROLE_ID);
					$.cookie("salt",result.data.SALT);
					$.cookie("userId",result.data.USER_ID);
					$.cookie("name",result.data.NAME);
					localStorage.setItem("token",result.token);
					$("#login_form form")[0].reset();
					if(result.data.ROLE_ID == "管理员"){
						window.location.href = "administor.html";
					}else{
						window.location.href = "index.html";
					}
				}else{
					alert(result.msg)
				}
			},
			error : function(){
				alert("系统网络异常！");
			}
		});
	});
})
