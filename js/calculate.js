    //自动计算总底薪
	function calculateZDX(){
		var sum = 0;
		$(".jsdx").each(function(){
			sum += parseFloat($(this).val());
		})
		console.log(sum);
		$(".zong_dixin").val(sum);
	}
	//计算总补助
	function calculateZBZ(){
		var sum = 0;
		$(".jsbz").each(function(){
			sum += parseFloat($(this).val());
		})
		//console.log(sum);
		$(".zong_buzhu").val(sum);
	}
	//计算总工资
	$(".ZONG_GONGZI").focus(function(){
		var sum = parseFloat($(".ZONG_DIXIN").val())+parseFloat($(".ZONG_BUZHU").val())+parseFloat($(".JIXIAO_SALARY").val())+parseFloat($(".TICHENG_SALARY").val());
		$(this).val(sum);
		//console.log(sum);
		//计算日工资
		if($(".REST_TYPE").val() == "长短周" || $(".REST_TYPE").val() == "双休"){
			var daySalary = (parseFloat($(".ZONG_DIXIN").val())/parseFloat(21.75)).toFixed(2);
			console.log(daySalary);
			$(".DAY_SALARY").val(daySalary)
		}
		if($(".REST_TYPE").val() == "单休"){
			var daySalary = (parseFloat($(".ZONG_DIXIN").val())/parseFloat(26)).toFixed(2);
			console.log(daySalary);
			$(".DAY_SALARY").val(daySalary)
		}
	})
	
	
	//计算总社社保
	function calculateSB(){
		var sum = 0;
		$(".jssb").each(function(){
			sum += parseFloat($(this).val());
		})
		console.log(sum);
		$(".SHEBAO_ZJ").val(sum);
	}
	//计算总公积金
	function calculateGJJ(){
		var sum = 0;
		$(".jsgjj").each(function(){
			sum += parseFloat($(this).val());
		})
		$(".GONGJJ_ZJ").val(sum);
	}
//	//社保账号==公积金
//	function sendGjj(){
//		$(".GJJ_ACCOUNT").val($(".SHEBAO_ACCOUNT").val());
//	}