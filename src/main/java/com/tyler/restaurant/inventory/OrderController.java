package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get an order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
    }

    // Add a new order
    @PostMapping
    public Order addOrder(@RequestBody Order order) {
        Long supplierId = order.getSupplier().getId();
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id " + supplierId));
        order.setSupplier(supplier); // Validate and set the supplier
        return orderRepository.save(order);
    }

    // Update an existing order
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Long supplierId = updatedOrder.getSupplier().getId();
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id " + supplierId));

        return orderRepository.findById(id).map(order -> {
            order.setOrderDate(updatedOrder.getOrderDate());
            order.setTotalCost(updatedOrder.getTotalCost());
            order.setStatus(updatedOrder.getStatus());
            order.setSupplier(supplier); // Validate and set the supplier
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with id " + id));
    }

    // Delete an order by ID
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
}
