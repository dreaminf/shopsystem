// register.js
var checkR=document.querySelectorAll(".checkR");//获得需要验证的节点集合
var spans=document.querySelectorAll("#maxRegister>form>span");//所有问题的显示容器的节点集合
var flag=false; //是否全部通过验证状态；
function jsRegisterCheck(){
	var Rgeuser=/^\w{5,17}/;//数字字母下划线开头，5~17位；
	var Rgepwd=/\w{6,18}/; //密码最少6位，最大18位;
	var Regphonenum=/^1[34578]\d{9}$/;//手机号码
	var Regemail=/@\w{2,10}(\.com|\.cn|\.com\.cn)/; //邮箱验证
	if(!Rgeuser.test(ruser.value)){
			spans[0].innerHTML="用户名不合法！"
			spans[0].style.background="red";
			return;		
	}else{
		spans[0].innerHTML="&radic;";
		spans[0].style.background="green";
	}

	if(!Rgepwd.test(rpwd1.value)){
		spans[1].innerHTML="密码最少6位，最大18位";
		spans[1].style.background="red";
		return;
	}else {
		spans[1].innerHTML="&radic;";
		spans[1].style.background="green";
	}

	if(rpwd1.value!==rpwd2.value){
		spans[2].innerHTML="两次密码不一致！";
		spans[2].style.background="red";
		return;
	}else{
		spans[2].innerHTML="&radic;";
		spans[2].style.background="green";
	}
	if(!Regphonenum.test(rpnum.value)){
		spans[3].innerHTML="手机号码不正确！";
		spans[3].style.background="red";
		return;
	}else{
		spans[3].innerHTML="&radic;";
		spans[3].style.background="green";
	}
	if(!Regemail.test(remail.value)){
		spans[4].innerHTML="邮箱格式不正确!";
		spans[4].style.background="red";
		return;
	}else{
		spans[4].innerHTML="&radic;";
		spans[4].style.background="green";
	}
	return flag=true;//全部验证通过时
}

for(var i=0;i<checkR.length;i++){
	checkR[i].onblur =function(){
		if(jsRegisterCheck()){
			flag=false;
			register.disabled=false;
		}else{
			register.disabled=true;
		}
	}
}



jplogin.onclick=function(){
	window.location.href="./login.html";
}