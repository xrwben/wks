$(function(){
	//validFormNewEmp();
});
function validFormNewEmp(){
return $("#myForm").validate({
		errorElement: "span", 
		ignore: '',
		submitHandler: function(form) {      
	    	tempSave();     
	  	}, 
	    rules: {
		    NAME: {
		        required: true
		    }
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
	        NAME: "请输入姓名"
	    }
	});
}

