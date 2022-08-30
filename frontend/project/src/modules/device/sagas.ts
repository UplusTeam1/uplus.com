import { call, put, takeEvery } from 'redux-saga/effects'
import { deviceActionTypes, deviceActions } from './actions'
import { getDeviceList, DeviceListData } from '../../api/device'

function* getDeviceListSaga(
  action: ReturnType<typeof deviceActions.getDeviceListAsync.request>
) {
  try {
    const deviceListData: DeviceListData = yield call(
      getDeviceList,
      action.payload
    )
    yield put(deviceActions.getDeviceListAsync.success(deviceListData))
  } catch (e: any) {
    yield put(deviceActions.getDeviceListAsync.failure(e))
    console.error(e)
  }
}

export function* deviceSaga() {
  yield takeEvery(deviceActionTypes.GET_DEVICE_LIST, getDeviceListSaga)
}
