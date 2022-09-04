import { useCallback } from 'react'
import { DeviceData, MonthlyChargeList } from '../../api/device'

function useTotalCharge() {
  const calculateTotalCharge = useCallback(
    (
      deviceData: DeviceData,
      discountIndex: number,
      installmentIndex: number
    ) => {
      const monthlyChargeList: MonthlyChargeList = deviceData.monthlyChargeList
      const recommendedCheck: boolean = discountIndex === -1
      const installmentCheck: boolean = !(installmentIndex === 0)
      const realDiscountIndex: number = recommendedCheck
        ? deviceData.recommendedDiscountIndex
        : discountIndex
      const _monthlyDiscountedDevicePrice: number =
        monthlyChargeList[realDiscountIndex].deviceCharge[installmentIndex]
      const _monthlyDiscountedPlanCharge: number =
        monthlyChargeList[realDiscountIndex].planCharge
      const totalMonthlyCharge: number = installmentCheck
        ? _monthlyDiscountedDevicePrice + _monthlyDiscountedPlanCharge
        : _monthlyDiscountedPlanCharge
      return totalMonthlyCharge
    },
    []
  )

  return { calculateTotalCharge }
}

export default useTotalCharge
