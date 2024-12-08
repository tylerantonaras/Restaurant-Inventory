package com.tyler.restaurant.inventory;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders") // Explicitly name the table "orders" to avoid conflicts with the SQL reserved keyword "order"
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Primary key for the Order table

    private LocalDate orderDate;  // Date of the order
    private Double totalCost;     // Total cost of the order
    private String status;        // Status of the order (e.g., Pending, Completed)

    @ManyToOne
    @JoinColumn(name = "supplier_id") // Foreign key referencing the Supplier table
    private Supplier supplier;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
