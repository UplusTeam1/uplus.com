package com.lguplus.project.discount.repository;

import com.lguplus.project.discount.domain.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
