package com.example.eshop_api.controller;

import com.example.eshop_api.dto.ItemDTO;
import com.example.eshop_api.dto.OrderDTO;
import com.example.eshop_api.dto.PaymentCreateRequest;
import com.example.eshop_api.dto.PaymentCreateResponse;
import com.example.eshop_api.model.Item;
import com.example.eshop_api.model.Order;
import com.example.eshop_api.repository.OrderRepository;
import com.example.eshop_api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    private final String PAYMENT_URL = "http://localhost:8000/api/payment";
    private final RestTemplate restTemplate = new RestTemplate();

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

        System.out.println("Order saved: " + savedOrder);

        int totalAmount = savedOrder.getItems().stream()
                .mapToInt(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();

        System.out.println("Total amount: " + totalAmount);

        PaymentCreateRequest req = new PaymentCreateRequest(
                totalAmount,
                "CZK",
                "my-eshop",
                "http://localhost:8080/api/payment/webhook"
        );

        PaymentCreateResponse response =
                restTemplate.postForObject(PAYMENT_URL, req, PaymentCreateResponse.class);

        Long paymentSessionId = response.getSessionId();

        System.out.println("sessionId: " + paymentSessionId);

        savedOrder.setPaymentSessionId(paymentSessionId);
        savedOrder.setStatus("WAITING_FOR_PAYMENT");

        orderRepository.save(savedOrder);

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/by-session/{sessionId}")
    public ResponseEntity<Order> getOrderBySession(@PathVariable Long sessionId) {
        System.out.println("get order by sessionId: " + sessionId);
        Optional<Order> order = orderRepository.findByPaymentSessionId(sessionId);
        System.out.println("order: " + order);
        return order
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}
