package com.example.spring_pos_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class CustomerEntity {
    @Id
    private String cId;
    private String cName;
    private String cAddress;
}
