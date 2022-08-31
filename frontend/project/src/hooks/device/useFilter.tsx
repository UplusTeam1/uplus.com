import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../modules'
import { deviceActions, DeviceFilter } from '../../modules/device'

function useFilter() {
  const planFilter = useSelector<RootState, string>(
    (state) => state.device.planFilter
  )
  const deviceFilter = useSelector<RootState, DeviceFilter>(
    (state) => state.device.deviceFilter
  )
  const dispatch = useDispatch()

  const setPlanFilter = useCallback(
    (planName: string) => {
      dispatch(deviceActions.setPlanFilter(planName))
    },
    [dispatch]
  )

  const setDeviceFilter = useCallback(
    (deviceFilter: DeviceFilter) => {
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
