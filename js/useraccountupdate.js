window.onload=function () {
	$.get(
		"../php/lib/readtest.php",
		"type=session",
		function(msg){
			if(msg!=1){
				location.href="./login.html";
			}
		//登录成功，请求数据
		$.get(
			"../php/lib/readtest.php",
			"type=userupdate",
			function(data){
				console.log(data);
				$("#realname").attr("value",data[0]);
				$("#utel").attr("value",data[1]);
				$("#uemail").attr("value",data[2]);
				$("#address").attr("value",data[3]);
				var sex=$(".sex");
				for(var i=0;i<sex.length;i++){
					if(data[4]==sex[i].value){
						sex[i].checked="true";
					}
				}
				
			},
			"json"
			);
		}
	);
}