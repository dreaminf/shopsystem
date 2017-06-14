window.onload=function(){
	$.get(
		"php/lib/readtest.php",
		"type=session",
		function(msg){
			if(msg!=1){
				document.getElementById("account_login_register").style.display="block";
				document.getElementById("account_query").style.display="none";
			}else{
				document.getElementById("account_login_register").style.display="none";
				document.getElementById("account_query").style.display="block";
			}
		//登录成功，请求数据
		$.get(
			"php/lib/readtest.php",
			"type=userdata",
			function(data){
				$("#username").html(data);
			}
		);
		}
	);
}
//logout
document.querySelector("#quit-login").onclick=function(){
	location.href="php/lib/logout.php";
}
//personcenter
document.querySelector("#person-center").onclick=function(){
	location.href="html/personcenter.html";
}

//显示商品  分页技术
function showShop(index){
	$("#shop").html("");
	$.post(
		"php/lib/index.php",
		{"type":"indexshop","index":index},
		function(data){
			console.log(data);
			for(var i in data){
				(function(j){
					var div=$("<div></div>").attr("style","text-align:center;box-sizing:border-box;padding:20px;");
					var img=$("<img>").attr({"src":data[j]['imgpath'],"alt":data[j]['description'],"title":data[j]['description'],"width":"80%","height":"200px"}).css({"cursor":"pointer"});
					var name=$("<h4></h4>").html(data[j]['name']);
					var description=$("<h5></h5>").html(data[j]['description']);
					var price=$("<span></span>").html(data[j]['price']+"￥");
					div.append(img,name,description,price);
					div.css({"cursor":"pointer"}).click(function(){
						window.location.href="html/shopDetial.html?id="+data[j]["id"];
					});
					$("#shop").append(div);
				})(i);
				
			}
			
		},
		"json"
		);

}
showShop(1);
$(document).ready(function(){
	$.post(
		"php/lib/index.php",
		"type=pagenum",
		function(msg){
			var num=parseInt(msg);
			for(var i=1;i<=num;i++){
				(function(j){
					var atag=$("<a href='javascript:void(0);'></a>").html("第"+j+"页").click(function(){
							showShop(j);
						});
					$("#page").append(atag);
				})(i);
				
			}
		}
		);
});

//跳转我的订单
$("#myorder").click(function(){
	window.location.href="html/userorder.html";
});