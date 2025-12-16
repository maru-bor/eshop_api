package com.example.eshop_api.controller;

import com.example.eshop_api.dto.PaymentWebhookDTO;
import com.example.eshop_api.model.Order;
import com.example.eshop_api.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final OrderRepository orderRepository;

    @PostMapping("/webhook")
    public void webhook(@RequestBody PaymentWebhookDTO dto) {
        System.out.println("webhook: " + dto);

        Order order = orderRepository.findByPaymentSessionId(dto.getSessionId())
                .orElse(null);

        if (order == null) return;

        System.out.println(dto.getStatus());

        if ("PAID".equals(dto.getStatus())) {
            order.setStatus("PAID");
        }

        if ("CLOSED".equals(dto.getStatus())) {
            order.setStatus("CANCELLED");
        }

        orderRepository.save(order);
    }
}
