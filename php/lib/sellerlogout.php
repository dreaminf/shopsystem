<?php
/**
 * Created by PhpStorm.
 * User: acer
 * Date: 2017-05-27
 * Time: 21:47
 */
header("content-type:text/html;charset=utf-8");
session_start();
$_SESSION=array();
session_destroy();
echo "退出成功";
header("refresh:1;url='../../html/admin/sellerRegsiterLogin.html'");