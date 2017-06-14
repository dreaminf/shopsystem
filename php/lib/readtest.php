<?php 
	session_start();
	if(isset($_GET['type'])){
	// 读取sesson 判断登录是否登录
		if($_GET['type']=="session"){
			if(!empty($_SESSION['username'])){
				echo 1;
				die;
			}else{
				echo 0;
				die;
			}
		}
		if($_GET['type']=="userdata"){
			if(!empty($_SESSION)){
				echo $_SESSION['username'];
				die;
			}
		}

		if($_GET['type']=="usercenter"){
			if(!empty($_SESSION)){
				include("../../base.php");
				$select_msg="select username,realname,phone,email,address,sex,money from user_account left join user_information on user_account.id=user_information.id where username='{$_SESSION['username']}'";
				$reg=mysql_query($select_msg);
				$arr=mysql_fetch_row($reg);
				echo json_encode($arr);
				die;
			}
		}

		if($_GET['type']=="userupdate"){
			if(!empty($_SESSION)){
				include("../../base.php");
				$select_msg="select realname,phone,email,address,sex from user_account left join user_information on user_account.id=user_information.id where username='{$_SESSION['username']}'";
				$reg=mysql_query($select_msg);
				$arr=mysql_fetch_row($reg);
				echo json_encode($arr);
				die;
			}
		}


		//判断卖家是否登录
		if($_GET['type']=='sellersession'){
			if(!empty($_SESSION['sellername'])){
				echo 1;
			}
		}

		//判断超级管理员是否登录
		if($_GET['type']=='supermanagelogin'){
			if(!empty($_SESSION['supername'])){
				echo 1;
			}
		}
		
		
	}

	
	if(!empty($_POST)){
		//充值
		if($_POST['type']=='usermoney'){
			include("../../base.php");
			$updatemoney="update user_information i left join
			user_account a on i.id=a.id  set money =money+{$_POST['addMoney']} where username='{$_SESSION['username']}' ";
			if(mysql_query($updatemoney)){
				$select="select money from user_account a left join user_information i on i.id=a.id where a.username='{$_SESSION['username']}'";
				$res=mysql_query($select);
				$arr=mysql_fetch_row($res);
				
				echo json_encode($arr);
				die;
			}			
		}

		//修改用户密码
		if($_POST['type']=='changepwd'){
			include("../../base.php");
			$select="select password from user_account where username='{$_SESSION['username']}'";
			$res=mysql_query($select);
			$arr=mysql_fetch_row($res);
			echo json_encode($arr);
		}

	}
 ?>