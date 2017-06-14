var id1=location.search;
var id=id1.substr(4);
	console.log(id);
//请求数据
$.post(
	"../../php/lib/shopclass.php",
	{"type":"shopclass","id":id},
	function (data) {
		console.log(data);
		if(data.length>0){
			$("#id").val(id);
			$("#editshopclass").val(data[0]);
		}
	},
	"json"
);