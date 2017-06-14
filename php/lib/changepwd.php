<?php 
	include("../../base.php");
	session_start();
	if(isset($_SESSION)){
		if(!empty($_POST)){
			if($_POST['type']=="userchangepwd"){
				$updatepwd="update user_account set password='{$_POST['newpwd']}' where username='{$_SESSION['username']}' ";
				if(mysql_query($updatepwd)){
					echo "修改密码成功";
					$_SESSION=array();
					session_destroy();	
					header("refresh:1;url='../../html/login.html'");
					exit;
				}else{
					echo "修改失败！";
					header("refresh:1;url='../../html/userupdatepwd.html'");
					exit;
				}
			}


		}
	}
 ?>