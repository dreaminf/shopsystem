/**
 * ajax 判断旧密码是否输入正确
 * 判断是否登录 否则退回到登录页面
 * get post 请求
 */
function testOldpwd() {
	var spans=document.querySelectorAll("span");
	var show_hidd=document.querySelectorAll(".show-hidd");
	if($("input[name='oldpwd']").val()!=''){
		$.get(
			"../php/lib/readtest.php",
			"type=session",
			function(msg){
				if(msg==1){
					$.post(
						"../php/lib/readtest.php",
						{
							"type":"changepwd",
							"oldpwd":$("input[name='oldpwd']").val()
						},
						function(data){
							if(data[0]==$("input[name='oldpwd']").val()){
								spans[0].innerHTML="&radic;";
								//  新密码才可以输入
								show_hidd[0].disabled=false;
								// show_hidd[1].disabled=false;
								spans[1].innerHTML="请输入新密码";
							}else{
								show_hidd[0].disabled=true;
								show_hidd[1].disabled=true;
								spans[0].innerHTML="旧密码错误！";
								spans[1].innerHTML="";
							}
						},
						"json"
						);

				}else{
					window.location.href="login.html";
				}
			}
			);
	}else{
		spans[0].innerHTML="用户名不能为空";
	}
}

/**
 * 判断新密码不为空并符合正则 且解锁确认密码
 */
function testneww1pwd(){
	var spans=document.querySelectorAll("span");
	var show_hidd=document.querySelectorAll(".show-hidd");
	var Rgepwd=/\w{6,18}/;

	if(!Rgepwd.test($('#newpwd1').val())){
		spans[1].innerHTML="密码最少6位，最大18位";
		spans[1].style.background="red";
		show_hidd[1].disabled=true;
		return;
	}else {
		spans[1].innerHTML="&radic;";
		spans[1].style.background="green";
		show_hidd[1].disabled=false;
	}

}
/**
 * 确认新密码进行判断
 * 返回解锁提交按钮的状态
 */
function testneww2pwd(){
	var flag=false;
	var spans=document.querySelectorAll("span");
	if($('#newpwd1').val()!=$('#newpwd2').val()){
		spans[2].innerHTML="两次密码不一致！";
		return;
	}else{
		spans[2].innerHTML="&radic;";
		spans[2].style.background="green";
		return flag=true;
	
	}

}
$("input[name='oldpwd']").blur(function(){
	testOldpwd();
});

$("#newpwd1").blur(function(){
	testneww1pwd();
});
$("#newpwd2").blur(function(){
	if(testneww2pwd()){
		$('#changepwdbtn')[0].disabled=false;
	}else{
		$('#changepwdbtn')[0].disabled=true;
	}
});