CREATE DATABASE  IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `pseudonimo` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'lolo@email.com','123','lolo',NULL),(2,'leo@email.com','123123','leo',NULL),(3,'diyo@email.com','123123','diyo',NULL),(4,'coco@email.com','123123','coco',NULL),(5,'lololo@email','123','lololo',NULL);
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumen` varchar(255) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `votos` int(11) DEFAULT '0',
  `fecha_hora` timestamp NULL DEFAULT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_publicaciones_autores_idx` (`autor_id`),
  CONSTRAINT `fk_publicaciones_autores` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones`
--

LOCK TABLES `publicaciones` WRITE;
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
INSERT INTO `publicaciones` VALUES (2,'Grecia','Buen viaje a Grecia','<p>Contenido edds <strong>assd</strong> ad</p>',NULL,0,'2018-09-11 04:08:27',1),(3,'Paris','Buen viaje a Paris','Contenido',NULL,0,'2018-09-12 04:08:27',1),(4,'Costa Rica','Buen viaje a Costa Rica','Contenido',NULL,0,'2018-09-13 04:08:27',2),(5,'Mar de Plata','Buen viaje a Mar de Plata','Contenido',NULL,0,'2018-09-14 04:08:27',2),(6,'Guadalajara','Buen viaje a Guadalajara','<p>El viaje a <strong>Guadalajara</strong> comenzó en <i>Octubre</i>....</p>',NULL,0,'2018-09-15 04:08:27',2),(7,'China','Buen viaje a China','Contenido',NULL,2,'2018-09-16 04:08:27',2),(8,'New York','Viaje a nueva york','<p>Me gusto este <strong>viaje</strong></p>',NULL,4,'2018-09-22 03:00:00',4),(9,'Du Graty','Buen viaje a Du Graty','<p>Contenido <strong>sdsdsd</strong></p>',NULL,8,'2018-09-10 04:08:27',4),(10,'Corrientes','Buen viaje a Corrientes','<p>Contenido <strong>sdsdsd</strong></p>',NULL,100,'2018-09-10 04:08:27',3),(11,'Resistencia','Buen viaje a Resistencia','<p>Contenido <strong>sdsdsd</strong></p>',NULL,10000,'2018-09-10 04:08:27',3),(12,'Esteros del Ibera','Buen viaje a Esteros del Ibera','<p>Contenido <strong>sdsdsd</strong></p>',NULL,1000,'2018-09-10 04:08:27',4),(13,'lololo@email','123','lololo',NULL,0,'2020-01-21 03:00:00',1),(14,'Caa Cati','viaje','lololo',NULL,0,'2020-01-21 03:00:00',1),(15,'Caa Cati','viaje','lololo',NULL,0,'2020-01-21 03:00:00',1),(16,'Caa Cati','viaje','lololo',NULL,0,'2020-01-21 03:00:00',1),(17,'Caa Cati','viaje','lololo',NULL,0,'2020-01-21 03:00:00',1),(18,'Caa Cati','viaje','lololo',NULL,0,'2020-01-21 03:00:00',1),(19,'Caa Cati','viaje','lololo',NULL,0,'2020-01-21 03:00:00',1);
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'blog'
--

--
-- Dumping routines for database 'blog'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-21 14:59:37
