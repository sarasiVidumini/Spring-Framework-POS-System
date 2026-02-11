package com.example.spring_pos_backend.controller;

import com.example.spring_pos_backend.dto.ItemDTO;
import com.example.spring_pos_backend.service.impl.ItemServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/item")
@CrossOrigin
@RequiredArgsConstructor

public class ItemController {
    private final ItemServiceImpl itemServiceImpl;

    @PostMapping
    public void saveItem(@RequestBody ItemDTO itemDTO) {
        itemServiceImpl.saveItem(itemDTO);
    }

    @PutMapping
    public void updateItem(@RequestBody ItemDTO itemDTO) {
        itemServiceImpl.updateItem(itemDTO);
    }

    @DeleteMapping("/{code}")
    public void deleteItem(@PathVariable String code) {
        itemServiceImpl.deleteItem(code);
    }

    @GetMapping
   public List<ItemDTO> getAllItems() {
        return  itemServiceImpl.getAllItems();
   }
}
