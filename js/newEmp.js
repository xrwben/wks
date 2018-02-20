
	var resultData = null; //保存请求的数据
	//上传应聘登记表
	function fileUplod(_target){
		var file = $("#ypdjb")[0].files[0];
		if(file.size>1*1024*1024){
			alert("请上传小于1M的图片!");
		}else{
			var fd = new FormData();
			fd.append("file1",file);
			console.log(fd);
			$.ajax({
				type:"post",
				url:serverPath +"/wks/empfile/save",
				headers:{token:localStorage.getItem("token")},
				data : fd ,
				dataType : "json",
				cache : false,
				contentType :　false,
				processData: false,
				beforeSend:function(){
					$("#loading").show();
				},
				success : function(result){
					if(result.success == "token"){
						alert(result.msg);
						window.parent.window.location.href = "login.html";
					}else if(result.success){
						resultData = result;
						console.log(resultData.data.EMPFILE_ID);
						$("."+_target).text("上传完成");
						$("."+_target).parent().css("background-color","#eee");
						$("."+_target).parent().next().show();
						console.log($("."+_target));
						
					}else{
						alert(result.msg);
					}
				},
				complete: function(){
			     	$("#loading").hide();
			    },
				error : function(){
					alert("系统网络异常!");
				}
			})
		}
	}
	 
	var flag = [];
	//addUpload 录取通知单上传(包括其它文件上传)
	function addUpload(_name,_fileCon,_target){
		var file = $(_fileCon)[0].files[0];
		console.log(file.size);
		if(file.size>1*1024*1024){
			alert("请上传小于1M的图片!");
		}else{
			
		    var fd = new FormData();
			fd.append(_name,file);
			fd.append("EMPFILE_ID",resultData.data.EMPFILE_ID);
			fd.append("EMPLOYEE_ID",resultData.data.EMPLOYEE_ID);
			$.ajax({
				type:"post",
				url:serverPath +"/wks/empfile/addUpload",
				headers:{token:localStorage.getItem("token")},
				data : fd ,
				dataType : "json",
				cache : false,
				contentType :　false,
				processData: false,
				beforeSend:function(){
					$("#loading").show();
				},
				success : function(result){
					console.log(result);
					if(result.success == "token"){
						alert(result.msg);
						window.parent.window.location.href = "login.html";
					}else if(result.success){
						$("."+_target).text("上传完成");
						$("."+_target).parent().css("background-color","#eee");
						$("."+_target).parent().next().show();
						//根据返回值显示模块
						flag.push(result.data);
						console.log(flag);
						for(var i=0;i<flag.length;i++){
							if(flag[i] == "1"){
								$(".hide").show();
							}
							if( (flag[i]=="11"&&flag[i+1]=="12") || (flag[i]=="12"&&flag[i+1]=="11") ){
								console.log("显示");
								$(".hide").show();
							}
							if(flag[i] == "14"){
								$(".hide").show();
							}
						}
					}else{
						alert(result.msg);
					}
				},
				complete: function(){
			     	$("#loading").hide();
			    },
				error: function(){
					alert("系统网络异常!");
				}
			});
		}
			
	}
		
