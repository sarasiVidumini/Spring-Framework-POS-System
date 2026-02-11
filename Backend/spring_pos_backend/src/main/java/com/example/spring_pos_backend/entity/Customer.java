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

public class Customer {
    @Id
    private String id;
    private String name;
    private String address;

    @OneToMany(mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Orders> orders;

    public Customer(String cId, String cName, String cAddress) {
        this.id = cId;
        this.name = cName;
        this.address = cAddress;
    }
}
