var tab=document.querySelectorAll("#tabtag>h4");
tab[0].onclick=function () {
	surperRegister.style.zIndex="2";
	surperRegister.style.opacity=1;
	surperLogin.style.zIndex="1";
	surperLogin.style.opacity=0;

}
tab[1].onclick=function () {
	surperRegister.style.zIndex="1";
	surperRegister.style.opacity=0;
	surperLogin.style.zIndex="2";
	surperLogin.style.opacity=1;
}
//注册判断
function checksuperRegister(){
	var Rgeuser=/^\w{5,17}/;//数字字母下划线开头，5~17位；
	var Rgepwd=/\w{6,18}/; //密码最少6位，最大18位;	
	

}

// 登录判断
