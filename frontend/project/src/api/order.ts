import Api from '../lib/customApi'

export async function getOrderList() {
  const response = await Api.get<OrderListData>(`/api/order`)
  return response.data
}

export async function saveOrder(orderRequest: OrderRequest) {
  const response = await Api.post<OrderData>(`/api/order`)
  return response.data
}

export async function deleteOrder(orderNumber: number) {
  const response = await Api.delete(`/api/order/${orderNumber}`)
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
}

export interface OrderListData extends Array<OrderData> {}
