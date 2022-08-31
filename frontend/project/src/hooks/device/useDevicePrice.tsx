import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { DevicePrice, getDevicePrice } from '../../api/device'

function useDevicePrice(deviceCode: string, planName: string) {
  const devicePrice = useQuery<DevicePrice, AxiosError>(
    ['devicePrice', { deviceCode: deviceCode, planName: planName }],
    () => getDevicePrice(deviceCode, planName)
  )
  return devicePrice
}

export default useDevicePrice
