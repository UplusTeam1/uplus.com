// route, layout, data 연동
import { useState } from 'react'
import styled from 'styled-components'
import { OrderData } from '../../api/order'

import OrderItem from '../../components/order/OrderItem'

import useOrder from '../../hooks/order/useOrder'

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column; // 위에서 밑으로
  align-items: center;
  width: 1440x;
`

const MainText = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`

const Line = styled.hr`
  border: 0px;
  width: 1200px;
  height: 2px;
  background-color: ${({ theme }) => theme.app.dividerGray};
`

function OrderListPage() {
  // hook으로 api 호출
  const { orderList, orderDelete } = useOrder()
  return (
    <OrderListContainer>
      <MainText>주문 목록</MainText>
      <Line></Line>
      {orderList.data && orderList.data.length != 0 ? (
        orderList.data.map((order: OrderData) => (
          <OrderItem order={order} clickDeleteButton={orderDelete} />
        ))
      ) : (
        <MainText>주문 정보가 없습니다</MainText>
      )}
    </OrderListContainer>
  )
}

export default OrderListPage
