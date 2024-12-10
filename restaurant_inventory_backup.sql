-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: RestaurantInventory
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `reorder_level` int NOT NULL,
  `stock_quantity` int NOT NULL,
  `unit_of_measure` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredients`
--

DROP TABLE IF EXISTS `Ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ingredients` (
  `IngredientID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `UnitOfMeasure` varchar(50) NOT NULL,
  `StockQuantity` int NOT NULL DEFAULT '0',
  `ReorderLevel` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IngredientID`),
  UNIQUE KEY `Name` (`Name`),
  CONSTRAINT `ingredients_chk_1` CHECK ((`StockQuantity` >= 0)),
  CONSTRAINT `ingredients_chk_2` CHECK ((`ReorderLevel` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredients`
--

LOCK TABLES `Ingredients` WRITE;
/*!40000 ALTER TABLE `Ingredients` DISABLE KEYS */;
INSERT INTO `Ingredients` VALUES (1,'Flour','Dry Goods','kg',50,10),(2,'Sugar','Dry Goods','kg',30,5),(3,'Milk','Dairy','L',20,5),(4,'Chicken','Meat','kg',15,3),(5,'Salt','Seasoning','kg',25,5),(6,'Butter','Dairy','kg',10,2),(7,'Eggs','Poultry','dozen',40,10),(10,'Ingredient X','Category X','kg',100,10),(12,'Ingredient Y','Category Y','L',50,5),(15,'Ingredient Z','Category Z','kg',75,7);
/*!40000 ALTER TABLE `Ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_item`
--

DROP TABLE IF EXISTS `menu_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_item` (
  `menu_itemid` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`menu_itemid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_item`
--

LOCK TABLES `menu_item` WRITE;
/*!40000 ALTER TABLE `menu_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MenuItem`
--

DROP TABLE IF EXISTS `MenuItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MenuItem` (
  `MenuItemID` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`MenuItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MenuItem`
--

LOCK TABLES `MenuItem` WRITE;
/*!40000 ALTER TABLE `MenuItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `MenuItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MenuItems`
--

DROP TABLE IF EXISTS `MenuItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MenuItems` (
  `MenuItemID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Description` text,
  PRIMARY KEY (`MenuItemID`),
  UNIQUE KEY `Name` (`Name`),
  CONSTRAINT `menuitems_chk_1` CHECK ((`Price` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MenuItems`
--

LOCK TABLES `MenuItems` WRITE;
/*!40000 ALTER TABLE `MenuItems` DISABLE KEYS */;
INSERT INTO `MenuItems` VALUES (1,'Cheeseburger',8.99,'Delicious beef burger with cheese'),(2,'Veggie Pizza',12.50,'Vegetarian pizza with fresh veggies'),(3,'Caesar Salad',7.00,'Crisp romaine with Caesar dressing');
/*!40000 ALTER TABLE `MenuItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `unit_price` double NOT NULL,
  `ingredient_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjyu2qbqt8gnvno9oe9j2s2ldk` (`order_id`),
  KEY `FKsk45hltk0rmbw3qecu1n32gmx` (`ingredient_id`),
  CONSTRAINT `FK3d2eet1yilhub5fgt4vhs9tit` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `FKjyu2qbqt8gnvno9oe9j2s2ldk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`OrderID`),
  CONSTRAINT `FKsk45hltk0rmbw3qecu1n32gmx` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`IngredientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderDetails`
--

DROP TABLE IF EXISTS `OrderDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OrderDetails` (
  `OrderDetailID` bigint NOT NULL AUTO_INCREMENT,
  `OrderID` bigint NOT NULL,
  `IngredientID` bigint NOT NULL,
  `Quantity` int NOT NULL,
  `unitPrice` double NOT NULL,
  `ingredient_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`OrderDetailID`),
  KEY `OrderID` (`OrderID`),
  KEY `fk_ingredient` (`IngredientID`),
  CONSTRAINT `orderdetails_chk_1` CHECK ((`Quantity` > 0)),
  CONSTRAINT `orderdetails_chk_2` CHECK ((`unitPrice` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetails`
--

LOCK TABLES `OrderDetails` WRITE;
/*!40000 ALTER TABLE `OrderDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `OrderID` bigint NOT NULL AUTO_INCREMENT,
  `OrderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SupplierID` bigint DEFAULT NULL,
  `TotalCost` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `total_cost` decimal(38,2) DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `SupplierID` (`SupplierID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`SupplierID`) REFERENCES `Suppliers` (`SupplierID`),
  CONSTRAINT `orders_chk_1` CHECK ((`TotalCost` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,'2024-12-08 23:51:04',NULL,NULL,'PENDING',0.00,NULL),(4,'2024-12-08 23:51:04',NULL,NULL,'COMPLETED',0.00,NULL),(10,'2024-12-02 00:00:00',1,100.50,'COMPLETED',NULL,NULL),(11,'2024-12-03 00:00:00',2,200.75,'PENDING',NULL,NULL),(12,'2024-12-04 00:00:00',3,300.25,'SHIPPED',NULL,NULL),(13,'2024-12-09 00:43:18',NULL,NULL,'PENDING',500.75,'2024-12-08 19:00:00.000000');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe`
--

DROP TABLE IF EXISTS `Recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` double NOT NULL,
  `ingredientid` bigint NOT NULL,
  `menu_itemid` bigint NOT NULL,
  `MenuItemID` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmntwlfw0jgaw5cbe3io3r7ftc` (`menu_itemid`),
  KEY `FK89hl5em8yl980gqqhqqjylfog` (`ingredientid`),
  KEY `FKna4xruxxhx24eka0en53gcurx` (`MenuItemID`),
  CONSTRAINT `FK3fytpgxyotdl29e8g1j4583i0` FOREIGN KEY (`ingredientid`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `FK89hl5em8yl980gqqhqqjylfog` FOREIGN KEY (`ingredientid`) REFERENCES `ingredients` (`IngredientID`),
  CONSTRAINT `FKejdlh16nif0nlr2eroc11ejd8` FOREIGN KEY (`ingredientid`) REFERENCES `ingredients` (`IngredientID`),
  CONSTRAINT `FKmntwlfw0jgaw5cbe3io3r7ftc` FOREIGN KEY (`menu_itemid`) REFERENCES `menu_item` (`menu_itemid`),
  CONSTRAINT `FKna4xruxxhx24eka0en53gcurx` FOREIGN KEY (`MenuItemID`) REFERENCES `MenuItem` (`MenuItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe`
--

LOCK TABLES `Recipe` WRITE;
/*!40000 ALTER TABLE `Recipe` DISABLE KEYS */;
/*!40000 ALTER TABLE `Recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipes`
--

DROP TABLE IF EXISTS `Recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipes` (
  `RecipeID` bigint NOT NULL AUTO_INCREMENT,
  `MenuItemID` bigint NOT NULL,
  `IngredientID` bigint NOT NULL,
  `Quantity` decimal(10,3) NOT NULL,
  PRIMARY KEY (`RecipeID`),
  UNIQUE KEY `unique_recipe_item` (`MenuItemID`,`IngredientID`),
  KEY `IngredientID` (`IngredientID`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`MenuItemID`) REFERENCES `MenuItems` (`MenuItemID`),
  CONSTRAINT `recipes_chk_1` CHECK ((`Quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipes`
--

LOCK TABLES `Recipes` WRITE;
/*!40000 ALTER TABLE `Recipes` DISABLE KEYS */;
INSERT INTO `Recipes` VALUES (1,1,1,0.500),(2,1,5,0.100),(3,2,3,0.700);
/*!40000 ALTER TABLE `Recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Suppliers`
--

DROP TABLE IF EXISTS `Suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Suppliers` (
  `SupplierID` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `ContactInfo` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`SupplierID`),
  UNIQUE KEY `Name` (`Name`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Suppliers`
--

LOCK TABLES `Suppliers` WRITE;
/*!40000 ALTER TABLE `Suppliers` DISABLE KEYS */;
INSERT INTO `Suppliers` VALUES (1,'Supplier One','contact1@example.com','123 Supplier St.',NULL,NULL),(2,'Supplier Two','contact2@example.com','456 Supplier Ave.',NULL,NULL),(3,'Supplier Three','contact3@example.com','789 Supplier Blvd.',NULL,NULL);
/*!40000 ALTER TABLE `Suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 23:30:12
