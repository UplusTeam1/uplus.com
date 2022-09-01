import { createReducer } from 'typesafe-actions'
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils'
import { deviceActions, deviceActionTypes } from './actions'
import { DeviceAction, DeviceState } from './types'

const initialState: DeviceState = {
  planFilter: '',
  deviceFilter: {
    discountIndex: -1,
    installmentIndex: 1,
    storage: 0,
    maker: '',
    stock: true,
    price: [0, 300000],
    sortIndex: 0,
  },
  deviceList: asyncState.initial(),
}

const device = createReducer<DeviceState, DeviceAction>(initialState, {
  [deviceActionTypes.RESET_FILTER]: (state: DeviceState) => ({
    ...state,
    planFilter: initialState.planFilter,
    deviceFilter: initialState.deviceFilter,
  }),
  [deviceActionTypes.SET_PLAN_FILTER]: (
    state: DeviceState,
    action: DeviceAction
  ) => ({
    ...state,
    planFilter: action.payload,
  }),
  [deviceActionTypes.SET_DEVICE_FILTER]: (
    state: DeviceState,
    action: DeviceAction
  ) => ({
    ...state,
    deviceFilter: action.payload,
  }),
}).handleAction(
  transformToArray(deviceActions.getDeviceListAsync),
  createAsyncReducer(deviceActions.getDeviceListAsync, 'deviceList')
)

export default device
