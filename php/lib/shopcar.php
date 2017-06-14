<?php 
	include("../../base.php");
	session_start();
	if(!empty($_POST)){
		if($_POST['type']=="shopcar"){
			if(isset($_COOKIE['id']) && isset($_COOKIE['count'])){
				//商品重复
				$idArr=explode(",", $_COOKIE["id"]);
				$countArr=explode(",",$_COOKIE["count"]);
				$index=array_search($_POST["id"],$idArr);
				if($index!==null){
					$countArr[$index]+=$_POST["count"];
					setcookie("id",implode(",",$idArr));
					setcookie("count",implode(",",$countArr));
				}else{
					//不重复时添加
					setcookie("id",$_COOKIE["id"].",".$_POST["id"]);
					setcookie("count",$_COOKIE["count"].",".$_POST["count"]);
				}
				
			}else{
				setcookie("id",$_POST["id"]);
				setcookie("count",$_POST["count"]);
			}

			echo "success";
		}
	}

	if(!empty($_GET) && $_GET['type']=="insertorder"){

		if(empty($_COOKIE["id"])){
			die;
		}
		$res=mysql_query("select id from user_account where username='{$_SESSION['username']}'");
		$arr=mysql_fetch_assoc($res);
		$user_id=$arr["id"];
		$idArr=explode(",", $_COOKIE["id"]);
		$countArr=explode(",",$_COOKIE["count"]);
		$insert="insert into shop_car(shop_id,user_id,count)
		values ";
		foreach ($idArr as $key => $value) {
			$insert.="({$value},{$user_id},{$countArr[$key]}),";
		}
		$insert=rtrim($insert,",");
		if(mysql_query($insert)){
			//清除cookie
			setcookie("id",null,time()-1);
			setcookie("count",null,time()-1);
		}
	}

	//请求购物车数据
	if(isset($_POST["type"]) && $_POST['type']=="selectBuyCar"){
		$select="select sc.id,s.name,description,imgpath,price,sc.count,s.num from shop s left join shop_car sc on s.id=sc.shop_id left join user_account u on u.id=sc.user_id where username='{$_SESSION['username']}'";
		$res=mysql_query($select);
		$arrs=array();
		while($arr=mysql_fetch_assoc($res)){
			$arrs[]=$arr;
		}
		echo json_encode($arrs);
	}
//修改购物车的数量
	if(isset($_GET["type"]) && $_GET['type']=="uptaenum"){
		$update="update shop_car set count={$_GET['count']} where id={$_GET['id']}";
		if(mysql_query($update)){
			header("location:../../html/shopcar.html");
		}
	}
 ?>