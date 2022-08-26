package com.lguplus.project.discount.repository;

import com.lguplus.project.discount.domain.Discount;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    @EntityGraph(attributePaths = {"device", "plan"})
    List<Discount> findByPlan_Name(String planName);

    Discount findByDeviceCodeAndPlanName(String deviceCode, String planName);
}
