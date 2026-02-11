package com.example.spring_pos_backend.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class CustomerDTO {
    private String cId;
    private String cName;
    private String cAddress;
}
