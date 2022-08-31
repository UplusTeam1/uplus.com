import { useState } from 'react'
import { useParams } from 'react-router-dom'
// styles
import { flexBetween, flexCenter } from '../../styles/basicStyles'
import styled, { css, useTheme } from 'styled-components'
import { darken } from 'polished'
// import components
import { Radio } from '@mui/material'
import UplusButton from '../../components/UplusButton'
import PlanListDialog from '../../components/device/PlanListDialog'

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
  ${({ width, check, theme }) => {
    return css`
      width: ${width};
      height: ${check ? '116px' : '118px'};
      color: ${check ? theme.app.blackFont : theme.app.grayFont};
      border: ${check ? '2px solid' : '1px solid'};
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

function DeviceDetailPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const params = useParams()
  const theme = useTheme()

  const clickOpenDialog = () => {
    setOpenDialog(true)
  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  return (
    <MainContainer>
      <ImageContainer>
        <DeviceImage
          alt="Device Image"
          src="https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg"
        />
      </ImageContainer>
      <ContentContainer>
        <DeviceNameDiv>
          <DeviceName>갤럭시 Z Flip 4</DeviceName>
          <MainText>({params.deviceCode})</MainText>
        </DeviceNameDiv>
        <ColorTextDiv>
          <MainText>색상</MainText>
          <SubText>보라 퍼플</SubText>
        </ColorTextDiv>
        <ColorCircleDiv>
          <ColorCircle
            bgColor={'purple'}
            borderColor={theme.app.blackFont}
            outline={`3px solid ${theme.app.background}`}
          ></ColorCircle>
          <ColorCircle
            bgColor={'yellow'}
            borderColor={theme.app.dividerGray}
            outline=""
          ></ColorCircle>
          <ColorCircle
            bgColor={'blue'}
            borderColor={theme.app.dividerGray}
            outline=""
          ></ColorCircle>
          <ColorCircle
            bgColor={'black'}
            borderColor={theme.app.dividerGray}
            outline=""
          ></ColorCircle>
        </ColorCircleDiv>
        <MainTitleText>저장공간</MainTitleText>
        <ButtonDiv width={true ? '176px' : '178px'} check={true}>
          256GB
        </ButtonDiv>
        <MainTitleText>가입유형</MainTitleText>
        <ButtonListDiv width="580px">
          <ButtonDiv width={true ? '176px' : '178px'} check={true}>
            기기변경
          </ButtonDiv>
          <ButtonDiv width={false ? '176px' : '178px'} check={false}>
            번호이동
          </ButtonDiv>
          <ButtonDiv width={false ? '176px' : '178px'} check={false}>
            신규가입
          </ButtonDiv>
        </ButtonListDiv>
        <MainTitleText>요금제</MainTitleText>
        <SelectedPlanDiv onClick={() => clickOpenDialog()}>
          <PlanTitleDiv>
            <PlanName>5G 라이트+</PlanName>
            <PlanPrice>55,000원</PlanPrice>
          </PlanTitleDiv>
          <PlanInfoDiv>
            <PlanText>데이터 12GB</PlanText>
            <PlanText>음성 집/이동전화 무제한, 나눠쓰기 사용가능</PlanText>
          </PlanInfoDiv>
        </SelectedPlanDiv>
        <MainTitleText>할인유형</MainTitleText>
        <DiscountContainer>
          <DiscountDiv width={true ? '196px' : '198px'} check={true}>
            <DiscountTitleDiv>
              <DiscountInfoText size="14px" mb="6px">
                공시지원금
              </DiscountInfoText>
              <DiscountInfoText size="18px" mb="0">
                휴대폰 가격 1회 할인
              </DiscountInfoText>
            </DiscountTitleDiv>
            <DiscountPriceDiv>
              총<PlanPrice>-575,000</PlanPrice>원
            </DiscountPriceDiv>
          </DiscountDiv>
          <DiscountDiv width={false ? '376px' : '378px'} check={false}>
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
                color={false ? theme.app.blackFont : theme.app.grayFont}
              >
                <span>
                  <Radio
                    checked={false}
                    onChange={() => null}
                    value="24개월 할인"
                    name="radio-1"
                  />
                  24개월 할인
                </span>
                <span>
                  총<PlanPrice>-510,000</PlanPrice>원
                </span>
              </RadioDiv>
              <RadioDiv
                color={false ? theme.app.blackFont : theme.app.grayFont}
              >
                <span>
                  <Radio
                    checked={false}
                    onChange={() => null}
                    value="12개월 할인"
                    name="radio-2"
                  />
                  12개월 할인
                </span>
                <span>
                  총<PlanPrice>-255,000</PlanPrice>원
                </span>
              </RadioDiv>
            </RadioGroupDiv>
          </DiscountDiv>
        </DiscountContainer>
        <MainTitleText>할부기간</MainTitleText>
        <ButtonListDiv width="680px">
          <ButtonDiv width={true ? '156px' : '158px'} check={true}>
            일시불
          </ButtonDiv>
          <ButtonDiv width={false ? '156px' : '158px'} check={false}>
            12개월
          </ButtonDiv>
          <ButtonDiv width={false ? '156px' : '158px'} check={false}>
            24개월
          </ButtonDiv>
          <ButtonDiv width={false ? '156px' : '158px'} check={false}>
            36개월
          </ButtonDiv>
        </ButtonListDiv>
        <MainTitleText>결제 정보</MainTitleText>
        <MonthlyFeeContainer>
          <MonthlyFeeTitle>
            <PlanPrice>월 85,000원</PlanPrice>
            <DiscountInfoText size="18px" mb="0">
              5G 라이트+, 공시지원금 기준
            </DiscountInfoText>
          </MonthlyFeeTitle>
          <MonthlyFeeInfoDiv>
            <MonthlyHalfDiv
              borderRight={`2px solid ${theme.app.dividerGray}`}
              padding="20px 20px 20px 0"
            >
              <HalfContentDiv>
                <DiscountInfoTopText size="18px" mb="4px">
                  기기 완납 결제 가격
                </DiscountInfoTopText>
                <DiscountInfoTopText size="20px" mb="4px">
                  778,000원
                </DiscountInfoTopText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  정상가
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  1,353,000원
                </DiscountInfoText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  공시지원금
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  -575,000원
                </DiscountInfoText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  실구매가
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  778,000원
                </DiscountInfoText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  할부 개월 수
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  24개월
                </DiscountInfoText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="0">
                  할부수수료 (연 5.9%)
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="0">
                  48,700원
                </DiscountInfoText>
              </HalfContentDiv>
            </MonthlyHalfDiv>
            <MonthlyHalfDiv borderRight="" padding="20px 0 20px 20px">
              <HalfContentDiv>
                <DiscountInfoTopText size="18px" mb="4px">
                  월 통신료
                </DiscountInfoTopText>
                <DiscountInfoTopText size="20px" mb="4px">
                  63,750원
                </DiscountInfoTopText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="2px">
                  5G 라이트+
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="2px">
                  85,000원
                </DiscountInfoText>
              </HalfContentDiv>
              <HalfContentDiv>
                <DiscountInfoText size="16px" mb="0">
                  선택 약정 할인
                </DiscountInfoText>
                <DiscountInfoText size="16px" mb="0">
                  -21,250원
                </DiscountInfoText>
              </HalfContentDiv>
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
            onClick={() => null}
          />
        </ButtonListDiv>
      </ContentContainer>
      <PlanListDialog open={openDialog} onClose={closeDialog} />
    </MainContainer>
  )
}

export default DeviceDetailPage
