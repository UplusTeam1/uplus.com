import { UseMutateFunction } from 'react-query'
import styled, { css } from 'styled-components'
import { OrderData, OrderRequest } from '../../api/order'
import {
  DISCOUNT_TYPE_LIST,
  DISCOUNT_VALUE_LIST,
  JOIN_TYPE_LIST,
} from '../../data/staticData'
import UplusButton from '../UplusButton'
import CloseIcon from '@mui/icons-material/Close'
import { CartData } from '../../hooks/cart/useCookieCart'
import useCalculatedPrice from '../../hooks/device/useCalculatedPrice'
import useDevicePrice from '../../hooks/device/useDevicePrice'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

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
const ExpiresText = styled.div`
  position: absolute;
  right: 20px;
  bottom: 16px;
  font-size: 20px;
  color: ${({ theme }) => theme.app.uplusPink};
`
interface CartItemProps {
  cart: CartData
  orderRequest: UseMutateFunction<OrderData, unknown, OrderRequest, unknown>
  handleRemoveCookie: (cartData: CartData) => void
}

function CartItem({ cart, orderRequest, handleRemoveCookie }: CartItemProps) {
  const devicePrice = useDevicePrice(cart.deviceCode, cart.planName)
  const { calculatePrice } = useCalculatedPrice()
  const calculatedPrice = calculatePrice(
    devicePrice.data,
    cart.discountIndex,
    cart.installmentIndex
  )
  const navigate = useNavigate()
  const deleteDate = cart.expires
    ? Math.ceil(
        (new Date(cart.expires).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0

  const clickOrderButton = () => {
    Swal.fire({
      title: '????????? ??????',
      text: '????????? ?????????????????????????',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '????????????',
      cancelButtonText: '??????',
    }).then((result: any) => {
      if (result.isConfirmed) {
        orderRequest({
          deviceCode: cart.deviceCode,
          planName: cart.planName,
          joinType: JOIN_TYPE_LIST[cart.joinTypeIndex].value,
          monthlyFee: calculatedPrice ? calculatedPrice._totalMonthlyCharge : 0,
          discountType: DISCOUNT_VALUE_LIST[cart.discountIndex],
          color: cart.color,
        })
        handleRemoveCookie(cart)
        Swal.fire({
          title: '?????? ??????!',
          text: '?????? ????????? ?????????????????????????',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '??????',
          cancelButtonText: '??????',
        }).then((result: any) => {
          if (result.isConfirmed) {
            navigate('/order')
          }
        })
      }
    })
  }

  return (
    <CartItemContainer>
      <CustomCloseIcon size="28px" onClick={() => handleRemoveCookie(cart)} />
      <ImageContainer>
        <CartImage src={cart.picPath} />
      </ImageContainer>
      <InfoContainer>
        <CartText size="26px">{cart.deviceName}</CartText>
        <CartText size="20px">{cart.planName}</CartText>
        <CartText size="17px">
          {cart.color} | {cart.storage}GB{' '}
        </CartText>
      </InfoContainer>
      <PriceContainer>
        <CartTextDiv>
          {DISCOUNT_TYPE_LIST[cart.discountIndex + 1].label}
        </CartTextDiv>
        <CartTextDiv>{JOIN_TYPE_LIST[cart.joinTypeIndex].label}</CartTextDiv>
        <PriceDiv>
          <CartText size="17px">??? ?????? ?????? ??????</CartText>
          <CartText size="30px">
            {calculatedPrice?.totalMonthlyCharge}???
          </CartText>
        </PriceDiv>
      </PriceContainer>
      <ButtonContainer>
        <UplusButton
          width="120px"
          height="40px"
          radius="20px"
          text="????????????"
          size="17px"
          onClick={() => clickOrderButton()}
        />
      </ButtonContainer>
      <ExpiresText>???????????? {deleteDate}???</ExpiresText>
    </CartItemContainer>
  )
}

export default CartItem
