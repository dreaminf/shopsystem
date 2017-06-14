var id=window.location.search.substr(4);//获取商品的id
//获取商品信息
$.post(
	"../php/lib/shopDetial.php",
	{"type":"detial","id":id},
	function(data){
		console.log(data);
		var divimg=$("<div></div>").css({"outline":"1px solid blue","width":"35%"});
		var img=$("<img>").css({"width":"80%"}).attr({"src":data["imgpath"],"title":data['description']});
		divimg.append(img);
		var divdetial=$("<div></div>").css({"outline":"1px solid blue","width":"60%"});
		var name=$("<h3></h3>").html(data["name"]);
		var description=$("<h4></h4>").html(data['description']);
		var price=$("<h4></h4>").html("￥："+data["price"]);
		var num=$("<input>").attr({"type":"number","min":1,"max":data["num"],"required":"required"}).val(1);
		var btn=$("<input type='button'/>").css({"width":"20%","height":"30px"}).val("加入购物车").click(function(){
					// window.location.href="shopcar.html?id="+data['id']+"&count="+num.val();
					//判断是否登录
					$.get(
						"../php/lib/readtest.php",
							"type=session",
							function(msg){
								if(msg==1){
									//显示购物车
									$("#carshow").css({"display":"inline-block"});
									// 保存数据
									$.post(
										"../php/lib/shopcar.php",
										{
											"type":"shopcar",
											"id":data["id"],
											"count":num.val()
										},
										function(msg2){
											if(msg2=="success"){
												alert("添加购物车成功！");
											}
										}

									);
								}else if(msg==0){
									var statuslogin=confirm("未登录，请先登录！");
									if(statuslogin){
										window.location.href="login.html";
									}
								}
							}

						);

			});
		divdetial.append(name,description,price,num,btn);
		$("#detial").append(divimg,divdetial);
	},
	"json"
);

