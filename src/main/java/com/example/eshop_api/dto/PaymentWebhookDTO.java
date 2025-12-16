package com.example.eshop_api.dto;

import lombok.Data;

@Data
public class PaymentWebhookDTO {
    private long sessionId;
    private String status;
}
