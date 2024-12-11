package com.tyler.restaurant.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByStatusAsc();
    List<Order> findAllByOrderByStatusDesc();
    List<Order> findByStatus(String status);
    List<Order> findBySupplier_Id(Long supplierId);
}
