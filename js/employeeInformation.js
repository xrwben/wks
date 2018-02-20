	var saveDatas = "";  //保存浏览器请求的数据
	var rows = $(".pagination_num select option:selected").val();  //每页显示数量
	var keyword = $("#keyWord").val();  //获取搜索关键字
	var currPage;  //当前页
	var initFlag=true;  //标记
	var _url = serverPath+'/wks/employee/list';
	var _data = {"currPage":currPage+1,"currNum":rows,"keywords":keyword,"FIND_RUZHI_STATUS":'1'};
	
	$(function() {
		PageCallback(0,null); 
	});
	$(".pagination_num select").change(function(){
		initFlag=true;
		rows = $(".pagination_num select option:selected").val();
		PageCallback(0,null); 
	});
	//分页查询start
	function PageCallback(currPage,jq){
		_data.currPage = currPage + 1,
		_data.currNum = rows,
		$.ajax({
			type:"POST",
			url: _url,
			data:_data,
			dataType:"JSON",
			headers:{token:localStorage.getItem("token")},
			success:function(result){
				console.log(result);
				if(result.success == "token"){
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}else if(result.success){
					if(initFlag){
						$("#pagePlugins").pagination(result.total,{
							items_per_page:rows,
							num_edge_entries:1,
							num_display_entries:1,
							callback:PageCallback
						});
						initFlag=false;
					};
					$(".jilu").text(result.total);
					$("#tableBox").empty();
					loadDataList(result.data,result.total);
				}else{
					alert(result.msg);
					window.parent.window.location.href = "login.html";
				}
			},
			error : function(){
				alert("系统网络异常！");
			}
		}); 
	} 
	//分页查询end
	//表格载入数据start
	function loadDataList(listData,total){
		var tableTh = `<tr>
						<th>序号</th>
						<th>服务类别</th>
						<th>员工编号</th>
						<th>身份证</th>
						<th>姓名</th>
						<th>电话</th>
						<th>部门</th>
						<th>岗位</th>
						<th>职级</th>
						<th>职等</th>
						<th>考勤城市</th>
						<th>员工状态</th>
						<th>用工类型</th>
						<th>合同起</th>
						<th>工资</th>
						<th>其他</th>
						<th>&emsp;</th>
					</tr>`;
		$("#tableBox").append(tableTh);
	 	var	html="";
	 	for(var i=0;i<listData.length;i++){
	 		var datas=listData[i];
	 		//请求数据成功后做判断
	 		switch(datas.RUZHI_STATUS){
	 			case "试用":
	 				var zt = `
							<a id="zz" href="javascript:void(0);" onclick="zzConfirmInfo('${datas.EMPLOYEE_ID}')">转正</a>
							<a id="lz" href="javascript:void(0);" onclick="lzConfirmInfo('${datas.EMPLOYEE_ID}');">离职</a>
							<a id="dd" href="javascript:void(0);" onclick="ddConfirmInfo('${datas.EMPLOYEE_ID}');">调动</a>
							<a href="viewEmployee.html?EMPLOYEE_ID=${datas.EMPLOYEE_ID}">查看</a>
						`;
						break;
	 			case "转正":
	 				var zt = `
							<a id="zz" class="gray" href="javascript:void(0);">转正</a>
							<a id="lz" href="javascript:void(0);" onclick="lzConfirmInfo('${datas.EMPLOYEE_ID}');">离职</a>
							<a id="dd" href="javascript:void(0);" onclick="ddConfirmInfo('${datas.EMPLOYEE_ID}');">调动</a>
							<a href="viewEmployee.html?EMPLOYEE_ID=${datas.EMPLOYEE_ID}">查看</a>
						`;
						break;
				case "离职":
					var zt = `
							<a id="zz" class="gray" href="javascript:void(0);">转正</a>
							<a id="lz" class="gray" href="javascript:void(0);">离职</a>
							<a id="dd" class="gray" href="javascript:void(0);">调动</a>
							<a href="viewEmployee.html?EMPLOYEE_ID=${datas.EMPLOYEE_ID}">查看</a>
						`;
						break;
				case "调动":
					var zt = `
							<a id="zz" class="gray" href="javascript:void(0);">转正</a>
							<a id="lz" class="gray" href="javascript:void(0);">离职</a>
							<a id="dd" class="gray" href="javascript:void(0);">调动</a>
							<a href="viewEmployee.html?EMPLOYEE_ID=${datas.EMPLOYEE_ID}">查看</a>
						`;
						break;
	 		};
	 		
	 		if(datas.TOWORK_TIME && datas.OUTWORK_TIME){
				//console.log(datas.TOWORK_TIME);
				datas.TOWORK_TIME = new Date(datas.TOWORK_TIME).format("yyyy-MM-dd");
				datas.OUTWORK_TIME = new Date(datas.OUTWORK_TIME).format("yyyy-MM-dd");
				//console.log(datas.TOWORK_TIME);
			}
	 		html += `<tr>
						<td>${i+1}</td>
						<td>${datas.SERVICE_TYPE || ""}</td>
						<td>${datas.EMP_NUM || ""}</td>
						<td>${datas.IDCARD || ""}</td>
						<td>${datas.NAME || ""}</td>
						<td>${datas.PHONE || ""}</td>
						<td>${datas.FIRST_DEP || ""}/${datas.SECOND_DEP || ""}/${datas.THIRD_DEP || ""}/${datas.DEPARTMENT || ""}</td>
						<td>${datas.POST_NAME || ""}</td>
						<td>${datas.ZHIJI || ""}</td>
						<td>${datas.ZHIDENG || ""}</td>
						<td>${datas.WORK_CITY || ""}</td>
						<td>${datas.RUZHI_STATUS || ""}</td>
						<td>${datas.CONTACT_TYPE || ""}</td>
						<td>${datas.TOWORK_TIME || ""}</td>
						<td>${datas.ZONG_GONGZI || ""}</td>
						<td>${datas.OTHER_COMMIT || ""}</td>
						<td class="bj_ck">
							${zt}
						</td>
					</tr>`;
		}
		$("#tableBox").append(html); 
	}
	//表格载入数据end
	
	//搜索功能
	function Search(){
		initFlag=true;
		keyword = $("#keyWord").val();
		_data = {"currPage":currPage+1,"currNum":rows,"keywords":keyword,"FIND_RUZHI_STATUS":'1'};
		console.log(keyword);
		PageCallback(0);
	}
	//筛选
	function qDselectInformation(){
		var kqcs = $("#select_kqcs").val();
		var gs = $("#select_gs").val();
		var zj = $("#ZHIJI").val();
		//var dkzt = $("#select_dkzt").val();
		var fwlb = $("#select_fwlb").val();
		var ygzt = $("#select_ygzt").val();
		var startdate = $("#START_DATE").val();
		var enddate = $("#END_DATE").val();
		initFlag=true;
		_url = serverPath + '/wks/employee/list';
		_data = {"currPage":currPage+1,"currNum":rows,"FIND_RUZHI_STATUS":'1',"WORK_CITY":kqcs,"COMPANY":gs,"ZHIJI":zj,"SERVICE_TYPE":fwlb,"RUZHI_STATUS":ygzt,"START_DATE":startdate,"END_DATE":enddate};
		PageCallback(0);
		closeModal();
	}
	
	//转正请求接口
	function zzConfirmInfo(employee_id){
		var btn = window.confirm("请确认是否让该员工[转正]！");
		if(btn == true){
			$.ajax({
				type:"post",
				url:serverPath + "/wks/employee/editZhuanZheng",
				headers:{token:localStorage.getItem("token")},
				data:{"EMPLOYEE_ID":employee_id},
				success: function(result){
					if(result.success){
						window.location.reload();
					}
				},
				error: function(){
					alert("系统网络异常！");
				}
			});
		}
	}
	//离职请求接口
	function lzConfirmInfo(employee_id){
		var btn = window.confirm("请确认是否需要给该员工办理[离职]手续！");
		if(btn == true){
			$.ajax({
				type:"post",
				url: serverPath + "/wks/employee/editLiZhi",
				headers:{token:localStorage.getItem("token")},
				data:{"EMPLOYEE_ID":employee_id},
				success: function(result){
					if(result.success){
						//window.location.reload();
						window.location.href = "editLeaveManager.html?EMPLOYEE_ID="+employee_id;
					}else{
						alert(result.msg);
					}
				},
				error: function(){
					alert("系统网络异常！");
				}
			});
		}
	}
	//调动请求接口
	function ddConfirmInfo(employee_id){
		var btn = window.confirm("请确认是否需要给该员工办理[调动]手续！");
		if(btn == true){
			$.ajax({
				type:"post",
				url:serverPath + "/wks/employee/editDiaoDong",
				headers:{token:localStorage.getItem("token")},
				data:{"EMPLOYEE_ID":employee_id},
				success: function(result){
					if(result.success){
						//window.location.reload();
						window.location.href = "editTransferManager.html?EMPLOYEE_ID="+employee_id;
					}
				},
				error: function(){
					alert("系统网络异常！");
				}
			});
		}
	}