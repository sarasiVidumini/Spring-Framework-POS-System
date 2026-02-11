package com.example.spring_pos_backend.service.impl;

import com.example.spring_pos_backend.dto.CustomerDTO;
import com.example.spring_pos_backend.entity.Customer;
import com.example.spring_pos_backend.repository.CustomerRepo;
import com.example.spring_pos_backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

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
        System.out.println(customerId);
        customerRepo.deleteById(customerId);
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        return customerRepo.findAll().stream().map(
                customer -> new CustomerDTO(
                        customer.getId(),
                        customer.getName(),
                        customer.getAddress()
                )).toList();
    }
}
