document.getElementById("logout").onclick=function () {
	console.log("afsd");
	window.location.href='../../php/lib/superlogout.php';
}
// 判断管理员是否登陆

function isLogin(){
	$.get(
		"../../php/lib/readtest.php",
		"type=supermanagelogin",
		function(msg){
			console.log(msg);
			if(msg!=1){
				alert("请先登录超级管理员账户！");
				window.location.href="supermanage.html";
			}else{
				shopClass();
			}
		}
	);
}
//显示 商品分类
function shopClass(){
	$("#showshop").css({"background-color":"red"}).attr("disabled",true);
	$("#showexpress").attr("disabled",false);
	$.post(
		"../../php/lib/admin.php",
		"type=shopClass",
		function(data){
			console.log(data);
			if(data.length>0){
				for(var i in data){
					var tr=$("<tr></tr>").attr("align","center");
					for(var j in  data[i]){
						var td1=$("<td></td>").html(data[i]["id"]);
						var td2=$("<td></td>").html(data[i]["name"]);
						var a=$("<a></a>").attr("href","editshopClass.html?id="+data[i]['id']).html("修改类别名称");
						var opera=$("<td></td>").append(a);
						
					}
					tr.append(td1,td2,opera);
					$("#tableShopClass").append(tr);
				}
			}else{
				$("#shop_class").attr({"style":"display:none"});
				var p=$("<p></p>").html("暂无商品分类信息，请添加信息");
				$("#show").append(p);
			}
		},
		"json"

	);
}


//显示快递 分类
function expressClass(){
	$("#showexpress").css({"background-color":"red"}).attr("disabled",true);
	$("#showshop").attr("disabled",false);
	$.post(
		"../../php/lib/admin.php",
		"type=expressClass",
		function(data){
			console.log(data);
			if(data.length>0){
				for(var i in data){
					var tr=$("<tr></tr>").attr("align","center");
					for(var j in data[i]){
						var tdid=$("<td></td>").html(data[i]['id']);
						var tdname=$("<td></td>").html(data[i]['name']);
						var tdtel=$("<td></td>").html(data[i]['tel']);
						var tdbase=$("<td></td>").html("￥:"+data[i]['baseprice']);
						var tdadd=$("<td></td>").html("￥:"+data[i]['addprice']);
						if(j=="status"){
							if(data[i]['status']=="2"){
								var s="合作中";
							}else if(data[i]['status']=="1"){
								var s="洽谈中";
							}else if(data[i]['status']=="0"){
								var s="曾合作";
							}
						}
						var status=$("<td></td>").html(s);
						var a=$("<a></a>").html("编辑").attr("href","editexpress.html?id="+data[i]['id']); 
						var opera=$("<td></td>").html(a);

					}

					tr.append(tdid,tdname,tdtel,tdbase,tdadd,status,opera);
					$("#tableexpressClass").append(tr);
				}
			}else{

				$("#express").attr({"style":"display:none"});
				var p=$("<p></p>").html("暂无商品分类信息，请添加信息");
				$("#show").append(p);


			}
		},
		"json"

	);
}
isLogin();
// 商品分类按钮点击
$("#showshop").click(function(){
	$("#tableShopClass").html("");
	$("#showexpress").css({"background-color":"gray"});
	$("#addexpress").attr({"style":"display:none"});
	$("#express").attr({"style":"display:none"});
	$("#addclass").attr({"style":"display:inline-block"});
	$("#shop_class").attr({"style":"display:block"});
	shopClass();
});

//快递按钮点击时
$("#showexpress").click(function(){
	$("#tableexpressClass").html("");
	$("#showshop").css({"background-color":"gray"});
	$("#addexpress").attr({"style":"display:inline-block"});
	$("#express").attr({"style":"display:block"});
	$("#addclass").attr({"style":"display:none"});
	$("#shop_class").attr({"style":"display:none"});
	expressClass();
});

