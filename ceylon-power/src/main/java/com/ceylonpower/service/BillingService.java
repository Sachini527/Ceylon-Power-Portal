package com.ceylonpower.service;

import com.ceylonpower.entity.MeterReading;
import com.ceylonpower.repository.CustomerRepository;
import com.ceylonpower.repository.MeterReadingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BillingService {
    private final MeterReadingRepository readingRepo;
    private final CustomerRepository customerRepo;

    public Map<String, Object> calculateBill(String accountNumber) {
        // Check if the customer exists
        if (!customerRepo.existsById(accountNumber)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Customer with account number " + accountNumber + " not found"
            );
        }

        List<MeterReading> readings = readingRepo.findTop2ByAccountNumberOrderByReadingDateDesc(accountNumber);
        if (readings.size() < 2) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Not enough readings to calculate bill for account " + accountNumber
            );
        }

        MeterReading last = readings.get(0);
        MeterReading prev = readings.get(1);

        long dateDiff = ChronoUnit.DAYS.between(prev.getReadingDate(), last.getReadingDate());
        int unitsUsed = last.getReadingValue() - prev.getReadingValue();

        long firstRange = dateDiff;
        long secondRange = 2 * dateDiff;
        long thirdRange = Math.max(0, unitsUsed - (firstRange + secondRange));

        long firstCharge = firstRange * 20;
        long secondCharge = secondRange * 35;
        long thirdCharge = 0;
        long fixedCharge = 0;

        if (thirdRange > 0) {
            int rate = 40;
            for (int i = 0; i < thirdRange; i++) {
                thirdCharge += (rate + i);
            }
            fixedCharge = 1500;
        }

        long total = firstCharge + secondCharge + thirdCharge + fixedCharge;

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("lastReadingDate", last.getReadingDate());
        result.put("previousReadingDate", prev.getReadingDate());
        result.put("lastMeterReading", last.getReadingValue());
        result.put("previousMeterReading", prev.getReadingValue());
        result.put("fixedCharge", fixedCharge);
        result.put("firstRangeCharge", firstCharge);
        result.put("secondRangeCharge", secondCharge);
        result.put("thirdRangeCharge", thirdCharge);
        result.put("totalCharge", total);
        return result;
    }
}
