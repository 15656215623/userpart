function showornone(classs){
	if(classs=="regedit"){
		$("#regedit").show();
		$("#login").hide();
		$("#ltab").css("border-bottom-color","#4d7704");
		$("#ltab").css("color","#4d7704");
		$("#rtab").css("color","#A8B4BB");
		$("#rtab").css("border-bottom-color","#ffffff");
	}else{
		$("#login").show();
		$("#regedit").hide();
		$("#rtab").css("border-bottom-color","#4d7704");
		$("#rtab").css("color","#4d7704");
		$("#ltab").css("color","#A8B4BB");
		$("#ltab").css("border-bottom-color","#ffffff");
	}
}
//注册页面
function comparepass(){
	var pass=$("#password").val();
	var rpass=$("#rpassword").val();
	if(pass==rpass){
		$("#rbutton").attr('type', 'submit');
	}else{
		$("#indect").html("两次密码不一致");
	}
}
var ve=new Vue({
	el:".mymess",
	data: {
		mess:'',
		ok: false,
    },
    methods: { 
    	login:function () { 
    		var that=this;
    		var name=$("#name").val();
    		var pass=$("#pass").val();
    		//开始ajax
    		$.ajax({
    		    type : "post",
    			url : "http://localhost:8080/PsychoSys/login.action",
    			dataType :"text",
    			data : {
    				username : name,
    				password : pass
    			},
    			success : function(ret) {
    				if(ret=="fail"){
    					that.ok=true;
    					that.mess="用户名或密码输入不正确";
    				}else{
    					localStorage.setItem("user",name);
    					localStorage.setItem("identy","user");
    					//跳转页面，把用户名和密码存储起来,这个是普通用户
    					window.location.href="index.jsp";
    				}
    			},
    		})
    		//开始ajax
    	}
    }
});


