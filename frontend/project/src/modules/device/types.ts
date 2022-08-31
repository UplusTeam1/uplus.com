import { deviceActions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { DeviceListData } from '../../api/device'

export interface DeviceFilter {
  discountIndex: number
  installmentIndex: number
  storage: number
  maker: string
  price: Array<number>
  stock: boolean
  sortIndex: number
}

export type DeviceAction = ActionType<typeof deviceActions>

export type DeviceState = {
  planFilter: string
  deviceFilter: DeviceFilter
  deviceList: AsyncState<DeviceListData, Error>
}
