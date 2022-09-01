package com.uplus.item.device.service;

import com.uplus.item.device.domain.Device;
import com.uplus.item.device.domain.DeviceDetail;
import com.uplus.item.device.domain.payload.KafkaCreateOrderRequest;
import com.uplus.item.device.domain.payload.KafkaCreateOrderSuccessResponse;
import com.uplus.item.device.domain.payload.KafkaDeleteOrderRequest;
import com.uplus.item.device.exception.ColorNotFoundException;
import com.uplus.item.device.exception.DeviceNotFoundException;
import com.uplus.item.device.repository.DeviceDetailRepository;
import com.uplus.item.device.repository.DeviceRepository;
import com.uplus.item.plan.domain.Plan;
import com.uplus.item.plan.exception.PlanNotFoundException;
import com.uplus.item.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DeviceKafkaService {

    private final DeviceRepository deviceRepository;
    private final DeviceDetailRepository deviceDetailRepository;
    private final PlanRepository planRepository;
    private final KafkaProducer kafkaProducer;

    public void createOrder(KafkaCreateOrderRequest kafkaCreateOrderRequest) {
        try {
            Long orderNumber = kafkaCreateOrderRequest.getOrderNumber();
            String deviceCode = kafkaCreateOrderRequest.getDeviceCode();
            String planName = kafkaCreateOrderRequest.getPlanName();
            String color = kafkaCreateOrderRequest.getColor();

            Device device = deviceRepository.findByCode(deviceCode)
                    .orElseThrow(() -> new DeviceNotFoundException("Exception : Device Not Found"));
            Plan plan = planRepository.findByName(planName)
                    .orElseThrow(() -> new PlanNotFoundException("Exception : Plan Not Found"));
            DeviceDetail deviceDetail = deviceDetailRepository.findByColor(color)
                    .orElseThrow(() -> new ColorNotFoundException("Exception : Color Not Found"));

            deviceDetail.increaseStock();
            String picPaths = deviceDetail.getPicPaths();
            KafkaCreateOrderSuccessResponse kafkaCreateOrderSuccessResponse =
                    new KafkaCreateOrderSuccessResponse(orderNumber, deviceCode, picPaths);

            kafkaProducer.sendCreateOrderSuccessObject(kafkaCreateOrderSuccessResponse);
        }
        catch (Exception exception) {
            kafkaProducer.sendCreateOrderFailMessage();
        }

    }

    public void deleteOrder(KafkaDeleteOrderRequest kafkaDeleteOrderRequest) {
        try {
            Long orderNumber = kafkaDeleteOrderRequest.getOrderNumber();
            String deviceCode = kafkaDeleteOrderRequest.getDeviceCode();
            String color = kafkaDeleteOrderRequest.getColor();

            Device device = deviceRepository.findByCode(deviceCode)
                    .orElseThrow(() -> new DeviceNotFoundException("Exception : Device Not Found"));
            DeviceDetail deviceDetail = deviceDetailRepository.findByColor(color)
                    .orElseThrow(() -> new ColorNotFoundException("Exception : Color Not Found"));

            deviceDetail.decreaseStock();
            kafkaProducer.sendDeleteOrderSuccessMessage();
        }
        catch (Exception exception) {
            kafkaProducer.sendDeleteOrderFailMessage();
        }
    }

    public void testKafka(KafkaCreateOrderRequest kafkaCreateOrderRequest) {
        System.out.println("DeviceKafkaService.testKafka");
        Long orderNumber = kafkaCreateOrderRequest.getOrderNumber();
        String deviceCode = kafkaCreateOrderRequest.getDeviceCode();
        String planName = kafkaCreateOrderRequest.getPlanName();
        String color = kafkaCreateOrderRequest.getColor();

        KafkaCreateOrderRequest result = new KafkaCreateOrderRequest(orderNumber, deviceCode, planName, color);

        System.out.println("Consume = " + result.toString());
    }
}


