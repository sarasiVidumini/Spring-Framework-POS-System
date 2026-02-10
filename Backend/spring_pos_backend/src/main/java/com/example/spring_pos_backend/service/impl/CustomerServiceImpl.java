package com.example.spring_pos_backend.service.impl;

import com.example.spring_pos_backend.dto.CustomerDTO;
import com.example.spring_pos_backend.entity.Customer;
import com.example.spring_pos_backend.repository.CustomerRepo;
import com.example.spring_pos_backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

    @Service
    @RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
        private final CustomerRepo customerRepo;
    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        customerRepo.save(new Customer(
                customerDTO.getCId(),
                customerDTO.getCName(),
                customerDTO.getCAddress()
        ));
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        customerRepo.save(new Customer(
                customerDTO.getCId(),
                customerDTO.getCName(),
                customerDTO.getCAddress()
        ));
    }

    @Override
    public void deleteCustomer(String customerId) {

    }

    @Override
    public void getAllCustomer(CustomerDTO customerDTO) {

    }
}
