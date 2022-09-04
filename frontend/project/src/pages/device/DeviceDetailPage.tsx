import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// styles
import { flexBetween, flexCenter } from '../../styles/basicStyles'
import styled, { css, useTheme } from 'styled-components'
import { darken } from 'polished'
// import components
import { Radio } from '@mui/material'
import UplusButton from '../../components/UplusButton'
import PlanListDialog from '../../components/device/PlanListDialog'
// import Swal from 'sweetalert2'
// custom hooks
import useDeviceOption from '../../hooks/device/useDeviceOption'
import useDevicePrice from '../../hooks/device/useDevicePrice'
import usePlanList from '../../hooks/plan/usePlanList'
import useOrder from '../../hooks/order/useOrder'
import useCalculatedPrice from '../../hooks/device/useCalculatedPrice'
// import interface
import { DetailPerColor } from '../../api/device'
import { PlanListData } from '../../api/plan'
import {
  InstallmentType,
  INSTALLMENT_LIST,
  JoinType,
  JOIN_TYPE_LIST,
  STORAGE_INFO,
  DISCOUNT_VALUE_LIST,
} from '../../data/staticData'

// styled
const MainContainer = styled.div`
  display: flex;
  width: 1440px;
  padding-top: 10px;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 680px;
  padding: 20px;
`
const DeviceImage = styled.img`
  position: sticky;
  top: 160px;
  width: 480px;
  height: 480px;
  object-fit: contain;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 680px;
  padding: 20px;
  margin-bottom: 100px;
`
const DeviceNameDiv = styled.div`
  display: flex;
  align-items: end;
  padding-top: 20px;
`
const DeviceName = styled.span`
  font-size: 28px;
  font-weight: bold;
  margin-right: 10px;
  color: ${({ theme }) => theme.app.blackFont};
`
const ColorTextDiv = styled.div`
  display: flex;
  margin: 20px 0 10px 0;
`
const MainText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.app.blackFont};
  margin-right: 20px;
`
const MainTitleText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.app.blackFont};
  margin: 20px 0 10px 0;
`
const SubText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.app.grayFont};
`
const ColorCircleDiv = styled.div`
  display: flex;
  height: 32px;
`
const ColorCircle = styled.div<ColorCircleProps>`
  border: 2px solid;
  border-radius: 16px;
  width: 28px;
  height: 28px;
  margin-right: 4px;
  outline-offset: -4px;
  ${(props) => {
    return css`
      background-color: ${props.bgColor};
      border-color: ${props.borderColor};
      outline: ${props.outline};
    `
  }};
  cursor: pointer;
`
const ButtonListDiv = styled.div`
  ${flexBetween}
  ${({ width }: { width: string }) => {
    return css`
      width: ${width};
    `
  }};
`
const ButtonDiv = styled.div<CheckDivProps>`
  ${flexCenter}
  border-radius: 6px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.app.background};
  ${({ width, check, theme }) => {
    return css`
      width: ${width};
      height: ${check ? '46px' : '48px'};
      color: ${check ? theme.app.blackFont : theme.app.grayFont};
      border: ${check ? '2px solid' : '1px solid'};
      font-weight: ${check ? 'bold' : ''};
      border-color: ${check ? theme.app.blackFont : theme.app.grayFont};
    `
  }};
  cursor: pointer;
`
const SelectedPlanDiv = styled.div`
  ${flexCenter}
  width: 536px;
  height: 76px;
  padding: 20px 20px;
  border-radius: 6px;
  cursor: pointer;
  ${({ theme }) => {
    return css`
      border: 2px solid ${theme.app.blackFont};
      &:hover {
        background: ${darken(0.1, theme.app.background)};
      }
      &:active {
        background: ${darken(0.2, theme.app.background)};
      }
    `
  }}
`
const PlanTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const PlanName = styled.span`
  font-size: 20px;
`
const PlanPrice = styled.span`
  font-size: 26px;
  font-weight: bold;
`
const PlanInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
`
const PlanText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.app.grayFont};
`
const DiscountContainer = styled.div`
  ${flexBetween}
  width: 680px;
  height: 140px;
`
const DiscountTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const DiscountDiv = styled.div<CheckDivProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 6px;
  height: 118px;
  border: 1px solid;
  ${({ width, check, theme }) => {
    return css`
      width: ${width};
      color: ${check ? theme.app.blackFont : theme.app.grayFont};
      font-weight: ${check ? 'bold' : ''};
      border-color: ${check ? theme.app.blackFont : theme.app.grayFont};
      background-color: ${theme.app.background};
    `
  }};
  cursor: pointer;
`
const DiscountPriceDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  font-size: 18px;
`
const RadioGroupDiv = styled.div`
  width: 100%;
