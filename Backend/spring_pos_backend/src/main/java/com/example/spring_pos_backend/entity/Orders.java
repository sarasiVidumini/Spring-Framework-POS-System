package com.example.spring_pos_backend.entity;

import com.example.spring_pos_backend.entity.Customer;
import com.example.spring_pos_backend.entity.OrderDetail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Orders {

    @Id
    private String orderId;

    private LocalDate date;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
}
