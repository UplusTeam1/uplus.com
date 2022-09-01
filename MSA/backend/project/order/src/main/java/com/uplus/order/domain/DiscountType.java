package com.uplus.order.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DiscountType {
    //할인유형

    //공시지원금
    DEVICE_DISCOUNT,
    //선택약정 24개월
    PLAN_DISCOUNT_24,
    //선택약정 12개월
    PLAN_DISCOUNT_12,
    //없음(ex. 다이렉트 요금제)
    NO_DISCOUNT
}
