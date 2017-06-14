<?php 
	include("../../base.php");
	session_start();
	if(isset($_SESSION['sellername'])){
		if($_POST["type"]=="selectshop"){
			$select="select s.id,s.name as shopname,s.description,s.num,s.price,st.name as typename,s.imgpath,s.status from shop s left join shop_type st on s.type_id=st.id where 1";
			if($res=mysql_query($select)){
				$arrs=array();
				while($arr=mysql_fetch_assoc($res)){
					$arrs[]=$arr;
				};
				echo json_encode($arrs);
			}
		}
	}


 ?>