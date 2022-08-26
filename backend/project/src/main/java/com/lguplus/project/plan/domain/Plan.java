package com.lguplus.project.plan.domain;

import com.lguplus.project.benefitofplan.domain.BenefitOfPlan;
import com.lguplus.project.discount.domain.Discount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Plan implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String data;

    private String sharing;

    private String voice_call;

    private String message;

    private Integer price;

    @OneToMany(mappedBy = "plan")
    private List<Discount> discounts = new ArrayList<>();

    @OneToMany(mappedBy = "plan")
    private List<BenefitOfPlan> benefitOfPlans = new ArrayList<>();
}
