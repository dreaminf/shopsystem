document.getElementById("imgclick").onclick=function () {
	myform.img.click();
}



var id=window.location.search.substr(4);
$.post(
	"../../php/lib/editshop.php",
	{
		"type":"shopeditshow",
		"id":id
	},
	function(data){
		$("input[name='id']").val(data['id']);
		$("input[name='name']").val(data['name']);
		$("textarea[name='description']").val(data['description']);
		$("input[name='number']").val(data['num']);
		$("input[name='price']").val(data['price']);
		$("img").attr("src",data['imgpath']);
		var status=document.querySelectorAll(".status");
		for(var i=0;i<status.length;i++){
			if(data['status']==status[i].value){
				status[i].checked="true";
			}
		}

		shopType(data['type_id']);

	},
	"json"
	);
// ajax请求 商品类别数据
function shopType(type){
	$.post(
		"../../php/lib/shopAdd.php",
		"type=typeid",
		function (data) {
			for(var i in data){
				var option=$("<option></option>");
				for(var j in data[i]){
					if(type==data[i]['id']){
						option.val(data[i]['id']).attr("selected","true");
						option.html(data[i]['name']);
					}
					option.val(data[i]['id']);
					option.html(data[i]['name']);
				}

				$("#type").append(option);
			}
		},
		"json"
	);
}