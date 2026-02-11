package com.example.spring_pos_backend.service;

import com.example.spring_pos_backend.dto.OrderDTO;

public interface OrderService {
    void placeOrder(OrderDTO dto);
}
