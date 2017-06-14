<?php 
	header("content-type:text/html;charset=utf-8");
	//定义常量 
	include(APP."/php/config/mysql.php");
	//连接数据库
	// mysql_connect(mysql服务器主机，mysql用户名，mysql密码)
 	if(@!mysql_connect(HOST,USER,PASS)){
 			die(mysql_error()."mysql服务器连接失败！");
 		}
 	//选择数据库
 	mysql_select_db(DB_NAME);
 	//设置客户端编码
 	mysql_set_charset("utf8");
 ?>