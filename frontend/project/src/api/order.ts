import orderApi from '../lib/customApi'

export async function getOrderList() {
  const response = await orderApi.get<OrderListData>(`/api/order`)
  return response.data
}

export async function saveOrder(orderRequest: OrderRequest) {
  const response = await orderApi.post<OrderData>(`/api/order`, orderRequest)
  return response.data
}

export async function deleteOrder(orderNumber: string) {
  const response = await orderApi.delete(`/api/order/${orderNumber}`)
  return response.data
}

export interface OrderRequest {
  deviceCode: string
  planName: string
  joinType: string
  monthlyFee: number
  discountType: string
  color: string
}

export interface OrderData extends OrderRequest {
  orderNumber: string
  joinDate: string
  deviceName: string
  picPaths: Array<string>
}

export interface OrderListData extends Array<OrderData> {}
