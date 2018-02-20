//查看图片
function Look(num){
	$.ajax({
		type : 'post',
		url : serverPath+"/wks/empfile/showImage",
		headers:{token:localStorage.getItem("token")},
		data : {"EMPLOYEE_ID":resultData.data.EMPLOYEE_ID,"NUM":num},
		beforeSend:function(){
			$("#loading").show();
		},
		success : function(result){
			console.log("查看成功！");
			console.log(result);
			if(result.success == "token"){
				alert(result.msg);
				window.parent.window.location.href = "login.html";
			}else if(result.success){
				$(".showImage").show();
				$(".showImage .pic img").attr("src",result.data);
				$(".showImage").click(function(){
					$(this).hide();
				})
			}else{
				alert("请先上传图片文件！");
			}
		},
		complete: function(){
	     	$("#loading").hide();
	    },
		error : function(){
			alert("系统网络异常！");
		}
	})
}

//判断文件是否存在
function fileExist(){
	if(resultData.data.ADDMISSION_NOT){
		$(".ADDMISSION_NOT").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.APPLY_REG){
		$(".APPLY_REG").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.IDCARD_ZHE){
		$(".IDCARD_ZHE").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.IDCARD_FAN){
		$(".IDCARD_FAN").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.BANK_SIG){
		$(".BANK_SIG").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.TOWORK_COM){
		$(".TOWORK_COM").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.OUTWORK_PRO){
		$(".OUTWORK_PRO").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.GRADUATION_CARD){
		$(".GRADUATION_CARD").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.OTHER1){
		$(".OTHER1").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.OTHER2){
		$(".OTHER2").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.DIAODONG_SP){
		$(".DIAODONG_SP").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.LIZHI_SQ){
		$(".LIZHI_SQ").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.LIZHI_SP){
		$(".LIZHI_SP").text("上传完成").parent().css({"background":"#eee"});
	}
	if(resultData.data.LIZHI_JJ){
		$(".LIZHI_JJ").text("上传完成").parent().css({"background":"#eee"});
	}
}