function getmess(){
	//1.获取手机号码
	var tell=$("#name").val();
		//开始ajax
		$.ajax({
		    type : "post",
			url : "http://localhost:8080/PsychoSys/sendmess.action",
			dataType :"text",
			data : {
				tell : tell
			},
			success : function(ret) {
				//关闭模态框
				var jb= eval('(' + ret + ')');  
			   //根据:分成前后两个，然后前面的校验码，后面的是时间，存储起来为全局变量
				localStorage.setItem("jym",jb.screct);
				localStorage.setItem("time",new Date().getTime());
			},
		})
		//开始ajax
}
function comparepass(){
	var my=$("#jym").val();
	var tell=$("#name").val();
	//从存储里面获取
	var jym=localStorage.getItem("jym");
	var t=localStorage.getItem("time");
	var time1 =new Date().getTime();
	var zc=(time1-t)/300000;
	if(my==jym&&zc<5){
		//存储手机号码，让他进入index.jsp页面
		localStorage.setItem("user",tell);
		localStorage.setItem("identy","user");
		//跳转页面，把用户名和密码存储起来,这个是普通用户
		window.location.href="index.jsp";
	}else{
		//提示验证码不正确，或者超时
		this.mess="验证输入不正确或超时";
		$("#jym").val('');
	}
}

//js
var vm = new Vue({
	el: ".vueBox",
	data: { 
		sendAuthCode:true,
		auth_time:0,
		mess:''
			}, 
        methods: { 
        	getAuthCode:function () { 
        		var tell=$("#name").val();
        		if(tell.length==11){
        			this.sendAuthCode = false;
            		this.auth_time=60;
            		var at = setInterval(()=>{
            			if(this.auth_time==60){
                			getmess();
                		}
            			this.auth_time--;
                    if(this.auth_time<=0){
                        this.sendAuthCode = true;
                        clearInterval(at);
                    }
                }, 1000);
        		}else{
        			this.mess="手机号码格式不对";
        		}
        		
        }
    }
});
