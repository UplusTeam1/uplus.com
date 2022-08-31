import { useQuery, useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import {
  OrderListData,
  getOrderList,
  saveOrder,
  deleteOrder,
} from '../../api/order'

function useOrder() {
  const orderList = useQuery<OrderListData, AxiosError>(
    'orderList',
    getOrderList
  )
  const queryClient = useQueryClient()
  const { mutate: orderSave } = useMutation(saveOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orderList')
    },
  })
  const { mutate: orderDelete } = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orderList')
    },
  })
  return { orderList, orderSave, orderDelete }
}

export default useOrder
