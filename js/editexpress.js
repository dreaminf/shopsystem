var id1=location.search;
var id=id1.substr(4);
	console.log(id);
//请求数据
$.post(
	"../../php/lib/express.php",
	{"type":"expressclass","id":id},
	function (data) {
		console.log(data);
		
			$("#id").val(id);
			$("#editexpressclass").val(data['name']);
			$("#tel").val(data['tel']);
			$("#baseprice").val(data['baseprice']);
			$("#addprice").val(data['addprice']);
			$("#status>option").each(function(){
				if($(this).val()==data['status']){
					$(this).attr("selected",true);
				}
			});
	},
	"json"
);