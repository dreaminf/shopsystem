$("#addshop").click(function(){
	window.location.href="shopAdd.html";
});
$("#quit").click(function () {
    window.location.href="../../php/lib/sellerlogout.php";
});

function slecteShop(){
	$.post(
		"../../php/lib/sellermanage.php",
		"type=selectshop",
		function(data){
			console.log(data);
			for(var i in data){
				var tr=$("<tr></tr>");
				for(var j in data[i]){
					if(j=="imgpath"){
						var img=$("<img />").attr({"src":data[i][j],"width":"100px"});
						var td=$("<td></td>").html(img);
							console.log(img);
					}else if(j=="status"){
						if(data[i][j]==1){
							var td=$("<td></td>").html("出售中");
						}else{
							var td=$("<td></td>").html("未上架");
						}
						
					}else{
						var td=$("<td></td>").html(data[i][j]);
					}
					tr.append(td);

				}
				var update=$("<a href='editshop.html?id="+data[i]['id']+"'>编辑</a>");
					var del=$("<a href=''>删除</a>").click(function(){
						return confirm("您确定要删除吗？");
					});
				var td=$("<td></td>").append(update);
				tr.append(td);
				$("tbody").append(tr);
				
			}
			
			
		},
		"json"
		);
}

slecteShop();