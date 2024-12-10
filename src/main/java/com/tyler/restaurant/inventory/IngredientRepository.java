package com.tyler.restaurant.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    // Find ingredients by category
    List<Ingredient> findByCategory(String category);

    // Custom query to find ingredients with low stock
    @Query("SELECT i FROM Ingredient i WHERE i.stockQuantity < i.reorderLevel")
    List<Ingredient> findLowStockIngredients();

    // Custom query to search ingredients by name (case-insensitive)
    @Query("SELECT i FROM Ingredient i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Ingredient> searchByName(String name);
}
