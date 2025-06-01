package com.ceylonpower.controller;

import com.ceylonpower.entity.MeterReading;
import com.ceylonpower.repository.CustomerRepository;
import com.ceylonpower.repository.MeterReadingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/readings")
@RequiredArgsConstructor
public class ReadingController {
    private final MeterReadingRepository readingRepo;
    private final CustomerRepository customerRepo;

    @PostMapping
    public ResponseEntity<?> addReading(@RequestBody MeterReading reading) {
        if (!customerRepo.existsById(reading.getAccountNumber())) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Customer not found");
            return ResponseEntity.badRequest().body(error);
        }
        readingRepo.save(reading);
        return ResponseEntity.ok("Reading saved");
    }
}