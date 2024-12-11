package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    // Get all ingredients
    @GetMapping
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        return ResponseEntity.ok(ingredientRepository.findAll());
    }

    // Get ingredient by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        return ingredientRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new ingredient
    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(@RequestBody Ingredient ingredient) {
        try {
            Ingredient savedIngredient = ingredientRepository.save(ingredient);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedIngredient);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update ingredient
    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredient) {
        try {
            return ingredientRepository.findById(id)
                    .map(existingIngredient -> {
                        existingIngredient.setName(ingredient.getName());
                        existingIngredient.setCategory(ingredient.getCategory());
                        existingIngredient.setUnitOfMeasure(ingredient.getUnitOfMeasure());
                        existingIngredient.setStockQuantity(ingredient.getStockQuantity());
                        existingIngredient.setReorderLevel(ingredient.getReorderLevel());
                        existingIngredient.setPricePerUnit(ingredient.getPricePerUnit());
                        
                        Ingredient updatedIngredient = ingredientRepository.save(existingIngredient);
                        return ResponseEntity.ok(updatedIngredient);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Delete ingredient
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {
        try {
            if (!ingredientRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            ingredientRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
