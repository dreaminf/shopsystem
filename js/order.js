// 收货地址
$.get(
	"../php/lib/order.php",
	"type=address",
	function(msg){
		console.log(msg);
		if(msg['realname']!=null && msg['realname']!=""){
			$("#realname").html(msg["realname"]);
		}else{
			$("#realname").html("请修改收货人");
		}
		
		$("#phone").html(msg["phone"]);
		if(msg['address']!=null && msg['address']!=""){
			$("#address").html(msg['address']+"&nbsp;&nbsp;&nbsp;");
		}else{
			$("#address").html("还没有地址，请新增地址"+"&nbsp;&nbsp;&nbsp;");
		}
		// 请求 快递数据
		$.get(
			"../php/lib/order.php",
			"type=express",
			function(exp){
				for(var i in exp){
					var option=$("<option></option>");
					for(var j in exp[i]){
						option.val(exp[i]["id"]).html(exp[i]["name"]);
					}
					$("#express").append(option);

				}
				//请求订单信息，并将快递信息更新至订单信息
				$.post(
					"../php/lib/order.php",
					{"type":"requsetorder","express":$("#express").val()},
					function(data){
						if(data.length>0){

						
						var date=new Date(Number(data[0]["date"])*1000);
						var year=date.getFullYear();
						var month=date.getMonth()+1;
						var day=date.getDate();
						var hour=date.getHours();
						var minutes=date.getMinutes();
						var date2=year+"年"+month+"月"+day+"日"+hour+"时"+minutes+"分";
						$("#iddate").html(date2);
						$("#idnum").html(data[0]["order_id"]);
						if(data[0]["mark"]!=null && data[0]["mark"]!=""){
							$("#textarea").val(data[0]["mark"]);
						}else{
							$("#textarea")[0].placeholder="备注区：需要额外说明的订单问题包含配送区域，注意事项等,120字以内";
						}
						var sumprice=0;
						for(var i in data){
							var tr=$("<tr></tr>");
							for(var j in data[i]){
								if(j!="order_id" && j!="date" &&j!="mark"){
									var total=parseFloat(data[i]["count"])*parseFloat(data[i]["price"]);
									var td1=$("<td></td>").html(data[i]["name"]);
									var td2=$("<td></td>").html(data[i]["count"]);
									var td3=$("<td></td>").html(data[i]["price"]);
									var td4=$("<td></td>").html("&yen;:"+total).addClass("price");
									
									
								}
								console.log(j);
							
							
							}
							sumprice+=total;
							tr.append(td1,td2,td3,td4);
							$("tbody").append(tr);
						}

						$("#total").html("&yen;:"+sumprice);

					}else{
						$("#pay").attr("disabled",true);
						$("#quitpay").attr("disabled",true);

					}

					},
					"json"

					);
			},
			"json"

		);
	},
	"json"
);
//快递更改 写入数据库
$("#express").change(function(){
	var that=$(this);
	var expressid=that.val();
	$.post(
		"../php/lib/order.php",
		"type=updateexpress&id="+expressid,
		function(msg){
			console.log(msg);
		}
	);
});
//备注更改，更新至数据库
$("#textarea").change(function(){
	var msg=$(this).val();
	$.post(
		"../php/lib/order.php",
		{"type":"msg","mark":msg},
		function(msg){
			console.log(msg);
		}
	);
});
//修改收货人
$("#namebtn").click(function(){
	$("#newname").attr({"style":"visibility:visible"});
	$("#newnamebtn").attr({"style":"visibility:visible"});
});
// 修改收货人 更新数据库
$("#newnamebtn").click(function(){
	var newname=$("#newname").val();
	$.post(
		"../php/lib/order.php",
		{"type":"newname","newnamemsg":newname},
		function(newname){
			if(newname==400){
				console.log(newname);
				$("#realname").html($("#newname").val());
			}
			$("#newname").attr({"style":"visibility:hidden"});
			$("#newnamebtn").attr({"style":"visibility:hidden"});

		}
	);
});

//添加新地址
$("#addaddress").click(function(){
	$("#inputaddress").attr({"style":"visibility:visible"});
	$("#affirm").attr({"style":"visibility:visible"});
});
// 修改新地址
$("#affirm").click(function(){
	var newaddress=$("#inputaddress").val();
	$.post(
		"../php/lib/order.php",
		{"type":"newaddress","addressmsg":newaddress},
		function(newadd){
			if(newadd==400){
				console.log(newadd);
				$("#address").html(newaddress);
			}
			console.log(newadd);
			$("#inputaddress").attr({"style":"visibility:hidden"});
			$("#affirm").attr({"style":"visibility:hidden"});

		}
	);
});

//付款
$("#pay").click(function(){
	var totalprice=$("#total").html();
	var totalmoney=totalprice.substr(2);
	$.post(
		"../php/lib/order.php",
		"type=checkmoney&totalprice="+totalmoney,
		function(msg){
			var msg1=Number(msg);
			if(msg1>=0){
				$("#cash").attr({"style":"visibility:visible"}).val(totalprice);
				$("#cashbtn").attr({"style":"visibility:visible"});
				$("#quitbtn").attr({"style":"visibility:visible"});
			}else{
				alert("您的余额不足，请充值！");
				window.location.href="personcenter.html";
			}
		}
	);
	
});
$("#quitbtn").click(function(){
	$("#cash").attr({"style":"visibility:hidden"}).val("");
	$("#cashbtn").attr({"style":"visibility:hidden"});
	$("#quitbtn").attr({"style":"visibility:hidden"});
});
// 付款后数据库状态改为已付款 商品数量减少，个人钱数减少
$("#cashbtn").click(function(){
	var payprice=$("#cash").html();
	var paymoney=payprice.substr(2);
	$.post(
		"../php/lib/order.php",
		{"type":"paymoney","payprice":paymoney},
		function(pay){
			console.log(pay);
			if(pay==200){
				alert("支付成功！");
				window.location.href="alreadyorder.html";
			}else{
				alert("支付失败！");
			}
		}

	);
});

//取消订单
$("#quitpay").click(function(){
	var firm=confirm("真的取消订单吗？");
	if(firm){
		$.post(
			"../php/lib/order.php",
			"type=quitpay",
			function(msg){
				if(msg==400){
					alert("订单取消成功");
					window.location.href="../index.html";
				}else{
					alert("订单取消失败");
				}
				
			}
		);
	}
});