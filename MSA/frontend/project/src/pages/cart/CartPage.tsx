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

function CartPage() {
  const [cartList, setCartList] = useState<CartDataList>([])
  const { orderSave } = useOrder()
  const { cookies, getCookieFunc, removeCookieFunc } = useCookieCart()

  useEffect(() => {
    setCartList(getCookieFunc())
  }, [cookies])

  const handleRemoveCookie = (cart: CartData) => {
    removeCookieFunc(cart)
  }

  return (
    <CartContainer>
      <MainText>장바구니</MainText>
      <Line></Line>
      {cartList &&
        cartList.map((cart: CartData, index: number) => (
          <CartItem
            key={index}
            cart={cart}
            orderRequest={orderSave}
            handleRemoveCookie={handleRemoveCookie}
          />
        ))}
    </CartContainer>
  )
}

export default CartPage
