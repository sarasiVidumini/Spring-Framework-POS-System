package com.example.spring_pos_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Item {
    @Id
    private String code;
    private String description;
    private double unitPrice;
    private int qtyonHand;

    @OneToMany(mappedBy = "item",  cascade = CascadeType.REMOVE)
    private List<OrderDetail> orderDetails;



    public Item(String code, String description, double unitPrice, int qtyonHand) {
        this.code = code;
        this.description = description;
        this.unitPrice = unitPrice;
        this.qtyonHand = qtyonHand;
    }
}
