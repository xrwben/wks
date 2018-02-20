$(function(){
	validFormPdf();
});
function validFormPdf(){
return $("#myForm").validate({
		errorElement: "span", 
		ignore: '',
		submitHandler: function(form) {      
	    	loadPDF();     
	  	}, 
	    rules: {
		    NAME: {
		        required: true
		    },
		    SEX: {
		        required: true
		    },
		    IDCARD: {
		        required: true,
		        idCard : true
		    },
		    PHONE:{
		      	required: true,
		      	phone: true
		    },
		    EMAIL: {
		    	required :  true,
		      	email : true
		    },
		    ADDRESS: {
		    	required: true
		    },
		    BANK_TYPE: {
		    	required: true
		    },
		    BANK_CITY: {
		    	required: true
		    },
		    BANK_ACCOUNT: {
		    	required: true,
		    	creditcard : true
		    },
		    EMERGENCY_MAN:{
		    	required: true
		    },
		    EMERGENCY_PHONE: {
		    	required: true,
		    	phone: true
		    },
		    EMP_NUM: {
		    	required: true
		    },
		    AGREE_MAN: {
		    	required: true
		    },
		    MAIN_BODY: {
		    	required: true
		    },
		    TOWORK_TIME: {
		    	required: true
		    },
		    LAST_DEP_NUM: {
		    	required: true,
		    	maxlength: 8
		    },
		    COMPANY: {
		    	required: true
		    },
		    POST: {
		    	required: true
		    },
		    OUTWORK_TIME: {
		    	required: true
		    },
		    
		    WORK_CITY: {
		    	required: true
		    },
		    USERNAME: {
		    	required: true
		    },
		    MONEY_BODY: {
		    	required: true
		    },
		    JIXIAO_SALARY: {
		    	required: true,
		    	number: true
		    },
		    ZONG_DIXIN: {
		    	required: true,
		    	number: true
		    },
		    DAY_SALARY: {
		    	required: true,
		    	number: true
		    },
//		    SHEBAO_CITY: {
//		    	required: true
//		    },
//		    SHEBAO_BODY: {
//		    	required: true
//		    },
//		    SHEBAO_ACCOUNT: {
//		    	
//		    },
//		    GJJ_ACCOUNT: {
//		    	required: true
//		    }
	    },
	    messages: {
	    	file1: { 
	    		required: "请上传文件",
	    		filetype: "请上传图片格式的文件" 
	    	},
	    	file2: { 
	    		required: "请上传文件",
	    		filetype: "请上传图片格式的文件" 
	    	},
	        NAME: "请输入姓名",
		    SEX: {
		        required: "请请选择性别"
		    },
		    IDCARD: {
		        required: "请填写身份证号码",
		        idCard: "请填写正确的身份证号码"
		    },
		    PHONE: {
		        required: "请填写手机号码",
		        phone: "请填写正确的手机号码"
		    },
	        EMAIL: "请输入一个正确的邮箱地址",
	        ADDRESS: "请输入通讯地址",
	        BANK_TYPE: "请输入开户行",
	        BANK_CITY: "请输入支行",
	        BANK_ACCOUNT: {
		    	required: "请输入银行卡号",
		    	creditcard : "请输入正确的银行卡号"
		    },
		    EMERGENCY_MAN: "请输入紧急联系人",
		    EMERGENCY_PHONE: {
		        required: "请填写紧急联系人",
		        phone: "请填写正确的手机号码"
		    },
		    EMP_NUM: "请输入员工编号",
		    AGREE_MAN: "请填写审批人",
		    MAIN_BODY: "请填写合同主体",
		    TOWORK_TIME: "请选择入职时间",
		    LAST_DEP_NUM: {
		    	required:"请填写员工部门编码",
		    	maxlength:"不能超过8位编码"
		    },
		    COMPANY: "请输入公司名称",
		    POST: "请填写岗位信息",
		    OUTWORK_TIME: "请填写合同止时间",
		    WORK_CITY: "请输入考勤城市",
		    USERNAME: "请输入服务经理",
		    MONEY_BODY: "请填写打款主体",
		    JIXIAO_SALARY: {
		    	required: "请填写绩效总额",
		    	number: "请输入正确的数字"
		    },
		    ZONG_DIXIN: {
		    	required: "请填写薪资总额",
		    	number: "请输入正确的数字"
		    },
		    DAY_SALARY: {
		    	required: "请填写日工资",
		    	number: "请输入正确的数字"
		    },
//		    SHEBAO_CITY: "请填写参保城市",
//		    SHEBAO_BODY: "请填写社保主体",
//		    SHEBAO_ACCOUNT: "请填写社保主体",
//		    GJJ_ACCOUNT: "请填写社保主体"
	    }
	});
}

/*-------------扩展验证规则 -------------*/
//手机验证规则  
jQuery.validator.addMethod("phone", function (value, element) {
    var phone = /^1[3|4|5|7|8]\d{9}$/;
	return this.optional(element) || (phone.test(value));
}, "手机格式不对");

//身份证
jQuery.validator.addMethod("idCard", function (value, element) {
    var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
    var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)
    return this.optional(element) || (isIDCard1.test(value)) || (isIDCard2.test(value));
}, "请正确填写正确的身份证号");

//文件上传扩展
jQuery.validator.addMethod("filetype",function(value,element,param){
	var fileType = value.substring(value.lastIndexOf(".") + 1).toLowerCase(); 
	return this.optional(element) || $.inArray(fileType, param) != -1;
}, $.validator.format("invalid file type"));
