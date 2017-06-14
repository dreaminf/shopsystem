//判断是否登录
$.get(
	"../../php/lib/readtest.php",
	"type=sellersession",
	function(msg){
		if(msg!=1){
			window.location.href="sellerRegsiterLogin.html";
		}
	}
);

//请求未完成订单数据
$("#unorder").click(function(){
	$(this).attr("style","background-color:skyblue");
	$("#showalorder").attr("style","display:none");
	$("#showunorder").html("");
	$("#alorder").attr("style","background-color:rgba(240,0,0,0.5);");
	$.post(
		"../../php/lib/sellershoworder.php",
		"type=unorder",
		function(data){
			console.log(data);
			if(data.length>0){
				$("#showunorder").attr("style","display:block").css({"background-color":"skyblue"});
				var h3=$("<h3></h3>").html("未完成订单<br>").css({"color":"red","text-align":"center","border-bottom":"1px solid gray"});
				$("#showunorder").append(h3);
				for(var i in data){
					var div=$("<div></div>").css({"border-bottom":"1px solid gray","padding":"20px"}).addClass("every");
					for(var j in data[i]){
						var h41=$("<h4></h4>").html("订单编号："+data[i]['order_id']);
						var date=new Date(Number(data[i]['date'])*1000);
						var year=date.getFullYear();
						var month=date.getMonth()+1;
						var day=date.getDate();
						var hour=date.getHours();
						var minutes=date.getMinutes();
						var date2=year+"/"+month+"/"+day+"/"+hour+":"+minutes;
						var h42=$("<h4></h4>").html("订单日期："+date2);

						var leftdiv=$("<div></div>").attr({"style":"float:left;width:30%;"}).append(h41,h42);
						var name=$("<h3></h3>").html(data[i]["name"]);
						var img=$("<img>").attr({"src":data[i]['imgpath'],"width":"50%","height":"100px"});
						var count=$("<span></span>").html("购买数量:"+data[i]['count']);
						var br=$("<br/>");
						var price=$("<span></span>").html("单价￥："+data[i]['price']);
						var totalprice=$("<span></span>").html("总价￥："+Number(data[i]['count'])*Number(data[i]['price']));
						var rightdiv=$("<div></div>").append(name,img,br,count,price,totalprice).attr({"style":"width:70%;float:left;text-align:center"});
						var username=$("<p></p>").html("&nbsp;&nbsp;&nbsp;买家用户："+data[i]['username']).css({"color":"white","font-size":"25px","font-weight":"400"});
					}
					div.append(username,leftdiv,rightdiv);
					$("#showunorder").css({"width":"70%","border-left":"1px solid gray","padding":"20px"}).append(div);
				}

			}else{
				
				$("#showunorder").attr("style","display:block").html("您没有未完成订单！");
			}
		},
		"json"
	);
});

// 请求已完成订单信息

$("#alorder").click(function(){
	$(this).attr("style","background-color:skyblue");
	$("#showunorder").attr("style","display:none");
	$("#unorder").attr("style","background-color:rgba(240,0,0,0.5);");
	$("#showalorder").html("");
	$.post(
		"../../php/lib/sellershoworder.php",
		"type=alorder",
		function(data){
			console.log(data);
			if(data.length>0){
				$("#showalorder").attr("style","display:block").css({"background-color":"skyblue"});
				var h3=$("<h3></h3>").html("已完成订单").css({"color":"red","text-align":"center","border-bottom":"1px solid gray"});
				$("#showalorder").append(h3);
				for(var i in data){
					var div=$("<div></div>").css({"border-bottom":"1px solid gray","padding":"20px"}).addClass("every");
					for(var j in data[i]){
						var h41=$("<h4></h4>").html("订单编号："+data[i]['order_id']);
						var date=new Date(Number(data[i]['date'])*1000);
						var year=date.getFullYear();
						var month=date.getMonth()+1;
						var day=date.getDate();
						var hour=date.getHours();
						var minutes=date.getMinutes();
						var date2=year+"/"+month+"/"+day+"/"+hour+":"+minutes;
						var h42=$("<h4></h4>").html("订单日期："+date2);

						var leftdiv=$("<div></div>").attr({"style":"float:left;width:30%;"}).append(h41,h42);
						var name=$("<h3></h3>").html(data[i]["name"]);
						var img=$("<img>").attr({"src":data[i]['imgpath'],"width":"50%","height":"100px"});
						var count=$("<span></span>").html("购买数量:"+data[i]['count']);
						var br=$("<br/>");
						var price=$("<span></span>").html("单价￥："+data[i]['price']);
						var totalprice=$("<span></span>").html("总价￥："+Number(data[i]['count'])*Number(data[i]['price']));
						var rightdiv=$("<div></div>").append(name,img,br,count,price,totalprice).attr({"style":"width:70%;float:left;text-align:center"});
						var username=$("<p></p>").html("&nbsp;&nbsp;&nbsp;买家用户："+data[i]['username']).css({"color":"white","font-size":"25px","font-weight":"400"});
					}
					div.append(username,leftdiv,rightdiv);
					$("#showalorder").css({"width":"70%","border-left":"1px solid gray","padding":"20px"}).append(div);
				}

			}else{
				var a=$("<a></a>").html("继续购物").attr("href","../index.html");
				$("#showalorder").attr("style","display:block").html("您没有历史完成订单！").append(a);
			}
		},
		"json"
	);
});
