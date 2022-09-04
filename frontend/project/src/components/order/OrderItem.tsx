import { UseMutateFunction } from 'react-query'
import styled, { useTheme } from 'styled-components'
import { OrderData } from '../../api/order'
import UplusButton from '../UplusButton'
import Swal from 'sweetalert2'

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
  clickDeleteButton: UseMutateFunction<any, unknown, string, unknown>
}

function OrderItem({ order, clickDeleteButton }: OrderItemProps) {
  const theme = useTheme()
  const clickButton = () => {
    Swal.fire({
      title: '주문 취소',
      text: '주문을 취소하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '주문 취소',
      cancelButtonText: '나기기',
    }).then((result: any) => {
      if (result.isConfirmed) {
        // delete order
        clickDeleteButton(order.orderNumber)
        Swal.fire({
          title: '주문 취소 완료',
          text: '주문이 취소되었습니다',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '확인',
        })
      }
    })
  }
  return (
    <OrderItemContainer>
      <ImageContainer>
        <OrderImage src={order.picPaths[0]} />
      </ImageContainer>
      <ContentContainer>
        <OrderText>주문번호 {order.orderNumber}</OrderText>
        <OrderText>주문날짜 {order.joinDate}</OrderText>
        <OrderText>제품명 {order.deviceName}</OrderText>
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
          onClick={() => clickButton()}
        />
      </ButtonContainer>
    </OrderItemContainer>
  )
}

export default OrderItem
