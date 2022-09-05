package com.uplus.search.service;

import com.uplus.search.domain.payload.Source;
import com.uplus.search.domain.payload.autocompletion.AutoCompletionResponse;
import com.uplus.search.domain.payload.result.ChargeInfo;
import com.uplus.search.domain.payload.result.Detail;
import com.uplus.search.domain.payload.result.MonthInfo;
import com.uplus.search.domain.payload.result.SearchResponse;
import com.uplus.search.exception.ResultBodyNotFoundException;
import com.uplus.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    @Value("${contract.discount.rate}")
    private Double planDiscountRate;

    @Value("${year.interest.rate}")
    private Double interest;

    public List<SearchResponse> getAllSearchResults(String keyword) {
        Map<String, SearchResponse> map = new HashMap<>();

        Optional.of(searchRepository.getAllSearchResults(keyword))
                .map(HttpEntity::getBody)
                .orElseThrow(() -> new ResultBodyNotFoundException("검색 결과 body가 없습니다"))
                .getHits()
                .getHits()
                .forEach(hitInfo -> {
                    System.out.println(hitInfo.getScore());
                    Source s = hitInfo.getSource();
                    SearchResponse searchResponse = map.getOrDefault(s.getCode(), SearchResponse.builder()
                            .code(s.getCode())
                            .deviceDiscount(s.getDeviceDiscount())
                            .brand(s.getBrand())
                            .detailPerColor(new ArrayList<>())
                            .name(s.getName())
                            .price(s.getPrice())
                            .storage(s.getStorage())
                            .weeklySale(s.getWeeklySale())
                            .totalStock(0)
                            .planCharge(s.getPlanPrice())
                            .score(hitInfo.getScore())
                            .build());
                    Detail detail = Detail.builder()
                            .color(s.getColor())
                            .rgb(s.getRgb())
                            .picPaths(csvToList(s.getPicPaths()))
                            .stock(s.getStock())
                            .build();
                    List<Detail> details = searchResponse.getDetailPerColor();
                    details.add(detail);
                    searchResponse.setDetailPerColor(details);
                    searchResponse.setTotalStock(searchResponse.getTotalStock() + detail.getStock());
                    map.put(s.getCode(), searchResponse);
                });
        List<SearchResponse> searchResponses = new ArrayList<>();
        for (String code : map.keySet()) {
            SearchResponse searchResponse = map.get(code);
            searchResponse.setValues(new ChargeInfo(calculate(
                    searchResponse.getPrice(),
                    searchResponse.getDeviceDiscount(),
                    searchResponse.getPlanCharge()
            )));
            searchResponses.add(searchResponse);
        }
        Collections.sort(searchResponses, (s1, s2) -> Double.compare(s1.getScore(), s2.getScore()) * -1);
        return searchResponses;
    }

    public List<AutoCompletionResponse> getAllAutoCompletions(String input) {
        return Optional.of(searchRepository.getAllAutoCompletions(input))
                .map(HttpEntity::getBody)
                .orElseThrow(() -> new ResultBodyNotFoundException("자동 완성 결과 body가 없습니다"))
                .getHits()
                .getHits()
                .stream()
                .map((hitInfo -> AutoCompletionResponse.of(hitInfo.getSource())))
                .collect(Collectors.toList());
    }

    private List<MonthInfo> calculate(Integer devicePrice, Integer deviceDiscount, Integer planCharge) {
        List<MonthInfo> list = new ArrayList<>();
        // 공시지원금
        list.add(getMonthInfo(devicePrice - deviceDiscount, planCharge, .0));
        // 12개월
        list.add(getMonthInfo(devicePrice, planCharge, planDiscountRate));
        // 24개월 -> 12개월과 똑같음
        list.add(getMonthInfo(devicePrice, planCharge, planDiscountRate));
        // 할인 없음
        list.add(getMonthInfo(devicePrice, planCharge, .0));
        return list;
    }

    private MonthInfo getMonthInfo(
            Integer devicePrice,
            Integer planCharge,
            Double planDiscountRate
    ) {
        List<Integer> deviceCharges = new ArrayList<>();
        deviceCharges.add(devicePrice);
        for (int month = 12; month <= 36; month += 12) {
            deviceCharges.add(round(getDeviceChargeWithInterest(devicePrice, month, interest)));
        }
        List<Integer> totalCharges = new ArrayList<>();
        planCharge = Double.valueOf((1 - planDiscountRate) * planCharge).intValue();
        for (Integer deviceCharge : deviceCharges) {
            totalCharges.add(round(deviceCharge + planCharge));
        }
        totalCharges.set(0, planCharge);
        return new MonthInfo(deviceCharges, planCharge, totalCharges);
    }

    private Integer getDeviceChargeWithInterest(Integer deviceCharge, Integer month, Double interest) {
        interest /= 12;
        Double variance = Math.pow(1 + interest, month);
        Integer monthlyDeviceCharge = Double.valueOf(deviceCharge * interest * variance / (variance - 1)).intValue();
        monthlyDeviceCharge -= (monthlyDeviceCharge % 10);
        return monthlyDeviceCharge;
    }

    private Integer round(Integer i) {
        return (i + 5) / 10 * 10;
    }

    private List<String> csvToList(String csvString) {
        StringTokenizer st = new StringTokenizer(csvString, ",");
        List<String> list = new ArrayList<>();
        while (st.hasMoreTokens()) {
            list.add(st.nextToken());
        }
        return list;
    }

}
