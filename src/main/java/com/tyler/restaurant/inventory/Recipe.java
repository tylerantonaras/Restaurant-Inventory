package com.tyler.restaurant.inventory;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MenuItemID", nullable = false) // Updated to match the database column
    private MenuItem menuItem;

    @ManyToOne
    @JoinColumn(name = "IngredientID", nullable = false) // Updated to match the database column
    private Ingredient ingredient;

    @Column(nullable = false)
    @Min(0) // Ensures quantity is non-negative
    private double quantity;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}
