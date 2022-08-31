import Api from '../lib/customApi'

export async function getDeviceList(planName: string) {
  const response = await Api.get<DeviceListData>(`/api/device`, {
    params: { plan: planName },
  })
  return response.data
}

export async function getDeviceOption(code: string) {
  const response = await Api.get<DeviceOption>(`/api/device/${code}`)
  return response.data
}

export async function getDevicePrice(code: string, planName: string) {
  const response = await Api.get<DevicePrice>(
    `/api/device/price/${code}/${planName}`
  )
  return response.data
}

export interface DetailPerColor {
  color: string
  rgb: string
  picPaths: Array<string>
  stock: number
}

export interface DetailPerColorList extends Array<DetailPerColor> {}

export interface MonthlyCharge {
  deviceCharge: Array<number>
  planCharge: number
  totalCharge: Array<number>
}

export interface MonthlyChargeList extends Array<MonthlyCharge> {}

export interface DeviceData {
  code: string
  detailPerColor: DetailPerColorList
  name: string
  price: number
  monthlyChargeList: MonthlyChargeList
  recommendedDiscount: number
  storage: number
  weeklySale: number
}

export interface DeviceListData extends Array<DeviceData> {}

export interface DeviceOption {
  code: string
  detailPerColor: DetailPerColorList
  name: string
  price: number
  storage: number
  weeklySale: number
}

export interface DevicePrice {
  code: string
  name: string
  price: number
  monthlyChargeList: MonthlyChargeList
  recommendedDiscount: number
}