//	//暂存提交表单
//	function tempSave(){
//		if(validForm().form()) {
//	        //通过表单验证，以下编写自己的代码
//	        var form = $("#myForm")[0];
//			console.log(form);
//			var fd = new FormData(form);
//			fd.append("EMPFILE_ID",resultData.data.EMPFILE_ID);
//			fd.append("EMPLOYEE_ID",resultData.data.EMPLOYEE_ID);
//			fd.append("EMP_NUM",resultData.data.EMP_NUM);
//			console.log(fd);
//			$.ajax({
//				type:"post",
//				url:serverPath +"/wks/employee/tempSave",  
//				headers:{token:localStorage.getItem("token")},
//				data : fd ,
//				dataType : "json",
//				cache : false,
//				contentType :　false,
//				processData: false,
//				beforeSend:function(){
//					$("#loading").show();
//				},
//				success : function(result){
//					console.log(result);
//					if(result.success == "token"){
//						alert(result.msg);
//						window.parent.window.location.href = "login.html";
//					}else if(result.success){
//						alert("暂存成功,请到待办处理!");
//						window.location.href = "entryManagement.html"; 
//					}else{
//						alert(result.msg);
//					}
//				},
//				complete: function(){
//			     	$("#loading").hide();
//			    },
//				error:function(){
//					alert("系统网络异常!");
//				}
//			});
//	    } else {
//	    	alert("请完善暂存必填信息!")
//	        //校验不通过，什么都不用做，校验信息已经正常显示在表单上
//	    }
//		
//	}
	
	//暂存提交表单
	function tempSave(){
		if(validFormNewEmp().form()) {
	        //通过表单验证，以下编写自己的代码
	        var form = $("#myForm")[0];
			console.log(form);
			var fd = new FormData(form);
			fd.append("EMPFILE_ID",resultData.data.EMPFILE_ID);
			fd.append("EMPLOYEE_ID",resultData.data.EMPLOYEE_ID);
			fd.append("EMP_NUM",resultData.data.EMP_NUM);
			console.log(fd);
			$.ajax({
				type:"post",
				url:serverPath +"/wks/employee/tempSave",  
				headers:{token:localStorage.getItem("token")},
				data : fd ,
				dataType : "json",
				cache : false,
				contentType :　false,
				processData: false,
				beforeSend:function(){
					$("#loading").show();
				},
				success : function(result){
					console.log(result);
					if(result.success == "token"){
						alert(result.msg);
						window.parent.window.location.href = "login.html";
					}else if(result.success){
						alert("暂存成功,请到待办处理!");
						window.location.href = "entryManagement.html"; 
					}else{
						alert(result.msg);
					}
				},
				complete: function(){
			     	$("#loading").hide();
			    },
				error:function(){
					alert("系统网络异常!");
				}
			});
	    }
	}


	//切换tab页显示名字
	function showName(){
		$(".tab h2").text($(".name").val());
	}


	//员工部门编码
	function findCode(rightValue){
		var bmCode = document.getElementById("bmCode");
		if(bmCode.value.length%2==0){
			if(bmCode.value.length<8){
				$.ajax({
					type:"post",
					url:serverPath +"/wks/deppost/findByDepNum",
					headers:{token:localStorage.getItem("token")},
					data:{"LAST_DEP_NUM":bmCode.value},
					success:function(result){
						var html ="";
						if(result.success){
							for(var i=0;i<result.data.length;i++){
								html += "<li>"+ result.data[i].LAST_DEP_NUM +"&nbsp;"+ result.data[i].ALL_DEP_NAME +"</li>";
							}
							$("#bmCodeList").empty().append(html);
							$("#bmCodeList").show();
						}else{
							$("#bmCodeList").hide();
						}
					}
				})
			}else{
				$.ajax({
					type:"post",
					url:serverPath +"/wks/deppost/findByDepNum",
					headers:{token:localStorage.getItem("token")},
					data:{"LAST_DEP_NUM":bmCode.value},
					success:function(result){
						//console.log(result);  //请求最后的数据 
						var html ="";
						if(result.success){
							//console.log(result.data.length);
							var len = result.data.length - 1;
							$("#Company").val(result.data[len].COMPANY);
							$("#Department").val(result.data[len].ALL_DEP_NAME);
							for(var i=0;i<result.data.length-1;i++){
								if (result.data[i].POST_NAME == rightValue) {
									html += "<option value="+result.data[i].POST_NAME+" selected>"+ result.data[i].POST_NAME +"</option>";
								} else {
									html += "<option value="+result.data[i].POST_NAME+">"+ result.data[i].POST_NAME +"</option>";
								}
								
							}
							$("#Post").empty().append(html);
						}else{
							$("#bmCodeList").hide();
						}
					}
				});
				$("#bmCodeList").hide();
			}
		}
	}
	
	//获取公司名称
	function companyListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/company/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].COMPANY+">" + result.data[i].COMPANY +"</option>";
					}
					$("#select_gs").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	//获取城市名称
	function cityListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/city/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].CITY+">" + result.data[i].CITY +"</option>";
					}
					$(".select_kqcs").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	//获取岗位类型
	function postTypeListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/posttype/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				//console.log(result);
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].POST_TYPE+">" + result.data[i].POST_TYPE +"</option>";
					}
					$("#POST_TYPE").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取职级
	function zhijiListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/zhiji/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				//console.log(result);
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].ZHIJI+">" + result.data[i].ZHIJI +"</option>";
					}
					$("#ZHIJI").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取服务经理
	function userListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/user/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].NAME+">" + result.data[i].NAME +"</option>";
					}
					$("#FUWU_JL").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取工资打款主体
	function zhuTiForGongZiListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/zhuTiForGongZi/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].ZHUTI_GONGZI+">" + result.data[i].ZHUTI_GONGZI +"</option>";
					}
					$(".ZHUTI_GONGZI").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取服务费打款主体
	function zhuTiForFuWuFeiListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/zhuTiForFuWuFei/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].ZHUTI_FUWUFEI+">" + result.data[i].ZHUTI_FUWUFEI +"</option>";
					}
					$(".ZHUTI_FUWUFEI").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取社保打款主体
	function zhuTiForSheBaoListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/zhuTiForSheBao/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].ZHUTI_SHEBAO+">" + result.data[i].ZHUTI_SHEBAO +"</option>";
					}
					$(".ZHUTI_SHEBAO").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取开户行
	function kaihuhangListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/kaihuhang/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].KAIHUHANG+">" + result.data[i].KAIHUHANG +"</option>";
					}
					$(".KAIHUHANG").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取社保参保账号和公积金账号
	function zhanghaoListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/zhanghao/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].ZHANGHAO+">" + result.data[i].ZHANGHAO +"</option>";
					}
					$(".ZHANGHAO").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}
	
	//获取合同主体
	function zhuTiForHeTongListAll(){
		$.ajax({
			type:"post",
			url: serverPath + "/wks/zhuTiForHeTong/listAll",
			headers:{token:localStorage.getItem("token")},
			dataType:"json",
			success: function(result){
				var html = "";
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					for(var i=0;i<result.data.length;i++){
						html += "<option value="+result.data[i].ZHUTI_HETONG+">" + result.data[i].ZHUTI_HETONG +"</option>";
					}
					$(".ZHUTI_HETONG").empty().append("<option value=''>--请选择--</option>").append(html);
				}else{
					alert(result.msg);
				}
			},
			error: function(){
				alert("系统网络异常！");
			}
		});
	}