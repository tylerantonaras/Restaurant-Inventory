package com.tyler.restaurant.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-details")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping
    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createOrderDetails(@RequestBody OrderDetailRequest request) {
        try {
            // Fetch the Order
            Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + request.getOrderId()));

            // Fetch the Ingredient
            Ingredient ingredient = ingredientRepository.findById(request.getIngredientId())
                .orElseThrow(() -> new RuntimeException("Ingredient not found with ID: " + request.getIngredientId()));

            // Create new OrderDetails
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setOrder(order);
            orderDetails.setIngredient(ingredient);
            orderDetails.setQuantity(request.getQuantity());
            orderDetails.setUnitPrice(request.getUnitPrice());

            // Save and return
            OrderDetails saved = orderDetailsRepository.save(orderDetails);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error creating order detail: " + e.getMessage());
        }
    }
}