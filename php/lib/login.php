<?php 
	header("content-type:text/html;charset=utf-8");
	if(!empty($_POST)){
		session_start();
		include("../../base.php");
		//执行登录
		$username=mysql_real_escape_string($_POST['user_login']);
		$pwd=mysql_real_escape_string($_POST['pwd_login']);
		$select="select count(*) from user_account
		where username='{$username}' and password='{$pwd}' ";
		$res=mysql_query($select);
		$arr=mysql_fetch_row($res);
		if($arr[0]==1){
			$_SESSION['username']=$_POST['user_login'];
			echo "登录成功！";
			header("refresh:1;url='../../index.html'");
			exit;
		}else{
			echo "用户名或密码错误!";
			header("refresh:1;url='../../html/login.html'");
			exit;
		}
	}else{
		echo "请先登录！";
		header("refresh:1;url='../../html/login.html'");
		exit;
	}
 ?>