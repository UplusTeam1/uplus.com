import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { DeviceOption, getDeviceOption } from '../../api/device'

function useDeviceOption(deviceCode: string) {
  const deviceOption = useQuery<DeviceOption, AxiosError>(
    ['deviceOption', deviceCode],
    () => getDeviceOption(deviceCode)
  )
  return deviceOption
}

export default useDeviceOption
