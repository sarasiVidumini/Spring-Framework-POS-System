package com.example.spring_pos_backend.service;

import com.example.spring_pos_backend.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    public void saveCustomer(CustomerDTO customerDTO);

    public void updateCustomer(CustomerDTO customerDTO);

    public void deleteCustomer(String customerId);

    public List<CustomerDTO> getAllCustomer();
}
