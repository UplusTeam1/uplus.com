import { AxiosError } from 'axios'
import { createAction, createAsyncAction } from 'typesafe-actions'
import { DeviceListData } from '../../api/device'
import { CompareDevice, DeviceFilterType } from './types'

// action type
export const GET_DEVICE_LIST = 'device/GET_DEVICE_LIST'
export const GET_DEVICE_LIST_SUCCESS = 'device/GET_DEVICE_LIST_SUCCESS'
export const GET_DEVICE_LIST_ERROR = 'device/GET_DEVICE_LIST_ERROR'

export const SET_PLAN_FILTER = 'device/SET_PLAN_FILTER'
export const SET_DEVICE_FILTER = 'device/SET_DEVICE_FILTER'
export const RESET_FILTER = 'device/RESET_FILTER'
export const SET_COMPARE_DEVICE_LIST = 'device/SET_COMPARE_DEVICE_LIST'
export const RESET_COMPARE_DEVICE_LIST = 'device/RESET_COMPARE_DEVICE_LIST'

// create action
export const getDeviceListAsync = createAsyncAction(
  GET_DEVICE_LIST,
  GET_DEVICE_LIST_SUCCESS,
  GET_DEVICE_LIST_ERROR
)<string, DeviceListData, AxiosError>()

export const setPlanFilter = createAction(SET_PLAN_FILTER)<string>()
export const setDeviceFilter =
  createAction(SET_DEVICE_FILTER)<DeviceFilterType>()
export const resetFilter = createAction(RESET_FILTER)<null>()
export const setCompareDeviceList = createAction(SET_COMPARE_DEVICE_LIST)<
  Array<CompareDevice>
>()
export const resetCompareDeviceList = createAction(
  RESET_COMPARE_DEVICE_LIST
)<null>()

// export actionTypes
export const deviceActionTypes = {
  GET_DEVICE_LIST,
  SET_PLAN_FILTER,
  SET_DEVICE_FILTER,
  RESET_FILTER,
  SET_COMPARE_DEVICE_LIST,
  RESET_COMPARE_DEVICE_LIST,
}

// export actions
export const deviceActions = {
  getDeviceListAsync,
  setDeviceFilter,
  setPlanFilter,
  resetFilter,
  setCompareDeviceList,
  resetCompareDeviceList,
}
