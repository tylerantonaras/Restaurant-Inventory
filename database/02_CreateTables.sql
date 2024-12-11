SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS suppliers;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE suppliers (
    supplier_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    PRIMARY KEY (supplier_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE ingredients (
    ingredient_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    unit_of_measure VARCHAR(255),
    stock_quantity INT,
    reorder_level INT,
    price_per_unit DOUBLE NOT NULL DEFAULT 0,
    PRIMARY KEY (ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE menu_items (
    menu_item_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(38,2) NOT NULL,
    category VARCHAR(255),
    PRIMARY KEY (menu_item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE orders (
    order_id BIGINT NOT NULL AUTO_INCREMENT,
    order_date DATETIME(6),
    status VARCHAR(255),
    total_cost DECIMAL(38,2),
    supplier_id BIGINT,
    PRIMARY KEY (order_id),
    CONSTRAINT FK_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers (supplier_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE order_details (
    order_detail_id BIGINT NOT NULL AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(38,2) NOT NULL,
    PRIMARY KEY (order_detail_id),
    CONSTRAINT FK_order FOREIGN KEY (order_id) REFERENCES orders (order_id),
    CONSTRAINT FK_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients (ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE recipes (
    recipe_id BIGINT NOT NULL AUTO_INCREMENT,
    menu_item_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    quantity DECIMAL(38,2) NOT NULL,
    PRIMARY KEY (recipe_id),
    CONSTRAINT FK_menu_item FOREIGN KEY (menu_item_id) REFERENCES menu_items (menu_item_id),
    CONSTRAINT FK_recipe_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients (ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

