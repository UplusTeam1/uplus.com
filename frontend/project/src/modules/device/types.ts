import { deviceActions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { DeviceListData } from '../../api/device'
import { CalculatedPrice } from '../../hooks/device/useCalculatedPrice'

export interface DeviceFilterType {
  [key: string]: number | string | Array<number> | boolean
  discountIndex: number
  installmentIndex: number
  storage: number
  maker: string
  stock: boolean
  price: Array<number>
  sortIndex: number
}

export interface CompareDevice {
  deviceCode: string
  deviceName: string
  joinTypeIndex: number
  installmentIndex: number
  discountIndex: number
  planName: string
  picPath: string
  calculatedPrice: CalculatedPrice | null
  color: Array<string>
  storage: number
}

export type DeviceAction = ActionType<typeof deviceActions>

export type DeviceState = {
  planFilter: string
  deviceFilter: DeviceFilterType
  deviceList: AsyncState<DeviceListData, Error>
  compareDeviceList: Array<CompareDevice>
}
