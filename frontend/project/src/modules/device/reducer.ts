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
    discountIndex: 0,
    installmentIndex: 2,
    storage: 512,
    maker: '전체',
    price: [0, 200000],
    stock: true,
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
}).handleAction(
  transformToArray(deviceActions.getDeviceListAsync),
  createAsyncReducer(deviceActions.getDeviceListAsync, 'deviceList')
)

export default device
