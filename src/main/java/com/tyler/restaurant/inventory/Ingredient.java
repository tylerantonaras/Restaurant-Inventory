package com.tyler.restaurant.inventory;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "unit_of_measure")
    private String unitOfMeasure;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Column(name = "reorder_level")
    private int reorderLevel;

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Recipe> recipes = new ArrayList<>();

    // Default constructor
    public Ingredient() {
    }

    // Constructor with parameters
    public Ingredient(String name, String category, String unitOfMeasure, int stockQuantity, int reorderLevel) {
        this.name = name;
        this.category = category;
        this.unitOfMeasure = unitOfMeasure;
        this.stockQuantity = stockQuantity;
        this.reorderLevel = reorderLevel;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public int getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(int reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    // Helper method to add a recipe
    public void addRecipe(Recipe recipe) {
        recipes.add(recipe);
        recipe.setIngredient(this);
    }

    // Helper method to remove a recipe
    public void removeRecipe(Recipe recipe) {
        recipes.remove(recipe);
        recipe.setIngredient(null);
    }
}