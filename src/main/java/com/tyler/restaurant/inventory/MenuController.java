package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu-items")
public class MenuController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping
    public List<MenuItem> getMenuItems() {
        return menuItemRepository.findAll();
    }

    @PostMapping
    public MenuItem createMenuItem(@RequestBody MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @GetMapping("/{id}")
    public MenuItem getMenuItem(@PathVariable Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));
    }

    // Optional: delete endpoint
    @DeleteMapping("/{id}")
    public void deleteMenuItem(@PathVariable Long id) {
        menuItemRepository.deleteById(id);
    }
}