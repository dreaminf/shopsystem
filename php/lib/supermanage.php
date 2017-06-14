<?php 
	include("../../base.php");
	session_start();
	if(!empty($_POST)){
		if(isset($_POST['surperRegister'])){
			//判断用户名是否重复处理
		$select_uniqid="select count(*) from superaccount where supername='{$_POST['supername']}'";
		$res=mysql_query($select_uniqid);
		$arr=mysql_fetch_row(mysql_query($select_uniqid));
		if($arr[0]!=0){
			echo "用户名重复！";
			header("refresh:1;url='../../html/admin/supermanage.html'");
			exit;
		}

		//执行注册
			$insertsuperaccount="insert into superaccount (supername,superpwd) values ('{$_POST['supername']}','{$_POST['superpwd']}')";
			if(mysql_query($insertsuperaccount)){
				echo "注册成功";
				header("refresh:1;url='../../html/admin/supermanage.html'");
				exit;
			}else{
				echo "注册失败";
				header("refresh:1;url='../../html/admin/supermanage.html'");
				exit;
			}
		}

		if(isset($_POST['surperlogin'])){
			$select="select supername,superpwd from superaccount where supername='{$_POST['supername']}'";
			if($res=mysql_query($select)){

			
			$arr=mysql_fetch_row($res);
			if($arr[0]==$_POST['supername'] && $arr[1]==$_POST['superpwd']){
				$_SESSION['supername']=$_POST['supername'];
				echo "登录成功";
				header("refresh:1;url='../../html/admin/admin.html'");
				exit;
			}else{
				echo "超级管理员用户名或密码错误";
				header("refresh:1;url='../../html/admin/supermanage.html'");
				exit;
			}
		}else{
			echo "超级管理员用户名或密码错误";
			header("refresh:1;url='../../html/admin/supermanage.html'");
			exit;
		}

		}




	}

 ?>