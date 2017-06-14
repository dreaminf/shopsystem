<?php 
	include("../../base.php");
	define("PAGENUM",2);
	if(!empty($_POST)){
		if($_POST['type']=="pagenum"){
			$select="select count(id) from shop where status=1";
			$res=mysql_query($select);
			$arr=mysql_fetch_row($res);
			echo ceil($arr[0]/PAGENUM);
		}
		if($_POST['type']=="indexshop"){
			$offset=($_POST['index']-1)*PAGENUM;
			$select="select  id,name,description,imgpath,type_id,price from shop where status=1  limit {$offset},".PAGENUM;
			if($res=mysql_query($select)){
				$arrs=array();
				while($arr=mysql_fetch_assoc($res)){
					$arrs[]=$arr;
				}
				echo json_encode($arrs);
			}
		}
	}
 ?>