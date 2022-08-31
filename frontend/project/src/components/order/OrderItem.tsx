import styled, { useTheme } from 'styled-components'
import { OrderData } from '../../api/order'
import UplusButton from '../UplusButton'

const OrderItemContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 230px;
  margin-top: 30px;
  border: 1px solid ${({ theme }) => theme.app.dividerGray};
  border-radius: 20px;
  align-items: center;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
`

const OrderImage = styled.img`
  width: 180px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
`

const OrderText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
`
interface OrderItemProps {
  order: OrderData
  clickDeleteButton: () => void
}

function OrderItem({ order, clickDeleteButton }: OrderItemProps) {
  const theme = useTheme()
  const price = 1000000
  return (
    <OrderItemContainer>
      <ImageContainer>
        <OrderImage src="https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg" />
      </ImageContainer>
      <ContentContainer>
        <OrderText>주문번호 {order.orderNumber}</OrderText>
        <OrderText>주문날짜 {order.joinDate}</OrderText>
        <OrderText>제품명 {order.deviceCode}</OrderText>
        <OrderText>색상 {order.color}</OrderText>
        <OrderText>요금제 {order.planName}</OrderText>
        <OrderText>
          월 예상 납부 금액 {order.monthlyFee.toLocaleString('ko-kr')}원
        </OrderText>
      </ContentContainer>
      <ButtonContainer>
        <UplusButton
          width="100px"
          height="30px"
          radius="15px"
          text="주문 취소"
          fontColor={theme.app.blackFont}
          bgColor={theme.app.lightGray}
          border={`1px solid ${theme.app.grayFont}`}
          onClick={() => clickDeleteButton()}
        />
      </ButtonContainer>
    </OrderItemContainer>
  )
}

export default OrderItem
