package com.uplus.order.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum JoinType {
    //가입유형

    //기기변경
    DEVICE_CHANGE,
    //번호이동
    NUMBER_TRANSFER,
    //신규가입
    NEW_SUBSCRIPTION
}
