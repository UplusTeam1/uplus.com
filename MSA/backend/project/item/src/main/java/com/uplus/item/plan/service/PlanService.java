package com.uplus.item.plan.service;

import com.uplus.item.plan.domain.payload.PlanResponse;
import com.uplus.item.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    public List<PlanResponse> getPlanList() {
        return planRepository.findAll()
                .stream()
                .map(PlanResponse::of)
                .collect(Collectors.toList());
    }
}
