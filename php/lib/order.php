<?php 
	include("../../base.php");
	session_start();
	if(isset($_SESSION['username'])){
		if(isset($_GET['type']) && $_GET['type']=="order"){
			$repeatselect="select shop_id from shop_order s left join user_account a on s.user_id=a.id where username='{$_SESSION['username']}' and order_status=0";
			if($re=mysql_query($repeatselect)){
				$rearrs=[];
				while($rearr=mysql_fetch_row($re)){
					$rearrs[]=$rearr;
				}
			}
			foreach($rearrs as $k => $v){
				$rearrs[$k]=implode(",",$v);
			}
			$rearrs=implode(",",$rearrs);

			$carid=$_GET["data"];
			//查询shop_id
			$selectshopid="select shop_id from shop_car where id in ({$carid})";

			if($recarid=mysql_query($selectshopid)){
				$reidarrs=[];
				while($reidarr=mysql_fetch_row($recarid)){
					$reidarrs[]=$reidarr;
				}
			}
			
			foreach($reidarrs as $k1 => $v1){
				$reidarrs[$k1]=implode(",",$v1);
			}
			$reidarrs=implode(",",$reidarrs);
	
			if($rearrs!=$reidarrs){
			
			$select="select shop_id,user_id,count from shop_car where id in ({$carid})";
			$res=mysql_query($select);
			$arrs=array();
			while ($arr=mysql_fetch_row($res)){
				$arrs[]=$arr;
			}
			$order_id=strtoupper(date("Ymd")."shopping".uniqid());
			$date=time();
			$insert="insert into shop_order (order_id,date,shop_id,user_id,count) values ";
			foreach ($arrs as $k => $v) {
				$v=implode(",", $v);
				$insert.="('{$order_id}',{$date},{$v}),";
				
			}
			$insert=rtrim($insert,",");
			if(mysql_query($insert)){
				//在插入订单表成功后，删除购物车表中数据
				$delete="delete from shop_car where id in ({$carid})";
				if(mysql_query($delete)){
					header("location:../../html/order.html");
				}
				
			}

		}else{
			//在插入订单表成功后，删除购物车表中数据
			$delete="delete from shop_car where id in ({$carid})";
			if(mysql_query($delete)){
				header("location:../../html/order.html");
			}
		}

		}

		// 请求收货地址
		if(isset($_GET['type']) && $_GET['type']=="address"){
			$sads="select address,realname,phone from user_information u left join user_account a on u.id=a.id where  username='{$_SESSION['username']}' ";
			
			if($res=mysql_query($sads)){
				$arr= mysql_fetch_assoc($res);
				echo json_encode($arr);
			}

		}
		// 请求快递数据
		if(isset($_GET['type']) && $_GET['type']=="express"){
			$sads="select * from express where status=2";
			if($res=mysql_query($sads)){
				$arrs=array();
				while ($arr= mysql_fetch_assoc($res)){
					$arrs[]=$arr;
				}
				echo json_encode($arrs);
			}

		}


		//请求订单信息，并将快递信息更新至订单信息
		if(isset($_POST['type']) && $_POST['type']=="requsetorder"){
			$update="update user_account a left join shop_order o on o.user_id=a.id  set express={$_POST['express']} where username='{$_SESSION['username']}' ";
			if(mysql_query($update)){
				$select="select order_id,mark,shop_id,user_id,count,date,express,name,price from shop_order s left join user_account a on a.id=s.user_id  left join shop sh on sh.id=s.shop_id where username='{$_SESSION['username']}' and order_status=0 ";
				$res=mysql_query($select);
				$arrs=array();
				while ($arr=mysql_fetch_assoc($res)) {
					$arrs[]=$arr;
				}
				echo json_encode($arrs);
			}
		}
		//快递更改 写入数据库
		if(isset($_POST['type']) && $_POST['type']=="updateexpress"){
			$updateexpress="update shop_order s left join 
			user_account a on a.id=s.user_id set 
			express={$_POST['id']}
			 where username='{$_SESSION['username']}' ";
			if(mysql_query($updateexpress)){
				
				echo "updateexpresssuccess";
			}
		}
		//备注更改 写入数据库
		if(isset($_POST['type']) && $_POST['type']=="msg"){
			$updatemsg="update shop_order s left join 
			user_account a on a.id=s.user_id set 
			mark='{$_POST['mark']}'
			 where username='{$_SESSION['username']}' ";
			if(mysql_query($updatemsg)){
				echo "marksuccess";
			}
		}

		//地址更改 写入数据库
		if(isset($_POST['type']) && $_POST['type']=="newaddress"){
			$updatemsg="update user_information u left join 
			user_account a on u.id=a.id set 
			address='{$_POST['addressmsg']}'
			 where username='{$_SESSION['username']}' ";
			if(mysql_query($updatemsg)){
				echo 400;
			}
		}

		//真实姓名更改 写入数据库
		if(isset($_POST['type']) && $_POST['type']=="newname"){
			$updatemsg="update user_information u left join 
			user_account a on u.id=a.id set 
			realname='{$_POST['newnamemsg']}'
			 where username='{$_SESSION['username']}' ";
			if(mysql_query($updatemsg)){
				echo 400;
			}
		}

		//判断余额是否充足
		if(isset($_POST['type']) && $_POST['type']=="checkmoney"){
			$selectmsg="select money from user_account a left join user_information i on i.id=a.id where username ='{$_SESSION['username']}'";
			if($money=mysql_query($selectmsg)){
				$moneyarr=mysql_fetch_row($money);
				$result=$moneyarr[0]-$_POST['totalprice'];
				echo $result;
			}
		}
		// 付款后数据库状态改为已付款 商品数量减少，个人钱数减少
		if(isset($_POST['type']) && $_POST['type']=="paymoney"){
			//个人余额减少
			$uptatemoney="update user_information i left join user_account a on a.id=i.id set money=money-'{$_POST['payprice']}' where username = '{$_SESSION['username']}'";
			if(mysql_query($uptatemoney)){
				//更新减少商品数量 ,及订单状态
				$updatenum="update shop s left join shop_order si  on s.id=si.shop_id  left join user_account a on a.id=si.user_id set s.num=s.num-si.count,si.order_status=1 where username='{$_SESSION['username']}'";
				if(mysql_query($updatenum)){
					echo 200;
				}
			}
		}

		// 取消订单
		if(isset($_POST['type']) && $_POST['type']=="quitpay"){
			$delorder="delete from shop_order where order_status=0 and user_id = (select id from user_account where username='{$_SESSION['username']}')";
			if(mysql_query($delorder)){
				echo 400;
			}
		}
	}else{
		echo "未登录，请登录！";
		header("refresh:1;url='../../html/login.html'");
	}
 ?>
 