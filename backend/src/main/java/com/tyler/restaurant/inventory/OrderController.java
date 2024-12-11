package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        try {
            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update order
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        try {
            return orderRepository.findById(id)
                    .map(existingOrder -> {
                        existingOrder.setOrderDate(order.getOrderDate());
                        existingOrder.setSupplier(order.getSupplier());
                        existingOrder.setStatus(order.getStatus());
                        existingOrder.setTotalCost(order.getTotalCost());
                        
                        Order updatedOrder = orderRepository.save(existingOrder);
                        return ResponseEntity.ok(updatedOrder);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Delete order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        try {
            orderRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get orders by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
        List<Order> orders = orderRepository.findByStatus(status);
        return ResponseEntity.ok(orders);
    }

    // Get all orders sorted by status
    @GetMapping("/sorted")
    public ResponseEntity<List<Order>> getAllOrdersSorted(@RequestParam(defaultValue = "asc") String direction) {
        List<Order> orders;
        if (direction.equalsIgnoreCase("desc")) {
            orders = orderRepository.findAllByOrderByStatusDesc();
        } else {
            orders = orderRepository.findAllByOrderByStatusAsc();
        }
        return ResponseEntity.ok(orders);
    }
}
