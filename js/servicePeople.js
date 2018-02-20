//首页顶部服务总人数的统计
function findServicePeople(){
	$.ajax({
		type:"post",
		url:serverPath + "/wks/employee/findServicePeople",
		headers:{token:localStorage.getItem("token")},
		dataType : "json",
		success : function(result){
			console.log(result);
			if(result.success == "token"){
				alert(result.msg);
				window.parent.window.location.href = "login.html";
			}else if(result.success){
				$(".serviceTotal").text(result.data);
			}else{
				alert(result.msg);
			}
		},
		error: function(){
			alert("系统网络异常！");
		}
	});
}

//本月提示事项入职待办
function findAllRuZhiDaiBan(){
	$.ajax({
		type:"post",
		url:serverPath + "/wks/employee/findAllRuZhiDaiBan",
		headers:{token:localStorage.getItem("token")},
		dataType : "json",
		success : function(result){
			console.log(result);
			if(result.success == "token"){
				alert(result.msg);
				window.parent.window.location.href = "login.html";
			}else if(result.success){
				$(".findAllRuZhiDaiBan").text(result.data);
			}else{
				alert(result.msg);
			}
		},
		error: function(){
			alert("系统网络异常！");
		}
	});
}
//本月提示事项离职待办
function findAllLiZhiDaiBan(){
	$.ajax({
		type:"post",
		url:serverPath + "/wks/employee/findAllLiZhiDaiBan",
		headers:{token:localStorage.getItem("token")},
		dataType : "json",
		success : function(result){
			console.log(result);
			if(result.success == "token"){
				alert(result.msg);
				window.parent.window.location.href = "login.html";
			}else if(result.success){
				$(".findAllLiZhiDaiBan").text(result.data);
			}else{
				alert(result.msg);
			}
		},
		error: function(){
			alert("系统网络异常！");
		}
	});
}
//本月提示事项调动待办
function findAllDiaoDongDaiBan(){
	$.ajax({
		type:"post",
		url:serverPath + "/wks/employee/findAllDiaoDongDaiBan",
		headers:{token:localStorage.getItem("token")},
		dataType : "json",
		success : function(result){
			console.log(result);
			if(result.success == "token"){
				alert(result.msg);
				window.parent.window.location.href = "login.html";
			}else if(result.success){
				$(".findAllDiaoDongDaiBan").text(result.data);
			}else{
				alert(result.msg);
			}
		},
		error: function(){
			alert("系统网络异常！");
		}
	});
}

//首页顶部服务各类人数情况的统计
function findFourCount(){
	$.ajax({
		type:"post",
		url:serverPath + "/wks/employee/findFourCount",
		headers:{token:localStorage.getItem("token")},
		dataType : "json",
		success : function(result){
			console.log(result);
			if(result.success == "token"){
				alert(result.msg);
				window.parent.window.location.href = "login.html";
			}else if(result.success){
				$(".ruzhi").text(result.data[0].value);
				$(".shiyong").text(result.data[2].value);
				$(".zhuangzheng").text(result.data[3].value);
				$(".lizhi").text(result.data[1].value);
			}else{
				alert(result.msg);
			}
		},
		error: function(){
			alert("系统网络异常！");
		}
	});
}

//首页入职时间段统计图表
function findRuZhiTime(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart'));
    // 指定图表的配置项和数据
    optionPie = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	       // orient: 'vertical',
	        x: 'left',
	        data:[]
	    },
	    series: [
	        {
	            name:'办理时间段',
	            type:'pie',
	            radius: ['50%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[]
	        }
	    ]
	}
	myChart.showLoading({text:'读取数据中...'});
 
	var value=[];
	var name = [];
	$.ajax({
		type:"post",
	    url:serverPath + "/wks/employee/findRuZhiTime",
	    headers:{token:localStorage.getItem("token")},
	    dataType:"json",
	    success:function(result){
	    	//var result = JSON.parse(result)
	    	console.log(result);
	    	console.log(result.data[0].name);
         	var Item = function(){  
                return {  
                    name:'',  
                    value:''
                }  
           	}; 
         	for(var i=0;i < result.data.length;i++){  
                var it = new Item(); 
                it.name = result.data[i].name;  
                it.value = result.data[i].value;  
                value.push(it); 
                name.push(it.name);
            }  
	
		    myChart.hideLoading();
		    optionPie.series[0].data=value;
		    //console.log(value);
		    optionPie.legend.data=name;
		    myChart.setOption(optionPie);  
	    }
	})
	// 使用刚指定的配置项和数据显示图表。
	//myChart.setOption(optionPie);
}

//首页在职统计图表
function zzCount(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart_count'));
	
    // 指定图表的配置项和数据
    optionPies = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	       // orient: 'vertical',
	        x: 'left',
	        data:[]
	    },
	    series: [
	        {
	            name:'在职统计',
	            type:'pie',
	            radius: ['50%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[]
	        }
	    ]
	}
	myChart.showLoading({text:'读取数据中...'});
 
	var value=[];
	var name = [];
	$.ajax({ 
		type:"post",
	    url:serverPath + "/wks/employee/findFourCount",
	    headers:{token:localStorage.getItem("token")},
	    dataType:"json",
	    success:function(result){
	    	//var result = JSON.parse(result)
	    	console.log(result);
	    	console.log(result.data[0].name);
         	var Item = function(){  
                return {  
                    name:'',  
                    value:''
                }  
           	}; 
         	for(var i=0;i < result.data.length;i++){  
                var it = new Item(); 
                it.name = result.data[i].name;  
                it.value = result.data[i].value;  
                value.push(it); 
                name.push(it.name);
            }  
	
		    myChart.hideLoading();
		    optionPies.series[0].data=value;
		    //console.log(value);
		    optionPies.legend.data=name;
		    //console.log(label);
		    //console.log( optionPie.series[0].data);
		    myChart.setOption(optionPies);  
	    }
	})
	// 使用刚指定的配置项和数据显示图表。
	//myChart.setOption(optionPie);
}