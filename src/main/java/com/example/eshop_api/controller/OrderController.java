package com.example.eshop_api.controller;

import com.example.eshop_api.dto.ItemDTO;
import com.example.eshop_api.dto.OrderDTO;
import com.example.eshop_api.model.Item;
import com.example.eshop_api.model.Order;
import com.example.eshop_api.repository.OrderRepository;
import com.example.eshop_api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO) {
        Order order = new Order();
        order.setFirstName(orderDTO.getFirstName());
        order.setLastName(orderDTO.getLastName());
        order.setStatus("PENDING");

        for (ItemDTO itemDTO : orderDTO.getItems()) {
            Item item = new Item();
            item.setQuantity(itemDTO.getQuantity());
            item.setProduct(productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produkt nenalezen")));
            item.setOrder(order);
            order.getItems().add(item);
        }

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

}
