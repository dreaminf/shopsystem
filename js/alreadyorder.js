$.post(
	"../php/lib/alreadyorder.php",
	"type=alreadyorder",
	function(data){
		console.log(data);
		$("#alordernum").html(data[0][0]);
	},
	"json"
);