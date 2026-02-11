package com.example.spring_pos_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    private String code;
    private String description;
    private double unitPrice;
    private int qtyonHand;
}
