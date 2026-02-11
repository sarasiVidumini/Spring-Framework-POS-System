package com.example.spring_pos_backend.repository;

import com.example.spring_pos_backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer, String> {
}
