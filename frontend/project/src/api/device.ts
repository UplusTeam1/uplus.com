import Api from '../lib/customApi'

export async function getDeviceList(planName: string) {
  const response = await Api.get<DeviceListData>(`api/device?plan=${planName}`)
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
