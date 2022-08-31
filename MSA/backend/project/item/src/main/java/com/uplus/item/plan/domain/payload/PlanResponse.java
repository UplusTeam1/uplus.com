package com.uplus.item.plan.domain.payload;

import com.uplus.item.plan.domain.Plan;
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

    private String voiceCall;

    private String message;

    private Integer price;

    public static PlanResponse of(Plan plan) {
        return PlanResponse.builder()
                .id(plan.getId())
                .name(plan.getName())
                .data(plan.getData())
                .sharing(plan.getSharing())
                .voiceCall(plan.getVoiceCall())
                .message(plan.getMessage())
                .price(plan.getPrice())
                .build();
    }
}
