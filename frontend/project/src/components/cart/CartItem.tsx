import { UseMutateFunction } from 'react-query'
import styled, { css, useTheme } from 'styled-components'
import { OrderData, OrderRequest } from '../../api/order'
import {
  CART_DISCOUNT_TYPE_LIST,
  CART_JOIN_TYPE_LIST,
} from '../../data/staticData'
import { CartData } from '../../pages/cart/CartPage'
import UplusButton from '../UplusButton'
import CloseIcon from '@mui/icons-material/Close'

const CartItemContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 230px;
  margin-top: 30px;
  border: 1px solid ${({ theme }) => theme.app.dividerGray};
  border-radius: 20px;
  align-items: center;
  position: relative;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
`

const CartImage = styled.img`
  width: 180px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  word-break: keep-all;
`
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 700px;
`

const CartText = styled.span`
  ${({ size }: { size: string }) => {
    return css`
      font-size: ${size};
    `
  }};
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
`

const CartTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 18px;
  height: 60px;
  border-right: 1px solid ${({ theme }) => theme.app.dividerGray};
  font-size: 17px;
`
const PriceDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 18px;
`
const CustomCloseIcon = styled(CloseIcon)<{ size: string }>`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  ${({ size, theme }) => {
    return css`
      font-size: ${size};
      color: ${theme.app.grayFont};
    `
  }};
`
interface CartItemProps {
  cart: CartData
  orderRequest: UseMutateFunction<OrderData, unknown, OrderRequest, unknown>
}

function CartItem({ cart, orderRequest }: CartItemProps) {
  const theme = useTheme()
  const price = 1000000

  const clickOrderButton = () => {
    orderRequest({
      deviceCode: cart.deviceCode,
      planName: cart.planName,
      joinType: cart.joinType,
      monthlyFee: cart.monthlyFee,
      discountType: cart.discountType,
      color: cart.color,
    })
  }

  return (
    <CartItemContainer>
      <CustomCloseIcon size="28px" onClick={() => null} />
      <ImageContainer>
        <CartImage src={cart.picPaths[0]} />
      </ImageContainer>
      <InfoContainer>
        <CartText size="26px">{cart.deviceName}</CartText>
        <CartText size="20px">{cart.planName}</CartText>
        <CartText size="17px">
          {cart.color} | {cart.storage}GB{' '}
        </CartText>
      </InfoContainer>
      <PriceContainer>
        <CartTextDiv>{CART_DISCOUNT_TYPE_LIST[cart.discountType]}</CartTextDiv>
        <CartTextDiv>{CART_JOIN_TYPE_LIST[cart.joinType]}</CartTextDiv>
        <PriceDiv>
          <CartText size="17px">월 예상 납부 금액</CartText>
          <CartText size="30px">
            {cart.monthlyFee.toLocaleString('ko-kr')}원
          </CartText>
        </PriceDiv>
      </PriceContainer>
      <ButtonContainer>
        <UplusButton
          width="120px"
          height="40px"
          radius="20px"
          text="주문하기"
          size="17px"
          onClick={() => clickOrderButton()}
        />
      </ButtonContainer>
    </CartItemContainer>
  )
}

export default CartItem
