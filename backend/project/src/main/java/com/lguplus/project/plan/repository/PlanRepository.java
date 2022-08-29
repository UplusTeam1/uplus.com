package com.lguplus.project.plan.repository;

import com.lguplus.project.plan.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {

    Optional<Plan> findByName(String planName);
}
