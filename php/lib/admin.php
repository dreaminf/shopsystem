<?php  
	include("../../base.php");
	session_start();
	//显示商品分类
	if(isset($_POST['type']) && $_POST['type']=="shopClass"){
		$select="select id,name from shop_type";
		if($res=mysql_query($select)){
			$arrs=[];
			while($arr=mysql_fetch_assoc($res)){
				$arrs[]=$arr;
			}
			echo json_encode($arrs);
		}

	}

	//显示快递分类
	if(isset($_POST['type']) && $_POST['type']=="expressClass"){
		$select="select * from express";
		if($res=mysql_query($select)){
			$arrs=[];
			while($arr=mysql_fetch_assoc($res)){
				$arrs[]=$arr;
			}
			echo json_encode($arrs);
		}

	}
?>