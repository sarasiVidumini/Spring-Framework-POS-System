package com.example.spring_pos_backend.repository;

import com.example.spring_pos_backend.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Orders, String> {
}
