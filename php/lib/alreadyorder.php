<?php 
	include("../../base.php");
	session_start();
	if(isset($_SESSION['username'])){
		if(isset($_POST['type']) && $_POST['type']=="alreadyorder"){
			$select="select order_id from shop_order s left join user_account a on s.user_id=a.id where username='{$_SESSION['username']}' and order_status=1";
			if($res=mysql_query($select)){
				$arrs=[];
				while ($arr=mysql_fetch_row($res)) {
					$arrs[]=$arr;
				}
				echo json_encode($arrs);
			}
		}



	}

 ?>