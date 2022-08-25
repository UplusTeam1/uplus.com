package com.lguplus.project.benefitofplan.domain;

import com.lguplus.project.benefit.domain.Benefit;
import com.lguplus.project.plan.domain.Plan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BenefitOfPlan {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plan_name")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "benefit_id")
    private Benefit benefit;
}
