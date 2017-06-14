<?php 
	header("content-type:text/html;charset=utf-8");
	session_start();
	if(!empty($_POST)){

		if(isset($_SESSION['username'])){
		include("../../base.php");
		//执行修改
		$update="update user_information left join user_account on user_information.id=user_account.id set phone='{$_POST['tel']}',address='{$_POST['address']}',sex='{$_POST['sex']}',email='{$_POST['email']}',realname='{$_POST['realname']}'
		  where username='{$_SESSION['username']}'";
			if(mysql_query($update)){
				echo "修改成功";
				header("refresh:1;url='../../html/personcenter.html'");
				exit;
			}else{
				echo "修改失败！";
				die(mysql_error());
				header("refresh:1;url='../../html/useraccountupdate.html'");
				exit;
			}
		}else{
			echo "请登录！";
			header("refresh:1;url='../../html/login.html'");
			exit;
		}

}else{
	echo "请登录！";
	header("refresh:1;url='../../html/login.html'");
	exit;
}
 ?>