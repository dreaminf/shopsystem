window.onload=function(){
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
			"type=usercenter",
			function(data){
				// console.log(data);
				// console.log($("h2"));
				$("h2").html(data[0]+"用户欢迎回来！");
				for(var i in data){
					if(data[i]!==null && i!=5){
						i=parseInt(i);
					$("ul>li:nth-child("+(i+1)+")")[0].innerHTML+=data[i];
					}
					if(i==5){
						switch(data[i]){
							case "0":
								$("ul>li:nth-child(6)")[0].innerHTML+=":保密";
								break;
							case "1":
								$("ul>li:nth-child(6)")[0].innerHTML+=":女";
								break;
							case "2":
								$("ul>li:nth-child(6)")[0].innerHTML+=":男";
								break;
						}
					}
				}
			},
			"json"
			);
		}
	);

}

$("#recharge").click(function(){
	$("input[type='submit']")[0].style.display="inline-block";
	$("input[type='number']")[0].style.display="inline-block";
	$("input[type='button']")[0].style.display="inline-block";
});
$("#quitcharge").click(function(){
	$("input[type='submit']")[0].style.display="none";
	$("input[type='number']")[0].style.display="none";
	$("input[type='button']")[0].style.display="none";
});

$("#doaddmoney").click(function(){
	$.post(
		"../php/lib/readtest.php",
		{
			"type":"usermoney",
			"addMoney":Number($("#addMoney").val()),
		},
		function(data){
			$("ul>li:last-child")[0].innerHTML="余额：￥"+data[0];
			$("input[type='submit']")[0].style.display="none";
			$("input[type='number']")[0].style.display="none";
			$("input[type='button']")[0].style.display="none";
		},
		"json"
		);
});