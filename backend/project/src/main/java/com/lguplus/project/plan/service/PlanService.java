package com.lguplus.project.plan.service;

import com.lguplus.project.plan.domain.payload.PlanResponse;
import com.lguplus.project.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
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
