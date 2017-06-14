// login.js
var datalogin=document.querySelectorAll(".logindata");
for(var i=0;i<datalogin.length;i++){
	datalogin[i].onblur=function(){
		checkNull();
	}
}

//注册跳转
registeraccount.onclick=function(){
	jpregister.click();
}
jpregister.onclick=function(){
	window.location.href="./register.html";
}

//登录管理账户点击
houtaiaccount.onclick=function(){
	adminAccount.click();
}
adminAccount.onclick=function(){
	window.location.href="admin/supermanage.html";
}

//检测登录时密码用户名密码不能为空
function checkNull(){
	if(user_login.value!=""){
		if(pwd_login.value!=""){
			login.disabled=false;
		}else{
			login.disabled=true;
		}
	}else{
		login.disabled=true;
	}
}


