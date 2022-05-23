CREATE DATABASE assets_system;

CREATE TABLE `assets_system`.`assets` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` varchar(255) NOT NULL,
    `serial` varchar(255) NOT NULL,
    `color` varchar(255) NOT NULL,
    `is_active` BOOLEAN DEFAULT 1,
    `meta_data_hash` VARCHAR(64) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;