import { useCallback } from 'react'
import { DeviceData, DevicePrice, MonthlyChargeList } from '../../api/device'
import { DISCOUNT_TYPE_LIST } from '../../data/staticData'

interface DiscountType {
  name: string
  index: number
}

export interface CalculatedPrice {
  discountType: DiscountType
  realDevicePrice: string
  deviceDiscount: string
  discountedDevicePrice: string
  monthlyRealDeviceCharge: string
  monthlyDeviceDiscount: string
  _monthlyDiscountedDevicePrice: number
  monthlyDiscountedDevicePrice: string
  interestCharge: string
  monthlyRealPlanCharge: string
  monthlyPlanDiscount: string
  month12PlanDiscount: string
  month24PlanDiscount: string
  _monthlyDiscountedPlanCharge: number
  monthlyDiscountedPlanCharge: string
  _totalMonthlyCharge: number
  totalMonthlyCharge: string
}

function priceFormat(value: number) {
  return `${value.toLocaleString('ko-KR')}`
}

function useCalculatedPrice() {
  const calculatePrice = useCallback(
    (
      deviceData: DeviceData | DevicePrice | undefined,
      discountIndex: number,
      installmentIndex: number
    ) => {
      if (!deviceData) {
        return null
      }

      const monthlyChargeList: MonthlyChargeList = deviceData.monthlyChargeList
      const recommendedCheck: boolean = discountIndex === -1
      const installmentCheck: boolean = !(installmentIndex === 0)
      const realDiscountIndex: number = recommendedCheck
        ? deviceData.recommendedDiscountIndex
        : discountIndex

      const discountType: DiscountType = {
        name: DISCOUNT_TYPE_LIST[realDiscountIndex + 1].label,
        index: realDiscountIndex,
      }

      const _realDevicePrice: number = deviceData.price
      const _deviceDiscount: number = deviceData.deviceDiscount
      const realDevicePrice: string = priceFormat(_realDevicePrice)
      const deviceDiscount: string = priceFormat(_deviceDiscount)
      const discountedDevicePrice: string = priceFormat(
        _realDevicePrice - _deviceDiscount
      )

      const _monthlyRealDeviceCharge: number =
        monthlyChargeList[1].deviceCharge[installmentIndex]
      const _monthlyDiscountedDevicePrice: number =
        monthlyChargeList[realDiscountIndex].deviceCharge[installmentIndex]
      const _interestCharge: number =
        discountIndex === 0
          ? deviceData.discountedInterestList[installmentIndex]
          : deviceData.defaultInterestList[installmentIndex]
      const monthlyRealDeviceCharge: string = priceFormat(
        _monthlyRealDeviceCharge
      )
      const monthlyDeviceDiscount: string = priceFormat(
        _monthlyRealDeviceCharge - _monthlyDiscountedDevicePrice
      )
      const monthlyDiscountedDevicePrice: string = priceFormat(
        _monthlyDiscountedDevicePrice
      )
      const interestCharge: string = priceFormat(_interestCharge)

      const _monthlyRealPlanCharge: number = monthlyChargeList[0].planCharge
      const _monthlyDiscountedPlanCharge: number =
        monthlyChargeList[realDiscountIndex].planCharge
      const _monthlyPlanDiscount: number =
        _monthlyRealPlanCharge - _monthlyDiscountedPlanCharge
      const _monthlyStaticPlanDiscount: number =
        _monthlyRealPlanCharge - monthlyChargeList[1].planCharge
      const monthlyRealPlanCharge: string = priceFormat(_monthlyRealPlanCharge)
      const monthlyPlanDiscount: string = priceFormat(_monthlyPlanDiscount)
      const month12PlanDiscount: string = priceFormat(
        _monthlyStaticPlanDiscount * 12
      )
      const month24PlanDiscount: string = priceFormat(
        _monthlyStaticPlanDiscount * 24
      )
      const monthlyDiscountedPlanCharge: string = priceFormat(
        _monthlyDiscountedPlanCharge
      )

      const _totalMonthlyCharge: number = installmentCheck
        ? _monthlyDiscountedDevicePrice + _monthlyDiscountedPlanCharge
        : _monthlyDiscountedPlanCharge
      const totalMonthlyCharge: string = priceFormat(_totalMonthlyCharge)

      return {
        discountType,
        realDevicePrice,
        deviceDiscount,
        discountedDevicePrice,
        monthlyRealDeviceCharge,
        monthlyDeviceDiscount,
        _monthlyDiscountedDevicePrice,
        monthlyDiscountedDevicePrice,
        interestCharge,
        monthlyRealPlanCharge,
        monthlyPlanDiscount,
        month12PlanDiscount,
        month24PlanDiscount,
        _monthlyDiscountedPlanCharge,
        monthlyDiscountedPlanCharge,
        _totalMonthlyCharge,
        totalMonthlyCharge,
      }
    },
    []
  )

  return { calculatePrice }
}

export default useCalculatedPrice
