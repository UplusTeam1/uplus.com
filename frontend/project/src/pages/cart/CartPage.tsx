import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CartItem from '../../components/cart/CartItem'
import useCookieCart, {
  CartData,
  CartDataList,
} from '../../hooks/cart/useCookieCart'
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

function CartPage() {
  const [cartList, setCartList] = useState<CartDataList>([])
  const { orderSave } = useOrder()
  const { getCookieFunc, removeCookieFunc } = useCookieCart()

  useEffect(() => {
    setCartList(getCookieFunc())
  }, [])

  const handleRemoveCookie = (cart: CartData) => {
    removeCookieFunc(cart)
    setCartList(getCookieFunc())
  }

  return (
    <CartContainer>
      <MainText>장바구니</MainText>
      <Line></Line>
      {cartList &&
        cartList.map((cart: CartData) => (
          <CartItem
            cart={cart}
            orderRequest={orderSave}
            handleRemoveCookie={handleRemoveCookie}
          />
        ))}
    </CartContainer>
  )
}

export default CartPage
