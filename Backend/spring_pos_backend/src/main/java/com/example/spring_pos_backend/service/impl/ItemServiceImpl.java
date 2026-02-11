package com.example.spring_pos_backend.service.impl;

import com.example.spring_pos_backend.dto.CustomerDTO;
import com.example.spring_pos_backend.dto.ItemDTO;
import com.example.spring_pos_backend.entity.Item;
import com.example.spring_pos_backend.repository.ItemRepo;
import com.example.spring_pos_backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final ItemRepo itemRepo;
    @Override
    public void saveItem(ItemDTO itemDTO) {
       itemRepo.save(new Item(
               itemDTO.getCode(),
               itemDTO.getDescription(),
               itemDTO.getUnitPrice(),
               itemDTO.getQtyonHand()
       ));
    }

    @Override
    public void updateItem(ItemDTO itemDTO) {
        itemRepo.save(new Item(
                itemDTO.getCode(),
                itemDTO.getDescription(),
                itemDTO.getUnitPrice(),
                itemDTO.getQtyonHand()
        ));
    }

    @Override
    public void deleteItem(String code) {
        itemRepo.deleteById(code);
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return itemRepo.findAll().stream().map(
                item -> new ItemDTO(
                        item.getCode(),
                        item.getDescription(),
                        item.getUnitPrice(),
                        item.getQtyonHand()
                )).toList();
    }

  
}
