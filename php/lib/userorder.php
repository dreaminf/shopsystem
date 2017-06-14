<?php 
	include("../../base.php");
	session_start();
	if(isset($_POST['type']) && $_POST['type']=="unorder"){
		// 查找未完成订单
		$select="select order_id,date,count,name,price,imgpath from user_account a left join shop_order s on a.id=s.user_id left join shop sh on sh.id=s.shop_id where username='{$_SESSION['username']}' and order_status=0 and status=1 order by date desc";
		if($res=mysql_query($select)){
			$arrs=[];
			while($arr=mysql_fetch_assoc($res)){
				$arrs[]=$arr;
			}
			echo json_encode($arrs);
		}
	}



	if(isset($_POST['type']) && $_POST['type']=="alorder"){
		// 查找未完成订单
		$select="select order_id,date,count,name,price,imgpath from user_account a left join shop_order s on a.id=s.user_id left join shop sh on sh.id=s.shop_id where username='{$_SESSION['username']}' and order_status=1 and status=1 order by date desc";
		if($res=mysql_query($select)){
			$arrs=[];
			while($arr=mysql_fetch_assoc($res)){
				$arrs[]=$arr;
			}
			echo json_encode($arrs);
		}
	}
 ?>