<?php 
	include("../../base.php");
	if(!empty($_POST)){
		if($_POST['type']=="detial"){
			$select="select * from shop where id=".$_POST["id"];
			if($res=mysql_query($select)){
				$arr=mysql_fetch_assoc($res);
				echo json_encode($arr);
			}
		}
	}

 ?>