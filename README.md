# shopsystem
项目运行注意事项
一、直接在域名服务器下运行时；
	1.请将shopsystem文件夹直接拷贝至您所设置的域名所对应的文件夹下；
	2.在shopsystem/php/config/mysql.php 文件中更改与您的mysql服务器对应的用户名及密码，
	若您的数据库名为shopping,则不用更改；
	3.您若更改了数据库名，请在shopsystem/php/config/mysql.php 中更改数据库名
二、间接在域名服务器下运行时；
	1.请将shopsystem文件夹拷贝至您所设置的域名下所对应的文件夹下；
	2.在shopsystem/php/config/mysql.php 文件中更改与您的mysql服务器对应的用户名及密码，
	若您的数据库名为shopping,则不用更改；
	3.您若更改了数据库名，请在shopsystem/php/config/mysql.php 中更改数据库名
	4.请将shopsystem/base.php 文件内常量APP的路径更改；
	5.请将图片上传部分中shopsystem/php/lib/shopAdd.php中第49行的$impath值进行更改至对应的数据件路径
	6.更改后，将运行项目后，将看不到图片数据，需要在卖家账户中，重新修改添加图片才可以看到；因为现有数据库中保存的图片路径为  /shopsystem/img/XXX.xx;
