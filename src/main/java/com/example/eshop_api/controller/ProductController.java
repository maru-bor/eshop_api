package com.example.eshop_api.controller;

import com.example.eshop_api.model.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> products = new ArrayList<>();
        Product product = new Product();
        product.setName("Shoe");
        product.setPrice(100);
        products.add(product);
        return ResponseEntity.ok(products);}

}
