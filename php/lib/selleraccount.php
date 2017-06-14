<?php 
	include("../../base.php");
	session_start();
	if(!empty($_POST)){
		if(isset($_POST['sellerRegister'])){
			if(isset($_SESSION['supername'])){

					//判断用户名是否重复处理
				$select_uniqid="select count(*) from admin where username='{$_POST['sellername']}'";
				$res=mysql_query($select_uniqid);
				$arr=mysql_fetch_row(mysql_query($select_uniqid));
				if($arr[0]!=0){
					echo "卖家用户名重复！";
					header("refresh:1;url='../../html/admin/admin.html'");
					exit;
				}

			//执行注册
				$insert="insert into admin (username,password,realname) values ('{$_POST['sellername']}','{$_POST['sellerpwd']}','{$_POST['realname']}')";
					if(mysql_query($insert)){
						$_SESSION=array();
						session_destroy();
						echo "卖家注册成功";
						header("refresh:1;url='../../html/admin/sellerRegsiterLogin.html'");
						exit;
					}else{
						echo "卖家注册失败";
						header("refresh:1;url='../../html/admin/supermanage.html'");
						exit;
					}

			}else{
				echo "请先登录超级账户！";
				header("refresh:1;url='../../html/admin/supermanage.html'");
				exit;
			}

		}

		if(isset($_POST['sellerlogin'])){
			$select="select username,password from admin where username='{$_POST['sellername']}'";
			$res=mysql_query($select);
			$arr=mysql_fetch_row($res);
			if($arr[0]==$_POST['sellername'] && $arr[1]==$_POST['sellerpwd']){
				$_SESSION['sellername']=$_POST['sellername'];
				echo "登录成功";
				header("refresh:1;url='../../html/admin/sellermanage.html'");
				exit;
			}else{
				echo "卖家用户名或密码错误";
				header("refresh:1;url='../../html/admin/sellerRegsiterLogin.html'");
				exit;
			}


		}


	}

 ?>