package com.example.spring_pos_backend.controller;

import com.example.spring_pos_backend.dto.CustomerDTO;
import com.example.spring_pos_backend.entity.Customer;
import com.example.spring_pos_backend.repository.CustomerRepo;
import com.example.spring_pos_backend.service.impl.CustomerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {
    private final CustomerServiceImpl customerServiceImpl;

    @PostMapping
    public void saveCustomer(@RequestBody CustomerDTO customerDTO) {
        customerServiceImpl.saveCustomer(customerDTO);
    }

    @PutMapping
    public void updateCustomer(@RequestBody CustomerDTO customerDTO){
        customerServiceImpl.updateCustomer(customerDTO);
    }

    @GetMapping
    public List<CustomerDTO> getAllCustomer(){
        return customerServiceImpl.getAllCustomer();
    }
}
