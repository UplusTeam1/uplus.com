package com.lguplus.project.weeklysale.repository;

import com.lguplus.project.weeklysale.domain.WeeklySale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklySaleRepository extends JpaRepository<WeeklySale, Long> {
}
