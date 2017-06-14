<?php 
	include("../../base.php");
	session_start();
	if(isset($_SESSION['sellername'])){
		if($_POST["type"]=="shopeditshow"){
			$select="select id,name ,description,num,price,type_id,imgpath,status from shop where id={$_POST['id']}";
			if($res=mysql_query($select)){
				$arr=mysql_fetch_assoc($res);	
				echo json_encode($arr);
			}
		}
	}


 ?>