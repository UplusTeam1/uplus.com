import { AxiosError } from 'axios'
import { createAction, createAsyncAction } from 'typesafe-actions'
import { DeviceListData } from '../../api/device'

// action type
export const GET_DEVICE_LIST = 'device/GET_DEVICE_LIST'
export const GET_DEVICE_LIST_SUCCESS = 'device/GET_DEVICE_LIST_SUCCESS'
export const GET_DEVICE_LIST_ERROR = 'device/GET_DEVICE_LIST_ERROR'

export const SET_DEVICE_FILTER = 'device/SET_DEVICE_FILTER'

// create action
export const getDeviceListAsync = createAsyncAction(
  GET_DEVICE_LIST,
  GET_DEVICE_LIST_SUCCESS,
  GET_DEVICE_LIST_ERROR
)<string, DeviceListData, AxiosError>()

export const setDeviceFilter = createAction(SET_DEVICE_FILTER)()

// export actionTypes
export const deviceActionTypes = {
  GET_DEVICE_LIST,
}

// export actions
export const deviceActions = {
  getDeviceListAsync,
  setDeviceFilter,
}
