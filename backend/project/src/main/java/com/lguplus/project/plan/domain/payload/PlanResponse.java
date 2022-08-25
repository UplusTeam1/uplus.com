package com.lguplus.project.plan.domain.payload;

import com.lguplus.project.plan.domain.Plan;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanResponse {

    private Long id;

    private String name;

    private String data;

    private String sharing;

    private String voice_call;

    private String message;

    private Integer price;

    public static PlanResponse of(Plan plan) {
        return PlanResponse.builder()
                .id(plan.getId())
                .name(plan.getName())
                .data(plan.getData())
                .sharing(plan.getSharing())
                .voice_call(plan.getVoice_call())
                .message(plan.getMessage())
                .price(plan.getPrice())
                .build();
    }
}
