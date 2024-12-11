package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    // Get all menu items
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemRepository.findAll());
    }

    // Get menu item by ID
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        return menuItemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new menu item
    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        try {
            MenuItem savedMenuItem = menuItemRepository.save(menuItem);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMenuItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update menu item
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        try {
            System.out.println("=== Update MenuItem Debug ===");
            System.out.println("Received update request for menu item " + id);
            System.out.println("Received menuItem data:");
            System.out.println("- Name: " + menuItem.getName());
            System.out.println("- Description: " + menuItem.getDescription());
            System.out.println("- Price: " + menuItem.getPrice());
            System.out.println("- Category: " + menuItem.getCategory());
            
            return menuItemRepository.findById(id)
                    .map(existingItem -> {
                        System.out.println("\nExisting item data:");
                        System.out.println("- Name: " + existingItem.getName());
                        System.out.println("- Description: " + existingItem.getDescription());
                        System.out.println("- Price: " + existingItem.getPrice());
                        System.out.println("- Category: " + existingItem.getCategory());
                        
                        existingItem.setName(menuItem.getName());
                        existingItem.setDescription(menuItem.getDescription());
                        existingItem.setPrice(menuItem.getPrice());
                        existingItem.setCategory(menuItem.getCategory());
                        
                        MenuItem savedItem = menuItemRepository.save(existingItem);
                        System.out.println("\nSaved item data:");
                        System.out.println("- Name: " + savedItem.getName());
                        System.out.println("- Description: " + savedItem.getDescription());
                        System.out.println("- Price: " + savedItem.getPrice());
                        System.out.println("- Category: " + savedItem.getCategory());
                        System.out.println("=== End Update MenuItem Debug ===");
                        
                        return ResponseEntity.ok(savedItem);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error updating menu item: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // Delete menu item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        try {
            if (!menuItemRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            menuItemRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Search menu items by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getMenuItemsByCategory(@PathVariable String category) {
        try {
            List<MenuItem> items = menuItemRepository.findByCategory(category);
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 