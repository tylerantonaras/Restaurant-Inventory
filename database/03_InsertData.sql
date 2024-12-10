-- Insert into Ingredients
INSERT INTO Ingredients (Name, Category, UnitOfMeasure, StockQuantity, ReorderLevel)
VALUES
('Flour', 'Dry Goods', 'kg', 50, 10),
('Sugar', 'Dry Goods', 'kg', 30, 5),
('Milk', 'Dairy', 'L', 20, 5),
('Chicken', 'Meat', 'kg', 15, 3),
('Salt', 'Seasoning', 'kg', 25, 5),
('Butter', 'Dairy', 'kg', 10, 2),
('Eggs', 'Poultry', 'dozen', 40, 10);

-- Insert into Suppliers
INSERT INTO Suppliers (Name, ContactInfo, Address, Email, Phone)
VALUES
('FreshFarm Foods', 'John Smith', '123 Green St', 'john@freshfarm.com', '555-1234'),
('Meat Masters', 'Mike Johnson', '456 Butcher Ave', 'mike@meatmasters.com', '555-5678');

-- Insert into Orders
INSERT INTO Orders (OrderDate, SupplierID, TotalCost, Status)
VALUES
('2024-11-10', 1, 150.00, 'COMPLETED'),
('2024-11-12', 2, 300.00, 'COMPLETED');