`
const RadioDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  font-size: 18px;
  ${({ color }: { color: string }) => {
    return css`
      color: ${color};
    `
  }};
`
const DiscountInfoText = styled.span`
  ${({ size, mb }: { size: string; mb: string }) => {
    return css`
      font-size: ${size};
      margin-bottom: ${mb};
    `
  }}
`
const DiscountInfoTopText = styled(DiscountInfoText)`
  font-weight: bold;
`
const MonthlyFeeContainer = styled.div`
  width: 620px;
  padding: 20px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.app.lightGray};
`
const MonthlyFeeTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;
`
const MonthlyFeeInfoDiv = styled.div`
  display: flex;
  width: 620px;
`
const MonthlyHalfDiv = styled.div`
  width: 289px;
  ${({ borderRight, padding }: { borderRight: string; padding: string }) => {
    return css`
      border-right: ${borderRight};
      padding: ${padding};
    `
  }};
`
const HalfContentDiv = styled.div`
  ${flexBetween}
  width: 289px;
`
const SmallInfoText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.app.grayFont};
  margin-top: 4px;
`

// interface
interface ColorCircleProps {
  bgColor: string
  borderColor: string
  outline: string
}

interface CheckDivProps {
  width: string
  check: boolean
}

interface LocationState {
  planName: string
  discountIndex: number
  installmentIndex: number
}

export type DeviceDetailParams = {
  deviceCode: string
}

function findPlanData(planListData: PlanListData, selectedPlan: string) {
  return planListData.find((planData) => planData.name === selectedPlan)
}

