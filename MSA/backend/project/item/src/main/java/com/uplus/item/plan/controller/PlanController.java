package com.uplus.item.plan.controller;

import com.uplus.item.plan.service.PlanService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("api/plan")
public class PlanController {

    private final PlanService planService;

    @Operation(summary = "Get All Plan")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!")
    })
    @GetMapping
    public ResponseEntity<?> getAllPlan() {
        return new ResponseEntity<>(planService.getPlanList(), HttpStatus.OK);
    }

}
