<?php 
	include("../../base.php");
	session_start();
	if(isset($_SESSION['supername'])){
		if(isset($_POST['type']) && $_POST['type']=="addexpressclass"){
			$insert="insert into express (name,tel,baseprice,addprice,status) values ('{$_POST['expressclass']}',{$_POST['tel']},{$_POST['baseprice']},{$_POST['addprice']},{$_POST['status']})";
			if(mysql_query($insert)){
				echo "添加快递分类成功";
				header("refresh:1;url='../../html/admin/admin.html'");
			}else{
				echo "添加快递分类失败";
				header("refresh:1;url='../../html/admin/addexpress.html'");
			}
		}

		//
		//根据id请求快递数据分类信息
		
		if(isset($_POST['type']) && $_POST['type']=="expressclass"){
			$select="select name,tel,baseprice,addprice,status from express where id={$_POST['id']}";
			if($res=mysql_query($select)){
				$arr=mysql_fetch_assoc($res);
				echo json_encode($arr);
			}
		}


		//根据id 修改数据库信息
		if(isset($_POST['type']) && $_POST['type']=="editexpressclass"){
			$update="update express set name='{$_POST['expressclass']}',tel={$_POST['tel']},baseprice={$_POST['baseprice']},addprice={$_POST['addprice']},status={$_POST['status']} where id={$_POST['id']}";
			if(mysql_query($update)){
				echo "修改成功";
				header("refresh:1;url='../../html/admin/admin.html'");
			}else{
				echo "修改失败";
				header("refresh:1;url='../../html/admin/editexpress.html'");
			}
		}


	}else{
		echo "请登录超级管理员账户！";
		header("refresh:1;url='../../html/admin/supermanage.html'");
	}

 ?>