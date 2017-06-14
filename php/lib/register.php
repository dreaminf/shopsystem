<?php 
	header("content-type:text/html;charset=utf-8");
	if(!empty($_POST)){
		include("../../base.php");
		//判断用户名是否重复处理
		$select_uniqid="select count(*) from user_account where username='{$_POST['user']}'";
		$res=mysql_query($select_uniqid);
		$arr=mysql_fetch_row(mysql_query($select_uniqid));
		if($arr[0]!=0){
			echo "用户名重复！";
			header("refresh:1;url='../../html/register.html'");
			exit;
		}
		//执行注册
		$insert1="insert into user_account (username,password)
				 values
				 ('{$_POST['user']}','{$_POST['pwd']}')";
		$insert2="insert into user_information (email,phone,sex)
				 values
				 ('{$_POST['email']}','{$_POST['phoneNum']}','{$_POST['sex']}')";
		if(mysql_query($insert1) && mysql_query($insert2)){
			echo "注册成功";
			header("refresh:1;url='../../html/login.html'");
			exit;
		}else{
			echo "注册失败！";
			die(mysql_error());
			header("refresh:1;url='../../html/register.html'");
			exit;
		}

	}else{
		echo "请先注册！";
		header("refresh:1;url='../../html/register.html'");
		exit;
	}

 ?>