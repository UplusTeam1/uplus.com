package com.uplus.item.device.service;

import com.uplus.item.device.domain.Device;
import com.uplus.item.device.domain.DeviceDetail;
import com.uplus.item.device.domain.payload.KafkaCreateOrderSuccess;
import com.uplus.item.device.domain.payload.KafkaOrderDetail;
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

    public void createOrder(KafkaOrderDetail kafkaOrderDetail) {
        try {
            String deviceCode = kafkaOrderDetail.getDeviceCode();
            String planName = kafkaOrderDetail.getPlanName();
            String color = kafkaOrderDetail.getColor();

            Device device = deviceRepository.findByCode(deviceCode)
                    .orElseThrow(() -> new DeviceNotFoundException("Exception : Device Not Found"));
            Plan plan = planRepository.findByName(planName)
                    .orElseThrow(() -> new PlanNotFoundException("Exception : Plan Not Found"));
            DeviceDetail deviceDetail = deviceDetailRepository.findByColor(color)
                    .orElseThrow(() -> new ColorNotFoundException("Exception : Color Not Found"));

            deviceDetail.increaseStock();
            KafkaCreateOrderSuccess kafkaCreateOrderSuccess = new KafkaCreateOrderSuccess(
                    device.getName(),
                    deviceDetail.getPicPaths());

            kafkaProducer.sendCreateOrderSuccessObject(kafkaCreateOrderSuccess);
        }
        catch (Exception exception) {
            kafkaProducer.sendCreateOrderFailMessage();
        }

    }

    public void deleteOrder(KafkaOrderDetail kafkaOrderDetail) {
        try {
            String deviceCode = kafkaOrderDetail.getDeviceCode();
            String planName = kafkaOrderDetail.getPlanName();
            String color = kafkaOrderDetail.getColor();

            Device device = deviceRepository.findByCode(deviceCode)
                    .orElseThrow(() -> new DeviceNotFoundException("Exception : Device Not Found"));
            Plan plan = planRepository.findByName(planName)
                    .orElseThrow(() -> new PlanNotFoundException("Exception : Plan Not Found"));
            DeviceDetail deviceDetail = deviceDetailRepository.findByColor(color)
                    .orElseThrow(() -> new ColorNotFoundException("Exception : Color Not Found"));

            deviceDetail.decreaseStock();
            kafkaProducer.sendDeleteOrderSuccessMessage();
        }
        catch (Exception exception) {
            kafkaProducer.sendDeleteOrderFailMessage();
        }
    }
}


