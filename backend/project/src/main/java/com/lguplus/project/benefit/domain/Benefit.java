package com.lguplus.project.benefit.domain;

import com.lguplus.project.benefitofplan.domain.BenefitOfPlan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Benefit {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "benefit")
    private List<BenefitOfPlan> benefitOfPlans = new ArrayList<>();
}
