//检测是否登录，如果未登录 跳转至登录页面
$.get(
	"../php/lib/readtest.php",
	"type=session",
	function(msg){
		if(msg==1){
			console.log(msg);
			$.get(
				"../php/lib/shopcar.php",
				"type=insertorder",
				function(){
						$.post(
							"../php/lib/shopcar.php",
							"type=selectBuyCar",
							function(data){
								console.log(data);
								if(data.length>0){
								for(var i in data){
									console.log(i);
									var checkbox=$("<input type='checkbox' />").attr({"checked":"checked"}).addClass("selectbtn").attr({"id":"id"+data[i]["id"]});
									var td=$("<td></td>").append(checkbox);
									var tr=$("<tr></tr>");
										tr.append(td);
										(function(k){
											for(var j in data[k]){
										(function(m){
											if(m!="num" && m!="id"){
										if(m=="imgpath"){
											var img=$("<img>").attr({"src":data[k][m],"width":"100px","height":"100px"});
											var td=$("<td></td>").append(img);
										}else if(m=="count"){
											var num=$("<input type='number' />").val(data[k][m]).attr({"min":"1","max":data[k]["num"]}).change(function(){
												window.location.href="../php/lib/shopcar.php?type=uptaenum&count="+$(this).val()+"&id="+data[k]["id"];
											});
											var td=$("<td></td>").append(num);

										}else{
											var td=$("<td></td>").html(data[k][m]);
										}
										tr.append(td);
										}

										})(j);
										

										}
										var totalPrice=$("<td></td>").html("￥:"+(parseInt(data[k]["price"])*parseInt(data[k]["count"]).toFixed(2))).addClass("price");
									var del=$("<a></a>").attr({"href":"../php/lib/delcar.php?type=delshopcar&id="+data[k]["id"]}).html("删除").click(function(){
										return confirm("确定从购物车删除吗？");
									});
									var tddel=$("<td></td>").append(del);
									tr.append(totalPrice,tddel);
									$("tbody").append(tr);
								 total=0;
								$(".price").each(function(){
									var that=$(this);
									 total=total+parseFloat(that.html().substr(2));
									console.log(typeof(parseFloat(that.html().substr(2)))); 
								});

								
										})(i);
									
									}
									
							
								
								var foottr=$("<tr></tr>");
								
								var btn1=$("<button></button>").html("提交订单").attr({"id":"subbtn"}).click(function(){
									subOrder();
								});
								var td6=$("<td></td>").attr({"colspan":"6"}).append(btn1);
								
								var totalsum=$("<span></span>").html("￥:"+Number(total));
								var td2=$("<td></td>").attr({"colspan":"2"}).append(totalsum);
								$("tfoot").append(td6,td2);

							

								}
							},
							"json"
						);
				}
			);
		}else if(msg==0){
			window.location.href="login.html";
		}
	}
);

//点击提交订单

function subOrder(){
	var sure=confirm("提交订单吗？");
	var idarr=[];
	if(sure){
		$(".selectbtn:checked").each(function(){
			var that=$(this);
			idarr.push(that.attr("id").substr(2));
		});
	}
	if(idarr.length!=0){
		var data=idarr.join(",");
		window.location.href="../php/lib/order.php?type=order&data="+data;
	}else{
		alert("请选择商品");
	}
}