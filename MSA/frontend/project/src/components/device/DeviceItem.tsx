import { useNavigate } from 'react-router-dom'
import { CompareDevice } from '../../modules/device'
// styles
import styled, { css, useTheme } from 'styled-components'
import { darken } from 'polished'
// import components
import UplusButton from '../UplusButton'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
// import interface
import { DetailPerColor, DeviceData } from '../../api/device'
// custom hooks
import useCalculatedPrice from '../../hooks/device/useCalculatedPrice'
import useCookieCart from '../../hooks/cart/useCookieCart'

// styled
const DeviceItemContainer = styled.div`
  width: 290px;
  height: 460px;
  margin: 0 20px 20px 0;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.app.dividerGray};
`
const LinkedContainer = styled.div`
  width: 290px;
  height: 400px;
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
  planFilter: string
  discountIndex: number
  installmentIndex: number
  addCompareDevice: (compareDevice: CompareDevice) => void
  deleteCompareDevice: (deviceCode: string) => void
  selectedCheck: boolean
}

function priceFormat(value: number) {
  return `${value.toLocaleString('ko-KR')}`
}

function DeviceItem({
  device,
  planFilter,
  discountIndex,
  installmentIndex,
  addCompareDevice,
  deleteCompareDevice,
  selectedCheck,
}: DeviceItemProps) {
  const theme = useTheme()
  const navigate = useNavigate()
  const { calculatePrice } = useCalculatedPrice()
  const calculatedPrice = calculatePrice(
    device,
    discountIndex,
    installmentIndex
  )
  const { setCookieFunc } = useCookieCart()

  return (
    <DeviceItemContainer>
      <LinkedContainer
        onClick={() =>
          navigate(`/device/${device.code}`, {
            state: {
              planName: planFilter,
              discountIndex: calculatedPrice?.discountType.index,
              installmentIndex: installmentIndex,
            },
          })
        }
      >
        <ColorContainer>
          {device.detailPerColor.map(
            (detail: DetailPerColor, index: number) => (
              <ColorCircle key={index} color={detail.rgb} />
            )
          )}
        </ColorContainer>
        <ImageContainer>
          <DeviceImage
            alt="Device Image"
            src={device.detailPerColor[0].picPaths[0]}
            onClick={() => null}
          />
        </ImageContainer>
        <ContentContainer>
          <DeviceName>{device.name}</DeviceName>
          <DiscountText>{calculatedPrice?.discountType.name}</DiscountText>
          <div>
            <ContentText color={theme.app.grayFont} marginLeft="0">
              ?????????
            </ContentText>
            <ContentText color={theme.app.grayFont} marginLeft="8px">
              {!(installmentIndex === 0) && '??? '}
              {calculatedPrice?.monthlyDiscountedDevicePrice}???
            </ContentText>
            {discountIndex === 0 && (
              <ContentText color={theme.app.blackFont} marginLeft="4px">
                <del>{calculatedPrice?.monthlyRealDeviceCharge}???</del>
              </ContentText>
            )}
          </div>
          <div>
            <ContentText color={theme.app.grayFont} marginLeft="0">
              ?????????
            </ContentText>
            <ContentText color={theme.app.grayFont} marginLeft="8px">
              ??? {calculatedPrice?.monthlyDiscountedPlanCharge}???
            </ContentText>
            {!(discountIndex === 0) && (
              <>
                <ContentText color={theme.app.blackFont} marginLeft="4px">
                  <del>{calculatedPrice?.monthlyRealPlanCharge}???</del>
                </ContentText>
                <ContentText color={theme.app.uplusPink} marginLeft="4px">
                  (25% ???)
                </ContentText>
              </>
            )}
          </div>
          <MonthlyChargeText>
            ??? {calculatedPrice?.totalMonthlyCharge}???
          </MonthlyChargeText>
        </ContentContainer>
      </LinkedContainer>
      <BottomContainer>
        <ContentText color={theme.app.grayFont} marginLeft="26px">
          ?????? {priceFormat(device.weeklySale)}???
        </ContentText>
        <ButtonContainer>
          <UplusButton
            width="100px"
            height="30px"
            radius="15px"
            text="????????????"
            fontColor={selectedCheck ? theme.app.whiteFont : theme.app.grayFont}
            bgColor={
              selectedCheck ? theme.app.mainBackground : theme.app.background
            }
            border={selectedCheck ? '' : `1px solid ${theme.app.grayFont}`}
            onClick={() =>
              selectedCheck
                ? deleteCompareDevice(device.code)
                : addCompareDevice({
                    deviceCode: device.code,
                    deviceName: device.name,
                    joinTypeIndex: 0,
                    installmentIndex: installmentIndex,
                    discountIndex: calculatedPrice
                      ? calculatedPrice.discountType.index
                      : 0,
                    planName: planFilter,
                    picPath: device.detailPerColor[0].picPaths[0],
                    calculatedPrice: calculatedPrice,
                    color: device.detailPerColor.map((detail) => detail.color),
                    storage: device.storage,
                  })
            }
          />
          <CartButton
            onClick={() =>
              setCookieFunc({
                name: '',
                expires: null,
                deviceCode: device.code,
                deviceName: device.name,
                joinTypeIndex: 0,
                installmentIndex: installmentIndex,
                discountIndex: calculatedPrice
                  ? calculatedPrice.discountType.index
                  : 0,
                planName: planFilter,
                picPath: device.detailPerColor[0].picPaths[0],
                color: device.detailPerColor[0].color,
                storage: device.storage,
              })
            }
          >
            <AddShoppingCartOutlinedIcon color="secondary" fontSize="small" />
          </CartButton>
        </ButtonContainer>
      </BottomContainer>
    </DeviceItemContainer>
  )
}

export default DeviceItem
