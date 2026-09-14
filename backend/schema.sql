-- =========================================================
-- PackSure AI — MySQL Database Schema (for Hostinger MySQL)
-- =========================================================

-- Optional: Create Database if not exists (Hostinger usually creates the DB for you in hPanel)
-- CREATE DATABASE IF NOT EXISTS packsure_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE packsure_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `organization` VARCHAR(150) DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Products Table
CREATE TABLE IF NOT EXISTS `products` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) DEFAULT NULL,
    `name` VARCHAR(200) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_products_user` (`user_id`),
    CONSTRAINT `fk_products_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Scans Table
CREATE TABLE IF NOT EXISTS `scans` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) DEFAULT NULL,
    `product_id` VARCHAR(36) DEFAULT NULL,
    `product_name` VARCHAR(200) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `score` INT NOT NULL DEFAULT 0,
    `status` ENUM('PASS', 'NEEDS_REVIEW', 'POTENTIAL_ISSUE') NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `image_width` INT DEFAULT 400,
    `image_height` INT DEFAULT 600,
    `extracted_data` JSON DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_scans_user` (`user_id`),
    INDEX `idx_scans_status` (`status`),
    CONSTRAINT `fk_scans_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_scans_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. OCR Results Table
CREATE TABLE IF NOT EXISTS `ocr_results` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `scan_id` VARCHAR(36) NOT NULL,
    `text` TEXT NOT NULL,
    `confidence` FLOAT NOT NULL DEFAULT 0.0,
    `bbox` JSON NOT NULL COMMENT '[x1, y1, x2, y2]',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_ocr_scan_id` (`scan_id`),
    CONSTRAINT `fk_ocr_scan` FOREIGN KEY (`scan_id`) REFERENCES `scans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Compliance Results Table
CREATE TABLE IF NOT EXISTS `compliance_results` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `scan_id` VARCHAR(36) NOT NULL,
    `requirement_id` VARCHAR(50) NOT NULL,
    `label` VARCHAR(200) NOT NULL,
    `status` ENUM('PASS', 'NEEDS_REVIEW', 'POTENTIAL_ISSUE') NOT NULL,
    `confidence` FLOAT NOT NULL DEFAULT 0.0,
    `detected` TEXT DEFAULT NULL,
    `reason` TEXT NOT NULL,
    `evidence` TEXT DEFAULT NULL,
    `source` VARCHAR(255) NOT NULL,
    `source_section` VARCHAR(255) NOT NULL,
    `bbox` JSON DEFAULT NULL COMMENT '[x1, y1, x2, y2] bounding box coordinates',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_compliance_scan_id` (`scan_id`),
    CONSTRAINT `fk_compliance_scan` FOREIGN KEY (`scan_id`) REFERENCES `scans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Regulatory Rules Knowledge Base Table
CREATE TABLE IF NOT EXISTS `regulations` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `rule_id` VARCHAR(50) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'All Packaged Commodities',
    `requirement` TEXT NOT NULL,
    `source` VARCHAR(255) NOT NULL DEFAULT 'Legal Metrology (Packaged Commodities) Rules, 2011',
    `section` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- Sample Starter Data: Legal Metrology (PC) Rules 2011
-- =========================================================

INSERT INTO `regulations` (`rule_id`, `title`, `category`, `requirement`, `section`) VALUES
('mrp', 'Maximum Retail Price', 'All Packaged Commodities', 'Retail sale price of the package shall be clearly declared inclusive of all taxes.', 'Rule 6(1)(f)'),
('net_quantity', 'Net Quantity', 'All Packaged Commodities', 'Net quantity in terms of the standard units of weight or measure or number shall be declared.', 'Rule 6(1)(b)'),
('manufacturer', 'Name & Address of Manufacturer', 'All Packaged Commodities', 'The name and complete address of the manufacturer or packer or importer shall be declared on every package.', 'Rule 6(1)(a)'),
('best_before', 'Month and Year of Manufacture / Packing', 'All Packaged Commodities', 'The month and year in which commodity is manufactured or pre-packed or imported shall be declared.', 'Rule 6(1)(c)'),
('consumer_care', 'Consumer Helpline Details', 'All Packaged Commodities', 'Name, address, telephone number, and email address of the person who or the office which can be contacted in case of consumer complaints.', 'Rule 6(1)(h)'),
('country_of_origin', 'Country of Origin', 'All Packaged Commodities', 'The name of the country of origin or manufacture or assembly in case of imported products shall be mentioned.', 'Rule 6(1)(k)')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- Optional: Insert Demo User
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `organization`)
VALUES ('usr_demo_001', 'Jordan Davis', 'jordan@acmeconsumer.com', '$2b$12$e8Yk2wQO9c4e.mockpasswordhash', 'Acme Consumer Compliance')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
