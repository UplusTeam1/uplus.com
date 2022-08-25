package com.lguplus.project.benefit.repository;

import com.lguplus.project.benefit.domain.Benefit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BenefitRepository extends JpaRepository<Benefit, Long> {
}
