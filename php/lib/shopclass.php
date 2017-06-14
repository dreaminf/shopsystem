<?php 
	include("../../base.php");
	session_start();
	if(isset($_SESSION['supername'])){
		if(isset($_POST['type']) && $_POST['type']=="addshopclass"){
			$insert="insert into shop_type (name) values ('{$_POST['shopclass']}')";
			if(mysql_query($insert)){
				echo "添加商品分类成功";
				header("refresh:1;url='../../html/admin/admin.html'");
			}else{
				echo "添加商品分类失败";
				header("refresh:1;url='../../html/admin/addshopclass.html'");
			}
		}

		//根据id请求商品分类信息
		
		if(isset($_POST['type']) && $_POST['type']=="shopclass"){
			$select="select name from shop_type where id={$_POST['id']}";
			if($res=mysql_query($select)){
				$arr=mysql_fetch_row($res);
				echo json_encode($arr);
			}
		}
		//根据id修改数据库内容
		
		if(isset($_POST['type']) && $_POST['type']=="editshopclass"){
			$update="update shop_type set name='{$_POST['shopclass']}' where id={$_POST['id']}";
			if(mysql_query($update)){
				echo "修改成功";
				header("refresh:1;url='../../html/admin/admin.html'");
			}else{
				echo "修改失败";
				header("refresh:1;url='../../html/admin/editshopClass.html'");
			}
		}

	}else{
		echo "请登录超级管理员账户！";
		header("refresh:1;url='../../html/admin/supermanage.html'");
	}

 ?>