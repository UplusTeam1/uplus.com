import { useNavigate } from 'react-router-dom'
// styles
import styled, { css, useTheme } from 'styled-components'
import { darken } from 'polished'
// import components
import UplusButton from '../UplusButton'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
// import interface
import { DetailPerColor, DeviceData } from '../../api/device'

// styled
const DeviceItemContainer = styled.div`
  width: 290px;
  height: 450px;
  margin: 0 20px 20px 0;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.app.dividerGray};
`
const LinkedContainer = styled.div`
  width: 290px;
  height: 390px;
  border-bottom: 1px solid ${({ theme }) => theme.app.dividerGray};
  cursor: pointer;
`
const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 290px;
  height: 59px;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 59px;
  padding-right: 26px;
`
const ColorContainer = styled.div`
  position: absolute;
  margin-top: 36px;
  margin-left: 26px;
`
const ColorCircle = styled.div<ColorCircleProps>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-bottom: 6px;
  ${({ color, theme }) => {
    return css`
      background-color: ${color};
      border: 1px solid ${theme.app.dividerGray};
    `
  }};
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 290px;
  padding-top: 30px;
`
const DeviceImage = styled.img`
  width: 180px;
`
const ContentContainer = styled.div`
  padding-left: 26px;
`
const DeviceName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.app.blackFont};
`
const DiscountText = styled.p`
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.app.grayFont};
`
const ContentText = styled.span<ContentTextProps>`
  font-size: 14px;
  ${({ color, marginLeft }) => {
    return css`
      color: ${color};
      margin-left: ${marginLeft};
    `
  }}
`
const MonthlyChargeText = styled.p`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
  margin-top: 10px;
`
const CartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-left: 8px;
  ${({ theme }) => {
    return css`
      border: 1px solid ${theme.app.grayFont};
      &:hover {
        background: ${darken(0.1, theme.app.background)};
      }
      &:active {
        background: ${darken(0.2, theme.app.background)};
      }
    `
  }}
  cursor: pointer;
`

// interface
interface ColorCircleProps {
  color: string
}

interface ContentTextProps {
  color: string
  marginLeft: string
}

interface DeviceItemProps {
  device: DeviceData
  clickCompareButton: () => void
}

function DeviceItem({ device, clickCompareButton }: DeviceItemProps) {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <DeviceItemContainer>
      <LinkedContainer onClick={() => navigate(`/device/galaxy`)}>
        <ColorContainer>
          {device.detailPerColor.map((detail: DetailPerColor) => (
            <ColorCircle color={detail.rgb} />
          ))}
        </ColorContainer>
        <ImageContainer>
          <DeviceImage
            alt="Device Image"
            src="https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg"
            onClick={() => null}
          />
        </ImageContainer>
        <ContentContainer>
          <DeviceName>{device.name}</DeviceName>
          <DiscountText>공시지원금</DiscountText>
          <div>
            <ContentText color={theme.app.grayFont} marginLeft="0">
              휴대폰
            </ContentText>
            <ContentText color={theme.app.grayFont} marginLeft="8px">
              월 47,720원
            </ContentText>
          </div>
          <div>
            <ContentText color={theme.app.grayFont} marginLeft="0">
              통신료
            </ContentText>
            <ContentText color={theme.app.grayFont} marginLeft="8px">
              월 35,250원
            </ContentText>
            <ContentText color={theme.app.blackFont} marginLeft="4px">
              <del>47,000원</del>
            </ContentText>
            <ContentText color={theme.app.uplusPink} marginLeft="4px">
              (25% ↓)
            </ContentText>
          </div>
          <MonthlyChargeText>월 82,970원</MonthlyChargeText>
        </ContentContainer>
      </LinkedContainer>
      <BottomContainer>
        <ContentText color={theme.app.grayFont} marginLeft="26px">
          구매 11명
        </ContentText>
        <ButtonContainer>
          <UplusButton
            width="100px"
            height="30px"
            radius="15px"
            text="비교하기"
            fontColor={theme.app.grayFont}
            bgColor={theme.app.background}
            border={`1px solid ${theme.app.grayFont}`}
            onClick={() => clickCompareButton()}
          />
          <CartButton>
            <AddShoppingCartOutlinedIcon color="secondary" fontSize="small" />
          </CartButton>
        </ButtonContainer>
      </BottomContainer>
    </DeviceItemContainer>
  )
}

export default DeviceItem
