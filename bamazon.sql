DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL(8,2),
    stock_quantity INTEGER
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Furniture", "79.99", "900"),
("Dining Table", "Furniture", "200.00", "225"),
("Side Table", "Furniture", "59.99", "700"),
("Sofa", "Furniture", "1025.00", "350"),
("Ottoman", "Furniture", "47.49", "200"),
("Throw Pillow", "Home Accessory", "40.39", "850"),
("Lamp", "Home Accessory", "64.89", "630"),
("Rug", "Home Accessory", "350.00", "180"),
("Candle", "Home Accessory", "24.95", "780"),
("Throw Blanket", "Home Accessory", "79.99", "900");

SELECT * FROM products;