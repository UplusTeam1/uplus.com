package com.lguplus.project.discount.repository;

import com.lguplus.project.discount.domain.Discount;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    @EntityGraph(attributePaths = {"device", "plan"})
    List<Discount> findByPlan_Name(String planName);

    Optional<Discount> findByDeviceCodeAndPlanName(String deviceCode, String planName);
}
