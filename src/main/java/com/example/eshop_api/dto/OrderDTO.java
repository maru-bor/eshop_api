package com.example.eshop_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {
    private String firstName;
    private String lastName;
    private List<ItemDTO> items;
}
