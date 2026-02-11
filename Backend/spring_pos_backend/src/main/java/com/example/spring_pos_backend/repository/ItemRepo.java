package com.example.spring_pos_backend.repository;

import com.example.spring_pos_backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item, String> {
}
