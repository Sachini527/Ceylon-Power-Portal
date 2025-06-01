package com.ceylonpower.controller;

import com.ceylonpower.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bill")
@RequiredArgsConstructor
public class BillController {
    private final BillingService billingService;

    @GetMapping("/{accountNumber}")
    public Map<String, Object> getBill(@PathVariable String accountNumber) {
        return billingService.calculateBill(accountNumber);
    }
}
