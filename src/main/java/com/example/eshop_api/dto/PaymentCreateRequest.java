package com.example.eshop_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentCreateRequest {
    private Integer amount;
    private String currency;
    private String merchant;
    private String updateWebhook;
}