function DeviceDetailPage() {
  const params = useParams<keyof DeviceDetailParams>() as DeviceDetailParams
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState
  const theme = useTheme()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedJoin, setSelectedJoin] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(
    locationState ? locationState.planName : '5G 시그니처'
  )
  const [selectedDiscount, setSelectedDiscount] = useState(
    locationState ? locationState.discountIndex : 0
  )
  const [selectedInstallment, setSelectedInstallment] = useState(
    locationState ? locationState.installmentIndex : 2
  )
  const deviceOption = useDeviceOption(params.deviceCode)
  const devicePrice = useDevicePrice(params.deviceCode, selectedPlan)
  const { calculatePrice } = useCalculatedPrice()
  const calculatedPrice = calculatePrice(
    devicePrice.data,
    selectedDiscount,
    selectedInstallment
  )
  const { data: planListData } = usePlanList()
  const { orderSave } = useOrder()
  const selectedPlanData = useMemo(
    () => (planListData ? findPlanData(planListData, selectedPlan) : null),
    [planListData, selectedPlan]
  )

  const clickOpenDialog = () => {
    setOpenDialog(true)
  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const handleChangePlan = (value: string) => {
    setSelectedPlan(value)
    closeDialog()
  }

  const clickOrder = () => {
    if (params.deviceCode && deviceOption.data && calculatedPrice) {
      // Swal.fire({
      //   title: '온라인 주문',
      //   text: '상품을 주문하시겠습니까?',
      //   icon: 'question',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: '주문하기',
      //   cancelButtonText: '취소',
      // }).then((result: any) => {
      //   if (result.isConfirmed) {
      //     orderSave({
      //       deviceCode: params.deviceCode,
      //       planName: selectedPlan,
      //       joinType: JOIN_TYPE_LIST[selectedJoin].value,
      //       monthlyFee: calculatedPrice._totalMonthlyCharge,
      //       discountType: DISCOUNT_VALUE_LIST[selectedDiscount],
      //       color: deviceOption.data.detailPerColor[selectedColor].color,
      //     })
      //     Swal.fire({
      //       title: '주문 완료!',
      //       text: '주문 내역을 확인하시겠습니까?',
      //       icon: 'success',
      //       showCancelButton: true,
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33',
      //       confirmButtonText: '확인',
      //       cancelButtonText: '취소',
      //     }).then((result: any) => {
      //       if (result.isConfirmed) {
      //         navigate('/order')
      //       }
      //     })
      //   }
      // })
    }
  }

  return (
    <MainContainer>
      <ImageContainer>
        <DeviceImage
          alt="Device Image"
          src={deviceOption.data?.detailPerColor[selectedColor].picPaths[0]}
        />
      </ImageContainer>
      <ContentContainer>
        <DeviceNameDiv>
          <DeviceName>{deviceOption.data?.name}</DeviceName>
          <MainText>({params.deviceCode})</MainText>
        </DeviceNameDiv>
        <ColorTextDiv>
          <MainText>색상</MainText>
          <SubText>
            {deviceOption.data?.detailPerColor[selectedColor].color}
          </SubText>
        </ColorTextDiv>
        <ColorCircleDiv>
          {deviceOption.data?.detailPerColor.map(
            (detail: DetailPerColor, index: number) => (
              <ColorCircle
                key={index}
                bgColor={detail.rgb}
                borderColor={
                  index === selectedColor
                    ? theme.app.blackFont
                    : theme.app.dividerGray
                }
                outline={
                  index === selectedColor
                    ? `3px solid ${theme.app.background}`
                    : ''
                }
                onClick={() => setSelectedColor(index)}
              ></ColorCircle>
            )
          )}
        </ColorCircleDiv>
        <MainTitleText>저장공간</MainTitleText>
        <ButtonDiv width={true ? '176px' : '178px'} check={true}>
          {deviceOption.data?.storage}GB
        </ButtonDiv>
        <SmallInfoText>
          {STORAGE_INFO[deviceOption.data ? deviceOption.data.storage : 128]}
        </SmallInfoText>
        <MainTitleText>가입유형</MainTitleText>
        <ButtonListDiv width="580px">
          {JOIN_TYPE_LIST.map((joinType: JoinType, index: number) => (
            <ButtonDiv
              key={index}
              width={selectedJoin === index ? '176px' : '178px'}
              check={selectedJoin === index}
              onClick={() => setSelectedJoin(joinType.indexValue)}
            >
              {joinType.label}
            </ButtonDiv>
          ))}
        </ButtonListDiv>
        <SmallInfoText>{JOIN_TYPE_LIST[selectedJoin].info}</SmallInfoText>
        <MainTitleText>요금제</MainTitleText>
        <SelectedPlanDiv onClick={() => clickOpenDialog()}>
          <PlanTitleDiv>
            <PlanName>{selectedPlan}</PlanName>
            <PlanPrice>{calculatedPrice?.monthlyRealPlanCharge}원</PlanPrice>
          </PlanTitleDiv>
          <PlanInfoDiv>
            <PlanText>
              데이터 {selectedPlanData ? selectedPlanData.data : '0GB'}
            </PlanText>
            <PlanText>
              {selectedPlanData ? selectedPlanData.voiceCall : ''}, 나눠쓰기{' '}
              {selectedPlanData ? selectedPlanData.sharing : ''}
            </PlanText>
          </PlanInfoDiv>
        </SelectedPlanDiv>
        <MainTitleText>할인유형</MainTitleText>
        <DiscountContainer>
          <DiscountDiv
            width="198px"
            check={selectedDiscount === 0}
            onClick={() => setSelectedDiscount(0)}
          >
            <DiscountTitleDiv>
              <DiscountInfoText size="14px" mb="6px">
                공시지원금
              </DiscountInfoText>
              <DiscountInfoText size="18px" mb="0">
                휴대폰 가격 1회 할인
              </DiscountInfoText>
            </DiscountTitleDiv>
            <DiscountPriceDiv>
              총<PlanPrice>-{calculatedPrice?.deviceDiscount}</PlanPrice>원
            </DiscountPriceDiv>
          </DiscountDiv>
          <DiscountDiv
            width="378px"
            check={selectedDiscount === 1 || selectedDiscount === 2}
            onClick={() => setSelectedDiscount(1)}
          >
            <DiscountTitleDiv>
              <DiscountInfoText size="14px" mb="6px">
                선택약정할인
              </DiscountInfoText>
              <DiscountInfoText size="18px" mb="0">
                통신요금 25% 할인
              </DiscountInfoText>
            </DiscountTitleDiv>
            <RadioGroupDiv>
              <RadioDiv
                color={
                  selectedDiscount === 1
                    ? theme.app.blackFont
                    : theme.app.grayFont
                }
              >
                <span>
                  <Radio
                    checked={selectedDiscount === 1}
                    onChange={() => setSelectedDiscount(1)}
                    value="12개월 할인"
                    name="radio-1"
                  />
                  12개월 할인
                </span>
                <span>
                  총
                  <PlanPrice>-{calculatedPrice?.month12PlanDiscount}</PlanPrice>
                  원
                </span>
              </RadioDiv>
              <RadioDiv
                color={
                  selectedDiscount === 2
                    ? theme.app.blackFont
                    : theme.app.grayFont
                }
              >
                <span>
                  <Radio
                    checked={selectedDiscount === 2}
                    onChange={() => setSelectedDiscount(2)}
                    value="24개월 할인"
                    name="radio-2"
                  />
                  24개월 할인
                </span>
                <span>
                  총
                  <PlanPrice>-{calculatedPrice?.month24PlanDiscount}</PlanPrice>
                  원
                </span>
              </RadioDiv>
            </RadioGroupDiv>
          </DiscountDiv>
        </DiscountContainer>
        <MainTitleText>할부기간</MainTitleText>
        <ButtonListDiv width="680px">
          {INSTALLMENT_LIST.map(
            (installmentData: InstallmentType, index: number) => (
              <ButtonDiv
                key={index}
                width={
                  installmentData.indexValue === selectedInstallment
                    ? '156px'
                    : '158px'
                }
                check={installmentData.indexValue === selectedInstallment}
                onClick={() =>
                  setSelectedInstallment(installmentData.indexValue)
                }
              >
                {installmentData.label}
              </ButtonDiv>
            )
          )}
        </ButtonListDiv>
        <MainTitleText>결제 정보</MainTitleText>
        <MonthlyFeeContainer>
          <MonthlyFeeTitle>
            <PlanPrice>월 {calculatedPrice?.totalMonthlyCharge}원</PlanPrice>
            <DiscountInfoText size="18px" mb="0">
              {selectedPlan}, {calculatedPrice?.discountType.name} 기준
            </DiscountInfoText>
          </MonthlyFeeTitle>
          <MonthlyFeeInfoDiv>
            <MonthlyHalfDiv
              borderRight={`2px solid ${theme.app.dividerGray}`}
              padding="20px 20px 20px 0"
            >
              <HalfContentDiv>
                <DiscountInfoTopText size="18px" mb="4px">
                  {selectedInstallment === 0
                    ? '기기 완납 결제 가격'
                    : '월 휴대폰 할부금'}
                </DiscountInfoTopText>
                <DiscountInfoTopText size="20px" mb="4px">
                  {calculatedPrice?.monthlyDiscountedDevicePrice}원
                </DiscountInfoTopText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  정상가
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  {calculatedPrice?.realDevicePrice}원
                </DiscountInfoText>
              </HalfContentDiv>
              {selectedDiscount === 0 && (
                <>
                  <HalfContentDiv>
                    <DiscountInfoText size="16px" mb="2px">
                      공시지원금
                    </DiscountInfoText>
                    <DiscountInfoText size="16px" mb="2px">
                      -{calculatedPrice?.deviceDiscount}원
                    </DiscountInfoText>
                  </HalfContentDiv>
                  <HalfContentDiv>
                    <DiscountInfoText size="16px" mb="2px">
                      실구매가
                    </DiscountInfoText>
                    <DiscountInfoText size="16px" mb="2px">
                      {calculatedPrice?.discountedDevicePrice}원
                    </DiscountInfoText>
                  </HalfContentDiv>
                </>
              )}
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  할부 개월 수
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  {INSTALLMENT_LIST[selectedInstallment].label}
                </DiscountInfoText>
              </HalfContentDiv>
              {!(selectedInstallment === 0) && (
                <HalfContentDiv>
                  <DiscountInfoText size="16px" mb="0">
                    할부수수료 (연 5.9%)
                  </DiscountInfoText>
                  <DiscountInfoText size="16px" mb="0">
                    {calculatedPrice?.interestCharge}원
                  </DiscountInfoText>
                </HalfContentDiv>
              )}
            </MonthlyHalfDiv>
            <MonthlyHalfDiv borderRight="" padding="20px 0 20px 20px">
              <HalfContentDiv>
                <DiscountInfoTopText size="18px" mb="4px">
                  월 통신료
                </DiscountInfoTopText>
                <DiscountInfoTopText size="20px" mb="4px">
                  {calculatedPrice?.monthlyDiscountedPlanCharge}원
                </DiscountInfoTopText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  {selectedPlan}
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  {calculatedPrice?.monthlyRealPlanCharge}원
                </DiscountInfoText>
              </HalfContentDiv>
              {(selectedDiscount === 1 || selectedDiscount === 2) && (
                <HalfContentDiv>
                  <DiscountInfoText size="16px" mb="0">
                    선택 약정 할인
                  </DiscountInfoText>
                  <DiscountInfoText size="16px" mb="0">
                    -{calculatedPrice?.monthlyPlanDiscount}원
                  </DiscountInfoText>
                </HalfContentDiv>
              )}
            </MonthlyHalfDiv>
          </MonthlyFeeInfoDiv>
        </MonthlyFeeContainer>
        <ButtonListDiv width="370px">
          <UplusButton
            width="150px"
            height="50px"
            radius="25px"
            size="18px"
            text="장바구니"
            fontColor={theme.app.grayFont}
            bgColor={theme.app.background}
            border={`1px solid ${theme.app.grayFont}`}
            onClick={() => null}
          />
          <UplusButton
            width="200px"
            height="50px"
            radius="25px"
            size="18px"
            text="온라인 주문"
            onClick={() => clickOrder()}
          />
        </ButtonListDiv>
      </ContentContainer>
      <PlanListDialog
        open={openDialog}
        onClose={closeDialog}
        selectedPlan={selectedPlan}
        planListData={planListData}
        handleChangePlan={handleChangePlan}
      />
    </MainContainer>
  )
}

export default DeviceDetailPage
