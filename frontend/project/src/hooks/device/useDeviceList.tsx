import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeviceListData } from '../../api/device'
import { AsyncState } from '../../lib/reducerUtils'
import { RootState } from '../../modules'
import { deviceActions } from '../../modules/device'

function useDeviceList() {
  const deviceList = useSelector<RootState, AsyncState<DeviceListData, Error>>(
    (state) => state.device.deviceList
  )
  const dispatch = useDispatch()

  const getDeviceList = useCallback(
    (planName: string) => {
      dispatch(deviceActions.getDeviceListAsync.request(planName))
    },
    [dispatch]
  )

  return { deviceList, getDeviceList }
}

export default useDeviceList
