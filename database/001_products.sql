CREATE DATABASE IF NOT EXISTS b2b_platform;
USE b2b_platform;

CREATE TABLE IF NOT EXISTS categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS brands (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  sku VARCHAR(80) NOT NULL UNIQUE,
  unit VARCHAR(50),
  selling_price DECIMAL(12,2) NOT NULL,
  cost_price DECIMAL(12,2),
  stock_quantity INT NOT NULL DEFAULT 0,
  sales_notes VARCHAR(1000),
  category_id BIGINT NOT NULL,
  brand_id BIGINT NOT NULL,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands(id),
  INDEX idx_product_name (name),
  INDEX idx_product_sku (sku)
);
