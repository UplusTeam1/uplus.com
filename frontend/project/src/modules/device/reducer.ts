import { createReducer } from 'typesafe-actions'
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils'
import { deviceActions } from './actions'
import { DeviceAction, DeviceState } from './types'

const initialState: DeviceState = {
  deviceList: asyncState.initial(),
}

const device = createReducer<DeviceState, DeviceAction>(
  initialState
).handleAction(
  transformToArray(deviceActions.getDeviceListAsync),
  createAsyncReducer(deviceActions.getDeviceListAsync, 'deviceList')
)

export default device
