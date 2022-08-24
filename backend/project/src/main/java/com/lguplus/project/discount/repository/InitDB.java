package com.lguplus.project.discount.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class InitDB {

    @Autowired
    private DiscountRepository discountRepository;

    @PostConstruct
    private void init() {
        // 초기화 처리

    }
}