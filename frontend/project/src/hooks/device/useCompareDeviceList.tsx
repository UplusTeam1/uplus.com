import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../modules'
import { deviceActions, CompareDevice } from '../../modules/device'

function useCompareDeviceList() {
  const compareDeviceList = useSelector<RootState, Array<CompareDevice>>(
    (state) => state.device.compareDeviceList
  )
  const dispatch = useDispatch()

  const setCompareDeviceList = useCallback(
    (compareDeviceList: Array<CompareDevice>) => {
      dispatch(deviceActions.setCompareDeviceList(compareDeviceList))
    },
    [dispatch]
  )

  const resetCompareDeviceList = useCallback(() => {
    dispatch(deviceActions.resetCompareDeviceList(null))
  }, [dispatch])

  return {
    compareDeviceList,
    setCompareDeviceList,
    resetCompareDeviceList,
  }
}

export default useCompareDeviceList
