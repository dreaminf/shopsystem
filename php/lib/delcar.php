<?php 
	include("../../base.php");
	if(isset($_GET["type"]) && $_GET['type']=="delshopcar"){
		$del="delete from shop_car where id={$_GET['id']}";
		if(mysql_query($del)){
			header("location:../../html/shopcar.html");
		}
	}

 ?>