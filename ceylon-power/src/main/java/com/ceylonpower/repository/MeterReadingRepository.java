package com.ceylonpower.repository;

import com.ceylonpower.entity.MeterReading;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeterReadingRepository extends JpaRepository<MeterReading, Long> {
    List<MeterReading> findTop2ByAccountNumberOrderByReadingDateDesc(String accountNumber);
}