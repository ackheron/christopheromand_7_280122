-- MariaDB dump 10.19  Distrib 10.6.5-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: groupomania
-- ------------------------------------------------------
-- Server version	10.6.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `MessageId` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `MessageId` (`MessageId`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`MessageId`) REFERENCES `Messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (7,5,11,'Géniale cette photo !','2022-02-18 15:44:01','2022-02-18 15:44:01'),(11,5,14,'test\n','2022-02-21 14:05:45','2022-02-21 14:05:45'),(12,5,15,'commentaire','2022-02-21 17:26:14','2022-02-21 17:26:14');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dislikes`
--

DROP TABLE IF EXISTS `Dislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dislikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `MessageId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `MessageId` (`MessageId`),
  CONSTRAINT `Dislikes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Dislikes_ibfk_2` FOREIGN KEY (`MessageId`) REFERENCES `Messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dislikes`
--

LOCK TABLES `Dislikes` WRITE;
/*!40000 ALTER TABLE `Dislikes` DISABLE KEYS */;
INSERT INTO `Dislikes` VALUES (10,5,9,'2022-02-21 09:31:35','2022-02-21 09:31:35'),(11,5,9,'2022-02-21 09:31:40','2022-02-21 09:31:40'),(12,5,9,'2022-02-21 09:33:12','2022-02-21 09:33:12'),(13,5,9,'2022-02-21 09:34:06','2022-02-21 09:34:06'),(14,5,9,'2022-02-21 09:34:39','2022-02-21 09:34:39'),(15,5,9,'2022-02-21 09:38:21','2022-02-21 09:38:21'),(16,5,8,'2022-02-21 09:38:39','2022-02-21 09:38:39'),(17,5,8,'2022-02-21 09:38:44','2022-02-21 09:38:44'),(18,5,8,'2022-02-21 09:41:17','2022-02-21 09:41:17'),(19,5,8,'2022-02-21 09:41:57','2022-02-21 09:41:57'),(20,5,8,'2022-02-21 09:44:29','2022-02-21 09:44:29'),(21,5,8,'2022-02-21 09:47:17','2022-02-21 09:47:17'),(34,5,15,'2022-02-22 08:58:32','2022-02-22 08:58:32');
/*!40000 ALTER TABLE `Dislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `MessageId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `MessageId` (`MessageId`),
  CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`MessageId`) REFERENCES `Messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
INSERT INTO `Likes` VALUES (17,5,12,'2022-02-18 16:26:53','2022-02-18 16:26:53'),(18,5,13,'2022-02-18 17:06:27','2022-02-18 17:06:27'),(19,6,13,'2022-02-18 17:08:31','2022-02-18 17:08:31'),(23,6,14,'2022-02-18 18:23:40','2022-02-18 18:23:40'),(37,5,6,'2022-02-21 10:49:41','2022-02-21 10:49:41'),(40,5,14,'2022-02-21 15:50:18','2022-02-21 15:50:18'),(42,4,16,'2022-02-22 09:23:06','2022-02-22 09:23:06');
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
INSERT INTO `Messages` VALUES (1,2,'test message','Bonjour','http://localhost:3000/images/Ness.jpg1644845715829.jpg','2022-02-14 13:35:15','2022-02-14 13:35:15'),(6,4,NULL,'Nouveau message','http://localhost:3000/images/image1645182562078.jpg','2022-02-18 11:09:22','2022-02-18 11:09:22'),(8,4,NULL,'bonjour',NULL,'2022-02-18 15:38:13','2022-02-18 15:38:13'),(9,4,NULL,'nouveau test','http://localhost:3000/images/image1645198710579.jpg','2022-02-18 15:38:30','2022-02-18 15:38:30'),(10,4,NULL,'nouveau','http://localhost:3000/images/image1645198757370.jpg','2022-02-18 15:39:17','2022-02-18 15:39:17'),(11,4,NULL,'Je teste','http://localhost:3000/images/image1645198801059.jpg','2022-02-18 15:40:01','2022-02-18 15:40:01'),(12,5,'','2nd modification ','http://localhost:3000/images/image1645202756447.jpg','2022-02-18 15:44:58','2022-02-18 16:45:56'),(13,5,NULL,'nouveau','http://localhost:3000/images/image1645203895784.jpg','2022-02-18 17:04:55','2022-02-18 17:04:55'),(14,6,'','Juste mon message modifié',NULL,'2022-02-18 17:25:11','2022-02-18 17:25:43'),(15,5,NULL,'je teste un nouveau message',NULL,'2022-02-21 16:31:03','2022-02-21 16:31:03'),(16,5,NULL,'Salut la compagnie','http://localhost:3000/images/image1645520377249.jpg','2022-02-22 08:59:37','2022-02-22 08:59:37');
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'1da1481c641c9bef5f749b33e62d4443052150bc59cfc25f6016427b0bd717dbd1eeb2eef6b8fe1dbcbbd38cb6bcbc6025d43646c69b93b635ae00e19f97f321','Patrick','$2b$10$LuMBTG/PkB.itbQtf/Wljel23yWgatWk2FE.n6R8AnYNFjOweq/oq','','Veuillez compléter votre profil...',0,'2022-02-14 09:50:34','2022-02-14 09:50:34'),(2,'contact@domain.fr','contact','$2b$10$z7V4/ubImM2IXn3YYypf7umRXimLXzkYLqAD2C4HVvKiTmNNZCPXO','','Veuillez compléter votre profil...',0,'2022-02-14 13:32:40','2022-02-14 13:32:40'),(3,'1333bbb695454d0bda1298fe08c6e40a070e64ffbfbbc44ef98163a4860b13667798934c9b8e367f80146ff5871abe30466c87c2decc65a505ca5250771633e0','franck','$2b$10$zoQ1akeXjZdMk5wIYN0i0.V3.oCetgsaHnNRPhogSnkwbzKTHHaDW','','Profil à compléter...',0,'2022-02-17 10:23:43','2022-02-17 10:23:43'),(4,'2ef782a34a8e2943695bad6a57611e5ad3a40b39eaf29ff74f57cf690fd1b2f3255631fa77b2b6a813c22355ead314a6e1438c9df65206c2fc9edf56c0eecb23','Chris','$2b$10$te/BPWVHucZ7TnkuAS15NO35kvT3zmF4XZU1uHsVVUoGukYjo0jyK','http://localhost:3000/images/image1645121790019.jpg','Je suis dev',0,'2022-02-17 10:40:34','2022-02-22 09:50:29'),(5,'468d0f00fffbcd562cfa9dcf6c75394930723468e080e96a44958bbb93f765579c9236a313412ccd0f76c23c2e8fa8c946e16a09ba88655524cc31d0fd26af06','Bill','$2b$10$s6XyJcPbQDbjo2.VipTBSe4.0wwwl2AL/Y1HwBSTveoSQprTLjf2y','http://localhost:3000/images/image1645120066434.png','Super chef de projet',0,'2022-02-17 17:36:14','2022-02-18 16:56:51'),(6,'cdeabb0ebe50ab57de538104a817ae8d8bbbe55259031955bee559ee3233ee8125417a3c4159a3c12e024e4fdbd202ec591bfd7a3e7df2413460ef594eeb7210','Jim','$2b$10$3UlpCh5KBMwIvJBvWW.Jz./eHei/akZ4JOs27Vecro7JkUlu3QLcW','','super testeur',0,'2022-02-18 17:07:25','2022-02-18 17:11:59'),(7,'d02ac73c31f2c79c3405fbddcc7ceba05887d0b746e93b909eb738ddafe0cd0638aa196b7bdc0223813a138a8de1f519c2d392eb6725ac2f3ce1a7e2f9ea2813','Michel','$2b$10$2URn.0hD8mkjiPg/iKIEBOzljTlnvWIZHo1WUPAqLAw3ihUfsiHzK','','Profil à compléter...',0,'2022-02-21 09:15:40','2022-02-21 09:15:40'),(8,'2a1a07b172bd5559d948645fbe99f4cc488f9773981fb03ffb633ccd5d0285aa19710cdf4b04559a281372f7bc57a35c7aa7453ad9d3a6256f7774d985f57816','joe','$2b$10$cI3dnZ9k382CqcU9MetZIOOZsNtHkosS7usIhU6q2tRNj4QIuwcuK','','Profil à compléter...',0,'2022-02-22 12:40:58','2022-02-22 12:40:58'),(9,'cd46f52788f7c4aabd9969bdb8c2e556aaf7039f35a441a5c97e6ebc387c95e0df553cfa102b0d6a126e903a0ffd62f846b0a55cd61fb153861e5a431ceff5d5','joee','$2b$10$wDI63jYPXwh1l5YrAuZ9NuiTGhGpUJk1UrdpMsvx2EP92BIB7s6ta','','Profil à compléter...',0,'2022-02-22 12:41:42','2022-02-22 12:41:42'),(10,'e57934005e4f5c072d0fac956370d30d2bd293d28ed57b784d770750ae42f4156d8e1408f8ffc596629d652f9aa8fc8306db5cb88621808e51021aeb94ef2279','joee','$2b$10$g0LaFP76j4h2ewSZ/Ld87u4W7e.LqhDK5kZkH0Wf/OOlTjGslhNtO','','Profil à compléter...',0,'2022-02-22 12:43:31','2022-02-22 12:43:31'),(11,'5c091b7f3de6e3d637bf84f99829c85e078a78dc834a9f3a7a6752ece43e3b66b569cd7e092ad69a74a2af223ea6a79091c0518307708c6f68ecc13c8bc62212','joe','$2b$10$l0sb7l//9KbHc4uYxt7u6O5aKelPg9NkecUk7rOtqJCHbs5qv0CA.','','Profil à compléter...',0,'2022-02-22 13:51:04','2022-02-22 13:51:04'),(12,'7c4628c73ba648700ad5923aec6e725fb93507b383d3b4ebecf7020ce44b16ad8c4b0d67a4d7a44ed29c22a2b0a833668e9ca448721566a91a6069846ea5df06','Patrick','$2b$10$l87Vbipw939fyBhfTThWd.k42ruHoRwAy2sFNFcOpjgu8c.j74m6i','','Profil à compléter...',0,'2022-02-22 14:42:33','2022-02-22 14:42:33'),(17,'79ef5c23ce64bc1d15658f0318d9cfbe651cde012c82fb6b6439e752d7b6e97ce66ec2d2c1999db275a67cd4d1306a328972a18643981508e896e0fc3b437f53','admin','$2b$10$y7Ugv0uo6rGXtyfGqMBNZ.24CduLLxaXARr3N63M/M80BPd/qNURG','','Profil à compléter...',1,'2022-02-22 15:36:36','2022-02-22 15:36:36');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-22 17:22:38
