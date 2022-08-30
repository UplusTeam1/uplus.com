import { deviceActions } from './actions'
import { ActionType } from 'typesafe-actions'
import { AsyncState } from '../../lib/reducerUtils'
import { DeviceListData } from '../../api/device'

export type DeviceAction = ActionType<typeof deviceActions>

export type DeviceState = {
  deviceList: AsyncState<DeviceListData, Error>
}
