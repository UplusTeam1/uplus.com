import { useCallback } from 'react'
import { DeviceListData } from '../../api/device'
import { DeviceFilterType } from '../../modules/device'
import useTotalCharge from './useTotalCharge'

function useSortDevice() {
  const { calculateTotalCharge } = useTotalCharge()

  const sortDevice = useCallback(
    (deviceList: DeviceListData | null, deviceFilter: DeviceFilterType) => {
      if (!deviceList) {
        return null
      }

      const _deviceList = [...deviceList]

      if (deviceFilter.sortIndex === 0) {
        _deviceList.sort(function (a, b) {
          return (
            calculateTotalCharge(
              a,
              deviceFilter.discountIndex,
              deviceFilter.installmentIndex
            ) -
            calculateTotalCharge(
              b,
              deviceFilter.discountIndex,
              deviceFilter.installmentIndex
            )
          )
        })
      } else if (deviceFilter.sortIndex === 1) {
        _deviceList.sort(function (a, b) {
          return a.price - b.price
        })
      } else {
        _deviceList.sort(function (a, b) {
          return b.price - a.price
        })
      }

      return _deviceList
    },
    [calculateTotalCharge]
  )

  return { sortDevice }
}

export default useSortDevice
