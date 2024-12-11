-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: canteenbkprivate
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company`
--
/* CREATE DATABASE canteenbkprivate; */
USE canteenbkprivate;
DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `compID` int NOT NULL AUTO_INCREMENT,
  `comp_name` varchar(255) NOT NULL,
  `address` varchar(500) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`compID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'test, WTC','PUNE',1),(2,'On Dot Media','Pune',1),(3,'Car OK','PUNE',1),(4,'ITech Series','Pune',1),(5,'Kings Restaurant, WTC','Pune',1),(6,'Cyber, Cybercity','Swargate',1),(7,'Suhas LLP','Pune',1),(8,'Jidnya LLP','Pune',1),(9,'Jidnya Pvt Ltd','Pune',1);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dailyfood`
--

DROP TABLE IF EXISTS `dailyfood`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dailyfood` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empId` varchar(50) NOT NULL,
  `FoodType` tinyint NOT NULL COMMENT '1 for Food, 2 for Pizza',
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` int NOT NULL DEFAULT '0',
  `updatedby` tinyint NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0 for waiting, 1 for ready, 2 for served',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dailyfood`
--

LOCK TABLES `dailyfood` WRITE;
/*!40000 ALTER TABLE `dailyfood` DISABLE KEYS */;
INSERT INTO `dailyfood` VALUES (1,'123456',2,'2024-11-25 15:58:39',0,2,2),(2,'30036',1,'2024-11-25 22:46:15',0,1,0),(3,'30036',1,'2024-11-25 22:46:16',0,1,0),(4,'30036',1,'2024-11-25 22:47:06',0,1,0),(5,'30036',1,'2024-11-25 22:49:57',0,1,0);
/*!40000 ALTER TABLE `dailyfood` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (3,'Kings Restaurants'),(4,'On Dot Media'),(28,'test,WTC: Finance'),(29,'test,WTC: HR'),(30,'test,WTC: Management'),(51,'test'),(52,'Test Test'),(53,'Jidnya LLP');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emp_data`
--

DROP TABLE IF EXISTS `emp_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_data` (
  `emp_id` varchar(50) NOT NULL,
  `user_name` varchar(500) NOT NULL,
  `emp_Comp` varchar(255) NOT NULL DEFAULT 'test',
  `department` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `doubleFood` tinyint NOT NULL DEFAULT '0',
  `ISOdata` text NOT NULL,
  `base64Img` longblob NOT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_data`
--

LOCK TABLES `emp_data` WRITE;
/*!40000 ALTER TABLE `emp_data` DISABLE KEYS */;
INSERT INTO `emp_data` VALUES ('14269','Nutesh Viru Hiregowda','1',3,0,0,'',''),('16049','Satish Anil Muntode','1',3,0,0,'',''),('123456','Test test','5',3,0,0,'',''),('30036','Suhas Bachhav','2',4,1,0,'',_binary 'images/thumb.png');
/*!40000 ALTER TABLE `emp_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodtype`
--

DROP TABLE IF EXISTS `foodtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodtype` (
  `id` tinyint NOT NULL,
  `foodType` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodtype`
--

LOCK TABLES `foodtype` WRITE;
/*!40000 ALTER TABLE `foodtype` DISABLE KEYS */;
INSERT INTO `foodtype` VALUES (1,'Meal'),(2,'Pizza'),(3,'Special Food');
/*!40000 ALTER TABLE `foodtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foodservice` int NOT NULL COMMENT '1 for food, 2 for pizza , 3 for special food',
  `status` tinyint NOT NULL DEFAULT '1',
  `email` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test1','test','e10adc3949ba59abbe56e057f20f883e',1,1,'suhas@gmail.com'),(2,'Circle of Crust','coc','e10adc3949ba59abbe56e057f20f883e',2,1,'vdarekar@test.in'),(3,'Canteen Special Food','specialfood','e10adc3949ba59abbe56e057f20f883e',3,1,'sbachhav@ondot.com'),(15,'Admin','admin','e10adc3949ba59abbe56e057f20f883e',0,1,'mpawar@testcorp.net'),(20,'test','test','098f6bcd4621d373cade4e832627b4f6',1,1,'test@test.com'),(21,'Suhas Foods','suhas','559e3ea609b545a204248a19d87ccfe4',2,1,'suhas@test.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 13:16:03
