package com.example.spring_pos_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int qty;
    private double unitPrice;

    @ManyToOne
    private Orders orders;

    @ManyToOne
    private Item item;
}
