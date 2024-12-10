-- Insert into MenuItems
INSERT INTO MenuItems (Name, Price, Description)
VALUES
('Cheeseburger', 8.99, 'Delicious beef burger with cheese'),
('Veggie Pizza', 12.50, 'Vegetarian pizza with fresh veggies'),
('Caesar Salad', 7.00, 'Crisp romaine with Caesar dressing');

-- Insert into Recipes
INSERT INTO Recipes (MenuItemID, IngredientID, Quantity)
VALUES
(1, 1, 0.5),
(1, 5, 0.1),
(2, 3, 0.7);

-- Insert into OrderDetails
INSERT INTO OrderDetails (OrderID, IngredientID, Quantity, UnitPrice)
VALUES
(1, 1, 10, 5.50),
(2, 3, 20, 1.50);
