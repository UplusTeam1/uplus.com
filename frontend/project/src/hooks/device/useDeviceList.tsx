import { useSelector } from 'react-redux'
import { RootState } from '../../modules'

function useDeviceList() {
  const deviceList = useSelector((state: RootState) => state.device.deviceList)
  return deviceList
}

export default useDeviceList
