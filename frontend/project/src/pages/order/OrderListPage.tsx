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
  // const orderList = {
  //   data: [
  //     {
  //       orderNumber: '12345', // String
  //       deviceCode: 'SM-F721N', // String
  //       planName: '5G 다이렉트 37.5', // String
  //       joinType: 'NEW_SUBSCRIPTION', // String (기기변경: DEVICE_CHANGE | 번호이동: NUMBER_TRANSFER | 신규가입: NEW_SUBSCRIPTION)
  //       joinDate: '2022-08-25', // DateTime
  //       monthlyFee: 50000, // Integer
  //       discountType: 'DEVICE_DISCOUNT', // String (공시지원금: DEVICE_DISCOUNT | 선택약정 24개월: PLAN_DISCOUNT_24 | 선택약정 12개월: PLAN_DISCOUNT_12 | 없음: NO_DISCOUNT)
  //       color: '블루',
  //     },
  //     {
  //       orderNumber: '12345', // String
  //       deviceCode: 'SM-F721N', // String
  //       planName: '5G 다이렉트 37.5', // String
  //       joinType: 'NEW_SUBSCRIPTION', // String (기기변경: DEVICE_CHANGE | 번호이동: NUMBER_TRANSFER | 신규가입: NEW_SUBSCRIPTION)
  //       joinDate: '2022-08-25', // DateTime
  //       monthlyFee: 50000, // Integer
  //       discountType: 'DEVICE_DISCOUNT', // String (공시지원금: DEVICE_DISCOUNT | 선택약정 24개월: PLAN_DISCOUNT_24 | 선택약정 12개월: PLAN_DISCOUNT_12 | 없음: NO_DISCOUNT)
  //       color: '블루',
  //     },
  //     {
  //       orderNumber: '12345', // String
  //       deviceCode: 'SM-F721N', // String
  //       planName: '5G 다이렉트 37.5', // String
  //       joinType: 'NEW_SUBSCRIPTION', // String (기기변경: DEVICE_CHANGE | 번호이동: NUMBER_TRANSFER | 신규가입: NEW_SUBSCRIPTION)
  //       joinDate: '2022-08-25', // DateTime
  //       monthlyFee: 50000, // Integer
  //       discountType: 'DEVICE_DISCOUNT', // String (공시지원금: DEVICE_DISCOUNT | 선택약정 24개월: PLAN_DISCOUNT_24 | 선택약정 12개월: PLAN_DISCOUNT_12 | 없음: NO_DISCOUNT)
  //       color: '블루',
  //     },
  //   ],
  // }
  return (
    <OrderListContainer>
      <MainText>주문 목록</MainText>
      <Line></Line>
      {orderList.data &&
        orderList.data.map((order: OrderData) => (
          <OrderItem order={order} clickDeleteButton={orderDelete} />
        ))}
      {!orderList.data && <MainText>주문 정보가 없습니다</MainText>}
    </OrderListContainer>
  )
}

export default OrderListPage
