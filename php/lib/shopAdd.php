<?php 
	include("../../base.php");
	session_start();
		if(isset($_SESSION['sellername'])){
			if(!empty($_POST)){

				if($_POST['type']=='typeid'){

					$select="select * from shop_type";
					if($res=mysql_query($select)){
						$arrs=array();
						while($arr=mysql_fetch_assoc($res)){
							$arrs[]=$arr;
						}
						echo json_encode($arrs);
					}


				}
				if(isset($_POST['shopadd'])){	
					if($_FILES['img']['error']!==0){
						echo "文件上传错误";
						header("refresh:2;url='../../html/admin/shopAdd.html'");
						exit;
					}
					if($_FILES['img']['size']>300*1024){
						echo "图片大小超限";
						header("refresh:2;url='../../html/admin/shopAdd.html'");
						exit;
					}
					$imgtype=array(
						"image/jpeg",
						"image/gif",
						"image/png"
						);
						
					if(!in_array($_FILES['img']['type'],$imgtype)){
						echo "图片类型错误";
						header("refresh:2;url='../../html/admin/shopAdd.html'");
						exit;
					}

					$newpath="../../img/";
					$fileame=uniqid(date("md"));
					$ext=strrchr($_FILES['img']['name'],".");
					$newname=$newpath.$fileame.$ext;
					$tmpname=$_FILES['img']['tmp_name'];
					if(move_uploaded_file($tmpname,$newname)){
						$imgpath="/shopsystem/img/".$fileame.$ext;
						$insert="insert into shop (name,price,description,type_id,imgpath,num) 
							values ('{$_POST['name']}',{$_POST['price']},'{$_POST['description']}',{$_POST['type']},'{$imgpath}',{$_POST['number']})
						";
						if(mysql_query($insert)){
							echo "增加商品成功";
							header("refresh:2;url='../../html/admin/sellermanage.html'");
							exit;
						}else{
							echo "错误！";
							header("refresh:2;url='../../html/admin/shopAdd.html'");
							exit;
						}

					}else{
						echo "错误！";
						header("refresh:2;url='../../html/admin/shopAdd.html'");
						exit;
					}


	            }



	            //编辑商品
	            
	            if(isset($_POST['eidtshop'])){
	            	//判断图片是否改变  当文件不选择时，及上传文件为空时
	            	if($_FILES['img']['size']!=0){
					if($_FILES['img']['error']!==0){
						echo "文件上传错误";
						header("refresh:2;url='../../html/admin/sellermanage.html'");
						exit;
					}
					if($_FILES['img']['size']>300*1024){
						echo "图片大小超限";
						header("refresh:2;url='../../html/admin/sellermanage.html'");
						exit;
					}
					$imgtype=array(
						"image/jpeg",
						"image/gif",
						"image/png"
						);
						
					if(!in_array($_FILES['img']['type'],$imgtype)){
						echo "图片类型错误";
						header("refresh:2;url='../../html/admin/sellermanage.html'");
						exit;
					}

					$newpath="../../img/";
					$fileame=uniqid(date("md"));
					$ext=strrchr($_FILES['img']['name'],".");
					$newname=$newpath.$fileame.$ext;
					$tmpname=$_FILES['img']['tmp_name'];
					if(move_uploaded_file($tmpname,$newname)){
						$imgpath="/shopsystem/img/".$fileame.$ext;
						$update="update shop 
							set name='{$_POST['name']}',price={$_POST['price']},description='{$_POST['description']}',type_id={$_POST['type']},num={$_POST['number']},imgpath='{$imgpath}',status={$_POST['status']}   where id={$_POST['id']} ";
						if(mysql_query($update)){
							echo "修改商品成功";
							header("refresh:2;url='../../html/admin/sellermanage.html'");
							exit;
						}else{
							die(mysql_error());
							echo "带图片修改商品错误！";
							header("refresh:2;url='../../html/admin/sellermanage.html'");
							exit;
						}

					}else{
						echo " 上传图片错误！";
						header("refresh:2;url='../../html/admin/sellermanage.html'");
						exit;
					}

					}else{ //无图片更改时执行此区块代码

						$update="update shop 
							set name='{$_POST['name']}',price={$_POST['price']},description='{$_POST['description']}',type_id={$_POST['type']},num={$_POST['number']},status={$_POST['status']}  where id={$_POST['id']} ";
						if(mysql_query($update)){
							echo "修改商品成功";
							header("refresh:2;url='../../html/admin/sellermanage.html'");
							exit;
						}else{
						
							echo "修改商品错误！";
							header("refresh:2;url='../../html/admin/sellermanage.html'");
							exit;
						}

					}
	           }

			}

		}else{
			//未登录
			echo "未登录";
			header("refresh:2;url='../../html/admin/sellerRegisterLogin.html'");
		}
	


 ?>