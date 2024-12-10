package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    // Fetch all ingredients
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    // Fetch ingredients by category
    @GetMapping("/category/{category}")
    public List<Ingredient> getIngredientsByCategory(@PathVariable String category) {
        return ingredientRepository.findByCategory(category);
    }

    // Fetch low stock ingredients
    @GetMapping("/low-stock")
    public List<Ingredient> getLowStockIngredients() {
        return ingredientRepository.findLowStockIngredients();
    }

    // Search ingredients by name
    @GetMapping("/search")
    public List<Ingredient> searchIngredients(@RequestParam String name) {
        return ingredientRepository.searchByName(name);
    }

    // Add a new ingredient
    @PostMapping
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    // Delete an ingredient by ID
    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        ingredientRepository.deleteById(id);
    }
}
