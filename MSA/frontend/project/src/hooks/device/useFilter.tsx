import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../modules'
import { deviceActions, DeviceFilterType } from '../../modules/device'

function useFilter() {
  const planFilter: string = useSelector<RootState, string>(
    (state) => state.device.planFilter
  )
  const deviceFilter: DeviceFilterType = useSelector<
    RootState,
    DeviceFilterType
  >((state) => state.device.deviceFilter)
  const dispatch = useDispatch()

  const setPlanFilter = useCallback(
    (planName: string) => {
      dispatch(deviceActions.setPlanFilter(planName))
    },
    [dispatch]
  )

  const setDeviceFilter = useCallback(
    (deviceFilter: DeviceFilterType) => {
      dispatch(deviceActions.setDeviceFilter(deviceFilter))
    },
    [dispatch]
  )

  const resetFilter = useCallback(() => {
    dispatch(deviceActions.resetFilter(null))
  }, [dispatch])

  return {
    planFilter,
    deviceFilter,
    setPlanFilter,
    setDeviceFilter,
    resetFilter,
  }
}

export default useFilter
