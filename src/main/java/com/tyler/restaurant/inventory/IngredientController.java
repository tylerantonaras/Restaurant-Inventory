package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredients") // Base URL for this controller
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    // Retrieve all ingredients
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    // Retrieve a specific ingredient by ID
    @GetMapping("/{id}")
    public Optional<Ingredient> getIngredientById(@PathVariable Long id) {
        return ingredientRepository.findById(id);
    }

    // Add a new ingredient
    @PostMapping
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    // Update an existing ingredient
    @PutMapping("/{id}")
    public Ingredient updateIngredient(@PathVariable Long id, @RequestBody Ingredient updatedIngredient) {
        return ingredientRepository.findById(id).map(ingredient -> {
            ingredient.setName(updatedIngredient.getName());
            ingredient.setCategory(updatedIngredient.getCategory());
            ingredient.setUnitOfMeasure(updatedIngredient.getUnitOfMeasure());
            ingredient.setStockQuantity(updatedIngredient.getStockQuantity());
            ingredient.setReorderLevel(updatedIngredient.getReorderLevel());
            return ingredientRepository.save(ingredient);
        }).orElseThrow(() -> new RuntimeException("Ingredient not found with id " + id));
    }

    // Delete an ingredient by ID
    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        ingredientRepository.deleteById(id);
    }
}
