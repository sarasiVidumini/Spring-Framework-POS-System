package com.example.spring_pos_backend.service.impl;

import com.example.spring_pos_backend.dto.OrderDTO;
import com.example.spring_pos_backend.dto.OrderDetailDTO;
import com.example.spring_pos_backend.entity.*;
import com.example.spring_pos_backend.repository.CustomerRepo;
import com.example.spring_pos_backend.repository.ItemRepo;
import com.example.spring_pos_backend.repository.OrderRepo;
import com.example.spring_pos_backend.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final CustomerRepo customerRepo;
    private final ItemRepo itemRepo;

    @Override
    public void placeOrder(OrderDTO dto) {

        // 1) Validate customer
        Customer customer = customerRepo.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found: " + dto.getCustomerId()));

        // 2) Build order
        Orders order = new Orders();
        order.setOrderId(dto.getOrderId());
        order.setDate(dto.getDate());
        order.setCustomer(customer);

        // 3) Build details + stock update
        List<OrderDetail> details = new ArrayList<>();

        for (OrderDetailDTO d : dto.getOrderDetails()) {
            Item item = itemRepo.findById(d.getItemCode())
                    .orElseThrow(() -> new RuntimeException("Item not found: " + d.getItemCode()));

            // Stock check
            if (item.getQtyonHand() < d.getQty()) {
                throw new RuntimeException("Insufficient stock for item: " + item.getCode());
            }

            // Reduce stock
            item.setQtyonHand(item.getQtyonHand() - d.getQty());

            OrderDetail od = new OrderDetail();
            od.setOrders(order);
            od.setItem(item);
            od.setQty(d.getQty());
            od.setUnitPrice(d.getUnitPrice());

            details.add(od);
        }

        order.setOrderDetails(details);

        // 4) Save order (cascade => details auto save)
        orderRepo.save(order);
    }
}
