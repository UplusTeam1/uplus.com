package com.uplus.item.plan.domain;

import com.uplus.item.discount.domain.Discount;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Plan implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String data;

    private String sharing;

    private String voiceCall;

    private String message;

    private Integer price;

    @OneToMany(mappedBy = "plan")
    private List<Discount> discounts = new ArrayList<>();
}
