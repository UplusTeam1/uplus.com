import { useEffect } from 'react'
import styled from 'styled-components'
import CartItem from '../../components/cart/CartItem'
import useCookieCart from '../../hooks/cart/useCookieCart'
import useOrder from '../../hooks/order/useOrder'

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
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

type DiscountType =
  | 'DEVICE_DISCOUNT'
  | 'PLAN_DISCOUNT_24'
  | 'PLAN_DISCOUNT_12'
  | 'NO_DISCOUNT'
type JoinType = 'DEVICE_CHANGE' | 'NUMBER_TRANSFER' | 'NEW_SUBSCRIPTION'

export interface CartData {
  cartNumber: string
  deviceCode: string
  deviceName: string
  planName: string
  joinType: JoinType
  monthlyFee: number
  discountType: DiscountType
  color: string
  picPaths: Array<string>
  storage: number
}

function CartPage() {
  const { orderSave } = useOrder()
  const { setCookieFunc, getCookieFunc, removeCookieFunc } = useCookieCart()

  useEffect(() => {
    getCookieFunc()
  }, [])

  const cartList: Array<CartData> = [
    {
      cartNumber: '12345', // String
      deviceCode: 'SM-F721N', // String
      deviceName: '갤럭시 z 플립 4',
      planName: '5G 다이렉트 37.5', // String
      joinType: 'NEW_SUBSCRIPTION', // String (기기변경: DEVICE_CHANGE | 번호이동: NUMBER_TRANSFER | 신규가입: NEW_SUBSCRIPTION)
      monthlyFee: 150000, // Integer api 호출해야됨
      discountType: 'DEVICE_DISCOUNT', // String (공시지원금: DEVICE_DISCOUNT | 선택약정 24개월: PLAN_DISCOUNT_24 | 선택약정 12개월: PLAN_DISCOUNT_12 | 없음: NO_DISCOUNT)
      color: '블루',
      picPaths: [
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      ],
      storage: 128,
    },
    {
      cartNumber: '12345', // String
      deviceCode: 'SM-F721N', // String
      deviceName: '갤럭시 Z Flip 4 메종키츠네 에디션',
      planName: '5G 다이렉트 37.5', // String
      joinType: 'NEW_SUBSCRIPTION', // String (기기변경: DEVICE_CHANGE | 번호이동: NUMBER_TRANSFER | 신규가입: NEW_SUBSCRIPTION)
      monthlyFee: 50000, // Integer api 호출해야됨
      discountType: 'PLAN_DISCOUNT_24', // String (공시지원금: DEVICE_DISCOUNT | 선택약정 24개월: PLAN_DISCOUNT_24 | 선택약정 12개월: PLAN_DISCOUNT_12 | 없음: NO_DISCOUNT)
      color: '블루',
      picPaths: [
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      ],
      storage: 128,
    },
  ]

  return (
    <CartContainer>
      <MainText>장바구니</MainText>
      <Line></Line>
      {cartList &&
        cartList.map((cart: CartData) => (
          <CartItem cart={cart} orderRequest={orderSave} />
        ))}
    </CartContainer>
  )
}

export default CartPage
