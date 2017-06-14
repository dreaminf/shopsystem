// ajax请求 商品类别数据
$.post(
	"../../php/lib/shopAdd.php",
	"type=typeid",
	function (data) {
		for(var i in data){
			console.log(data);
			var option=$("<option></option>");
			for(var j in data[i]){
				option.val(data[i]['id']);
				option.html(data[i]['name']);
			}
			$("#type").append(option);
		}
	},
	"json"
);
