package com.lguplus.project.plan.repository;

import com.lguplus.project.plan.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {

    Plan findByName(String planName);
}
