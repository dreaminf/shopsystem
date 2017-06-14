<?php 
	header("content-type:text/html;charset=utf-8");
	session_start();
	$_SESSION=array();
	session_destroy();
	echo "退出成功";
	header("refresh:1;url=../../html/login.html");
 ?>