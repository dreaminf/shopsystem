/*
Navicat MySQL Data Transfer

Source Server         : zhldb
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : shopping

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-06-09 08:33:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `realname` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'seller1', 'seller1', 'zhenghongl');
INSERT INTO `admin` VALUES ('2', 'myadmin3', 'myadmin3', 'ennanan');
INSERT INTO `admin` VALUES ('3', 'myadmin', 'myadmin', 'reaaal');

-- ----------------------------
-- Table structure for express
-- ----------------------------
DROP TABLE IF EXISTS `express`;
CREATE TABLE `express` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `tel` bigint(11) unsigned NOT NULL,
  `baseprice` decimal(4,2) unsigned DEFAULT '0.00',
  `addprice` decimal(4,2) unsigned DEFAULT '0.00',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '0曾合作，1洽谈中，2合作中',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of express
-- ----------------------------
INSERT INTO `express` VALUES ('1', '顺丰快递', '1839213352', '10.00', '1.00', '2');
INSERT INTO `express` VALUES ('2', '圆通快递', '1356789009', '12.00', '1.20', '2');
INSERT INTO `express` VALUES ('3', '申通快递', '1456789234', '11.00', '0.80', '2');
INSERT INTO `express` VALUES ('4', '邮政速运', '1389023456', '9.00', '2.00', '0');
INSERT INTO `express` VALUES ('5', '天天快递', '15867901235', '12.01', '1.00', '2');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `data` int(10) DEFAULT NULL,
  `shop_id` int(10) NOT NULL,
  `answer_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `price` decimal(7,2) unsigned NOT NULL DEFAULT '0.00',
  `num` bigint(7) NOT NULL DEFAULT '1',
  `description` varchar(50) NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `imgpath` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0，下架，1上架',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1', '格力空调', '4500.00', '282', '掌握核心科技', '2', '/shopsystem/img/0531592e67d562f87.jpg', '1');
INSERT INTO `shop` VALUES ('2', 'oppo手机t34y6', '1499.00', '4481', '1300万柔光自拍神器4265', '1', '/shopsystem/img/0531592ea0ee7ed0a.gif', '1');
INSERT INTO `shop` VALUES ('3', '华为手机', '1999.00', '133', '中国之颠', '1', '/shopsystem/img/0531592ec5adb72e7.jpg', '1');
INSERT INTO `shop` VALUES ('4', '活着', '21.00', '574', '余华 巅峰之作', '4', '/shopsystem/img/0531592ec5e737527.gif', '1');
INSERT INTO `shop` VALUES ('5', '海澜之家', '300.00', '2682', '男人的衣柜', '3', '/shopsystem/img/0531592ec69b5bc5f.jpg', '1');

-- ----------------------------
-- Table structure for shop_car
-- ----------------------------
DROP TABLE IF EXISTS `shop_car`;
CREATE TABLE `shop_car` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `shop_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `count` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_car
-- ----------------------------
INSERT INTO `shop_car` VALUES ('31', '2', '1', '3');

-- ----------------------------
-- Table structure for shop_order
-- ----------------------------
DROP TABLE IF EXISTS `shop_order`;
CREATE TABLE `shop_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` varchar(30) NOT NULL,
  `shop_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `count` int(5) NOT NULL,
  `date` int(10) NOT NULL,
  `express` int(5) NOT NULL,
  `mark` varchar(400) DEFAULT NULL,
  `order_status` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '0为未完成订单 1为完成订单',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_order
-- ----------------------------
INSERT INTO `shop_order` VALUES ('1', '20170605SHOPPING593568436EE56', '2', '1', '5', '1496672323', '1', null, '1');
INSERT INTO `shop_order` VALUES ('2', '20170605SHOPPING593568436EE56', '1', '1', '1', '1496672323', '1', null, '1');
INSERT INTO `shop_order` VALUES ('3', '20170605SHOPPING593568436EE56', '5', '1', '2', '1496672323', '1', null, '1');
INSERT INTO `shop_order` VALUES ('4', '20170605SHOPPING593568436EE56', '2', '1', '5', '1496672323', '1', null, '1');
INSERT INTO `shop_order` VALUES ('5', '20170605SHOPPING59356F46BE2A5', '1', '1', '4', '1496674118', '1', null, '1');
INSERT INTO `shop_order` VALUES ('6', '20170605SHOPPING59356F46BE2A5', '2', '1', '5', '1496674118', '1', null, '1');
INSERT INTO `shop_order` VALUES ('7', '20170605SHOPPING59356F46BE2A5', '1', '1', '1', '1496674118', '1', null, '1');
INSERT INTO `shop_order` VALUES ('8', '20170605SHOPPING59356F46BE2A5', '5', '1', '2', '1496674118', '1', null, '1');
INSERT INTO `shop_order` VALUES ('9', '20170605SHOPPING59356F46BE2A5', '2', '1', '5', '1496674118', '1', null, '1');
INSERT INTO `shop_order` VALUES ('10', '20170605SHOPPING59356FD44F97D', '1', '1', '4', '1496674260', '1', null, '1');
INSERT INTO `shop_order` VALUES ('11', '20170605SHOPPING59356FD44F97D', '2', '1', '5', '1496674260', '1', null, '1');
INSERT INTO `shop_order` VALUES ('12', '20170605SHOPPING59356FD44F97D', '1', '1', '1', '1496674260', '1', null, '1');
INSERT INTO `shop_order` VALUES ('13', '20170605SHOPPING59356FD44F97D', '5', '1', '2', '1496674260', '1', null, '1');
INSERT INTO `shop_order` VALUES ('14', '20170605SHOPPING59356FD44F97D', '2', '1', '5', '1496674260', '1', null, '1');
INSERT INTO `shop_order` VALUES ('15', '20170606SHOPPING5935F849B555A', '1', '1', '4', '1496709193', '1', null, '1');
INSERT INTO `shop_order` VALUES ('16', '20170606SHOPPING5935F849B555A', '1', '1', '1', '1496709193', '1', null, '1');
INSERT INTO `shop_order` VALUES ('17', '20170606SHOPPING5935F849B555A', '5', '1', '2', '1496709193', '1', null, '1');
INSERT INTO `shop_order` VALUES ('18', '20170606SHOPPING5935F849B555A', '2', '1', '5', '1496709193', '1', null, '1');
INSERT INTO `shop_order` VALUES ('19', '20170606SHOPPING5935F8A12A2CA', '1', '1', '4', '1496709281', '1', null, '1');
INSERT INTO `shop_order` VALUES ('20', '20170606SHOPPING5935F8A12A2CA', '1', '1', '1', '1496709281', '1', null, '1');
INSERT INTO `shop_order` VALUES ('21', '20170606SHOPPING5935F8A12A2CA', '5', '1', '2', '1496709281', '1', null, '1');
INSERT INTO `shop_order` VALUES ('22', '20170606SHOPPING5935F8A12A2CA', '2', '1', '5', '1496709281', '1', null, '1');
INSERT INTO `shop_order` VALUES ('23', '20170606SHOPPING5935F94C28697', '1', '1', '4', '1496709452', '1', null, '1');
INSERT INTO `shop_order` VALUES ('24', '20170606SHOPPING5935F94C28697', '1', '1', '1', '1496709452', '1', null, '1');
INSERT INTO `shop_order` VALUES ('25', '20170606SHOPPING5935F94C28697', '5', '1', '2', '1496709452', '1', null, '1');
INSERT INTO `shop_order` VALUES ('26', '20170606SHOPPING5935F94C28697', '2', '1', '5', '1496709452', '1', null, '1');
INSERT INTO `shop_order` VALUES ('27', '20170606SHOPPING5936554EA17C5', '5', '1', '2', '1496733006', '1', null, '1');
INSERT INTO `shop_order` VALUES ('28', '20170606SHOPPING593655FCC55D6', '5', '1', '2', '1496733180', '1', null, '1');
INSERT INTO `shop_order` VALUES ('29', '20170606SHOPPING593655FCC55D6', '1', '1', '3', '1496733180', '1', null, '1');
INSERT INTO `shop_order` VALUES ('30', '20170606SHOPPING593684D338F03', '5', '1', '2', '1496745171', '1', null, '1');
INSERT INTO `shop_order` VALUES ('31', '20170606SHOPPING593684D338F03', '1', '1', '3', '1496745171', '1', null, '1');
INSERT INTO `shop_order` VALUES ('32', '20170606SHOPPING593685CD26361', '5', '1', '2', '1496745421', '1', null, '1');
INSERT INTO `shop_order` VALUES ('33', '20170606SHOPPING593685CD26361', '1', '1', '3', '1496745421', '1', null, '1');
INSERT INTO `shop_order` VALUES ('34', '20170607SHOPPING5938036D6FBE2', '2', '7', '3', '1496843117', '1', null, '1');
INSERT INTO `shop_order` VALUES ('35', '20170607SHOPPING593803D814B3D', '1', '7', '4', '1496843224', '1', null, '1');
INSERT INTO `shop_order` VALUES ('36', '20170607SHOPPING5938043BB4C91', '2', '7', '4', '1496843323', '1', null, '1');
INSERT INTO `shop_order` VALUES ('37', '20170607SHOPPING59380631C977E', '2', '7', '4', '1496843825', '1', null, '1');
INSERT INTO `shop_order` VALUES ('38', '20170607SHOPPING59380C01C45E2', '2', '7', '3', '1496845313', '1', null, '1');
INSERT INTO `shop_order` VALUES ('39', '20170608SHOPPING5938E6654DF60', '3', '7', '2', '1496901221', '1', null, '1');
INSERT INTO `shop_order` VALUES ('40', '20170608SHOPPING5938E68B6D415', '2', '7', '4', '1496901259', '1', null, '1');

-- ----------------------------
-- Table structure for shop_type
-- ----------------------------
DROP TABLE IF EXISTS `shop_type`;
CREATE TABLE `shop_type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_type
-- ----------------------------
INSERT INTO `shop_type` VALUES ('1', '手机通讯分类');
INSERT INTO `shop_type` VALUES ('2', '家用电器');
INSERT INTO `shop_type` VALUES ('3', '服饰');
INSERT INTO `shop_type` VALUES ('4', '图书阅读');
INSERT INTO `shop_type` VALUES ('5', '电脑耗材');

-- ----------------------------
-- Table structure for superaccount
-- ----------------------------
DROP TABLE IF EXISTS `superaccount`;
CREATE TABLE `superaccount` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `supername` varchar(25) NOT NULL COMMENT '超级管理员用户名',
  `superpwd` char(32) NOT NULL DEFAULT '' COMMENT '超级管理员密码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of superaccount
-- ----------------------------
INSERT INTO `superaccount` VALUES ('1', 'admin', 'admin');

-- ----------------------------
-- Table structure for user_account
-- ----------------------------
DROP TABLE IF EXISTS `user_account`;
CREATE TABLE `user_account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` char(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_account
-- ----------------------------
INSERT INTO `user_account` VALUES ('1', 'zhenghl1126', 'zhl1126');
INSERT INTO `user_account` VALUES ('2', 'zhenghl1127', 'zhl1126');
INSERT INTO `user_account` VALUES ('3', 'fangping', '123456');
INSERT INTO `user_account` VALUES ('4', 'fp123', '123456');
INSERT INTO `user_account` VALUES ('5', 'zhenghongliang', 'zhl1126');
INSERT INTO `user_account` VALUES ('6', 'fangping123', '000000');
INSERT INTO `user_account` VALUES ('7', 'account1', 'account1');

-- ----------------------------
-- Table structure for user_information
-- ----------------------------
DROP TABLE IF EXISTS `user_information`;
CREATE TABLE `user_information` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `realname` varchar(10) DEFAULT NULL,
  `phone` bigint(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `sex` tinyint(1) NOT NULL DEFAULT '0',
  `money` decimal(9,2) unsigned DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_information
-- ----------------------------
INSERT INTO `user_information` VALUES ('1', '郑红亮', '18392133525', 'zhenghl1126@125.com', '陕西省西安市', '0', '2228481.00');
INSERT INTO `user_information` VALUES ('2', null, '15678902345', '784440822@qq.com', null, '2', '0.00');
INSERT INTO `user_information` VALUES ('3', null, '13264936501', '1326493650@qq.com', null, '2', '0.00');
INSERT INTO `user_information` VALUES ('4', null, '15771808461', '123@qq.com', null, '2', '0.00');
INSERT INTO `user_information` VALUES ('5', 'fagag', '18392133525', 'zhenghl1126@126.com', '西安市', '0', '9999999.99');
INSERT INTO `user_information` VALUES ('6', '郑红亮', '18392133525', 'zhenghl1126@126.com', '陕西', '0', '40000.00');
INSERT INTO `user_information` VALUES ('7', 'account1', '15224678923', '4364576@qq.com', '陕西铜川市', '1', '60000.00');
