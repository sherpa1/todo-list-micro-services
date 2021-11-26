SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `uuid` varchar(36) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0/1',
  `content` varchar(512) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;