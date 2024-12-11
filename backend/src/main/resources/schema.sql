-- Drop tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS suppliers;

-- Create Suppliers table
CREATE TABLE suppliers (
    supplier_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    PRIMARY KEY (supplier_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Ingredients table
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

-- Create Menu Items table
CREATE TABLE menu_items (
    menu_item_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(38,2) NOT NULL,
    category VARCHAR(255),
    PRIMARY KEY (menu_item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Orders table
CREATE TABLE orders (
    OrderID BIGINT NOT NULL AUTO_INCREMENT,
    OrderDate DATETIME(6),
    Status VARCHAR(255),
    TotalCost DECIMAL(38,2),
    TotalAmount DOUBLE,
    SupplierID BIGINT,
    supplier_id BIGINT,
    PRIMARY KEY (OrderID),
    KEY FK6ngm572vyx5jsvvahtgbk7jml (SupplierID),
    KEY FKg2540vs5sg5b0uov81t6p0229 (supplier_id),
    CONSTRAINT FK6ngm572vyx5jsvvahtgbk7jml FOREIGN KEY (SupplierID) REFERENCES suppliers (supplier_id),
    CONSTRAINT FKg2540vs5sg5b0uov81t6p0229 FOREIGN KEY (supplier_id) REFERENCES suppliers (supplier_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Order Details table
CREATE TABLE order_details (
    order_detail_id BIGINT NOT NULL AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(38,2) NOT NULL,
    PRIMARY KEY (order_detail_id),
    KEY FKsk45hltk0rmbw3qecu1n32gmx (ingredient_id),
    KEY FKjyu2qbqt8gnvno9oe9j2s2ldk (order_id),
    CONSTRAINT FKjyu2qbqt8gnvno9oe9j2s2ldk FOREIGN KEY (order_id) REFERENCES orders (OrderID),
    CONSTRAINT FKsk45hltk0rmbw3qecu1n32gmx FOREIGN KEY (ingredient_id) REFERENCES ingredients (ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Recipes table
CREATE TABLE recipes (
    recipe_id BIGINT NOT NULL AUTO_INCREMENT,
    menu_item_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    quantity DECIMAL(38,2) NOT NULL,
    PRIMARY KEY (recipe_id),
    KEY FKp2d99nkbj5vqd7j48l47s55mp (ingredient_id),
    KEY FKe6pmr90w4ijsjqwvygw7clx5w (menu_item_id),
    CONSTRAINT FKe6pmr90w4ijsjqwvygw7clx5w FOREIGN KEY (menu_item_id) REFERENCES menu_items (menu_item_id),
    CONSTRAINT FKp2d99nkbj5vqd7j48l47s55mp FOREIGN KEY (ingredient_id) REFERENCES ingredients (ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 