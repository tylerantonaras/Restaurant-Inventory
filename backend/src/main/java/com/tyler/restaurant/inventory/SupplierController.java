package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Get all suppliers
    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        return ResponseEntity.ok(supplierRepository.findAll());
    }

    // Get supplier by ID
    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
        return supplierRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new supplier
    @PostMapping
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier) {
        try {
            Supplier savedSupplier = supplierRepository.save(supplier);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSupplier);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update supplier
    @PutMapping("/{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        try {
            return supplierRepository.findById(id)
                    .map(existingSupplier -> {
                        existingSupplier.setName(supplier.getName());
                        existingSupplier.setContactInfo(supplier.getContactInfo());
                        existingSupplier.setAddress(supplier.getAddress());
                        existingSupplier.setEmail(supplier.getEmail());
                        existingSupplier.setPhone(supplier.getPhone());
                        
                        Supplier updatedSupplier = supplierRepository.save(existingSupplier);
                        return ResponseEntity.ok(updatedSupplier);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Delete supplier
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSupplier(@PathVariable Long id) {
        try {
            // First, update any orders with this supplier to set supplier to null
            List<Order> orders = orderRepository.findBySupplier_Id(id);
            for (Order order : orders) {
                order.setSupplier(null);
                orderRepository.save(order);
            }
            
            // Then delete the supplier
            supplierRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Search suppliers by name
    @GetMapping("/search")
    public ResponseEntity<List<Supplier>> searchSuppliers(@RequestParam String name) {
        try {
            List<Supplier> suppliers = supplierRepository.findByNameContainingIgnoreCase(name);
            return ResponseEntity.ok(suppliers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
