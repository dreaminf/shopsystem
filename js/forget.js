var msgs=document.querySelectorAll(".showmsg");
$("#name").blur(function(){
	var msg=$(this).val();
	$.post(
		"../../php/lib/forget.php",
		{"type":"name","name":msg},
		function(data){
			console.log(data);
			if(data=="success"){
				msgs[0].innerHTML="&radic;";
				$("#phone").attr({"disabled":false});
				$("#name").attr({"disabled":"true"});
			}else{
				msgs[0].innerHTML="用户名错误";
				$("#phone").attr({"disabled":"true"});
			}
		}
	);
});

//手机号验证
$("#phone").blur(function(){
	var msg=$(this).val();
	var name=$("#name").val();
	$.post(
		"../../php/lib/forget.php",
		{"type":"phone","phone":msg,"name":name},
		function(data){
			console.log(data);
			if(data=="success"){
				msgs[1].innerHTML="&radic;";
				$("#phone").attr({"disabled":true});
				$("#newpwd").attr({"disabled":false});
			}else{
				msgs[1].innerHTML="手机号错误";
				$("#newpwd").attr({"disabled":"true"});
			}
		}
	);
});

//新密码
var Rgepwd=/\w{6,18}/; //密码最少6位，最大18位;
$("#newpwd").blur(function(){
	var pwd=$(this).val();
	if(Rgepwd.test(pwd)){
		msgs[2].innerHTML="&radic;";
		$("#checkpwd").attr({"disabled":false});
		$("#newpwd").attr({"disabled":true});

	}else{
		msgs[2].innerHTML="密码格式错误";
		$("#checkpwd").attr({"disabled":true});
	}
});
// 确认密码
$("#checkpwd").blur(function(){
	var checkpwd=$(this).val();
	var pwd=$("#newpwd").val();
	if(checkpwd==pwd){
		msgs[3].innerHTML="&radic;";
		$("#checkpwd").attr({"disabled":true});
		$("#btn").attr({"disabled":false});
		$("#pwdreset").attr({"disabled":true});

	}else{
		msgs[3].innerHTML="两次密码不一致";
		$("#btn").attr({"disabled":true});
		$("#pwdreset").attr({"disabled":false});
	}
});
//密码重置
$("#pwdreset").click(function(){
	$("#btn").attr({"disabled":true});
	$("#pwdreset").attr({"disabled":true});
	$("#checkpwd").attr({"disabled":true,"placeholder":"需与新密码一致"}).val();
	msgs[2].innerHTML="";
	msgs[3].innerHTML="";
	$("#newpwd").attr({"disabled":false,"placeholder":"6~18位,数字字母下划线"}).val("");
});


$("#btn").click(function(){
	var name=$("#name").val();
	var pwd=$("#newpwd").val();
	$.post(
		"../../php/lib/forget.php",
		{"type":"newpwd","pwd":pwd,"name":name},
		function(msg){
			if(msg=="success"){
				alert("新密码修改成功！");
				window.location.href="../login.html";
			}else{
				
				window.location.href="";
			}
		}
	);
});