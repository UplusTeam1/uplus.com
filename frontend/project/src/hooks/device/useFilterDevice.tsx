import { useCallback } from 'react'
import { DeviceListData } from '../../api/device'
import { DeviceFilterType } from '../../modules/device'
import useTotalCharge from './useTotalCharge'

function useFilterDevice() {
  const { calculateTotalCharge } = useTotalCharge()

  const filterDevice = useCallback(
    (deviceList: DeviceListData | null, deviceFilter: DeviceFilterType) => {
      const storageCheck = !(deviceFilter.storage === 0)

      if (!deviceList) {
        return null
      }

      return deviceList
        .filter((device) =>
          storageCheck ? device.storage === deviceFilter.storage : true
        )
        .filter((device) =>
          deviceFilter.maker === '' ? true : device.brand === deviceFilter.maker
        )
        .filter(
          (device) =>
            deviceFilter.price[0] <=
            calculateTotalCharge(
              device,
              deviceFilter.discountIndex,
              deviceFilter.installmentIndex
            )
        )
        .filter(
          (device) =>
            calculateTotalCharge(
              device,
              deviceFilter.discountIndex,
              deviceFilter.installmentIndex
            ) <= deviceFilter.price[1]
        )
        .filter((device) => (deviceFilter.stock ? device.totalStock > 0 : true))
    },
    [calculateTotalCharge]
  )

  return { filterDevice }
}

export default useFilterDevice
