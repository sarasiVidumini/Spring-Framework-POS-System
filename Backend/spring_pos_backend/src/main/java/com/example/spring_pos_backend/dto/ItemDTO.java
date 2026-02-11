package com.example.spring_pos_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDTO {
    private String code;
    private String description;
    private double unitPrice;
    private int qtyonHand;
}
