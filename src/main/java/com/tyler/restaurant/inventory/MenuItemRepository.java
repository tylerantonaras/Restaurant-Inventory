package com.tyler.restaurant.inventory;

import org.springframework.data.jpa.repository.JpaRepository;

// This interface will automatically implement common database operations
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
