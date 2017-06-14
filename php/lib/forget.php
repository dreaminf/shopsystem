<?php 
	include("../../base.php");
	//用户名检测
	if(isset($_POST['type']) && $_POST['type']=="name"){
		$select="select count(*) from user_account where username='{$_POST['name']}'";
		if($res=mysql_query($select)){
			$arr=mysql_fetch_row($res);
			if($arr[0]!=0){
				echo "success";
			}
		}
	}

	//手机好号检测
	if(isset($_POST['type']) && $_POST['type']=="phone"){
		$select="select count(*) from user_account a left join user_information i on a.id=i.id where username='{$_POST['name']}' and phone={$_POST['phone']} ";
		if($res=mysql_query($select)){
			$arr=mysql_fetch_row($res);
			if($arr[0]!=0){
				echo "success";
			}
		}
	}

	//新密码修改
	//
	//手机好号检测
	if(isset($_POST['type']) && $_POST['type']=="newpwd"){
		$update="update user_account set password='{$_POST['pwd']}' where username='{$_POST['name']}'";
		if(mysql_query($update)){
			echo "success";	
		}
	}
 ?>