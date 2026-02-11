package com.example.spring_pos_backend.controller;

import com.example.spring_pos_backend.dto.OrderDTO;
import com.example.spring_pos_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody OrderDTO dto) {
        orderService.placeOrder(dto);
        return ResponseEntity.ok("Order placed successfully");
    }
}
