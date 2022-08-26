import { useState } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'

// styled
const FilterContainer = styled.div`
  display: flex;
  width: 1230px;
  height: 300px;
  padding-top: 20px;
`
const MutableContainer = styled.div`
  position: absolute;
  height: 300px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.app.lightGray};
  ${({ width, zIndex, marginLeft }: MutableContainerProps) => {
    return css`
      width: ${width};
      z-index: ${zIndex};
      margin-left: ${marginLeft};
    `
  }}
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
`
const Title = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  overflow: hidden;
  border-bottom: 2px solid ${(props) => props.theme.app.dividerGray};
  ${({ width }: WidthProps) => {
    return css`
      width: ${width};
    `
  }}
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
`
const VisibleTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 60px;
`
const TitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
`
const MoreText = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-right: 20px;
  white-space: nowrap;
  cursor: pointer;
`
const Content = styled.div`
  display: flex;
  height: 206px;
  padding: 16px 0 16px 24px;
  overflow: hidden auto;
  ${({ width }: WidthProps) => {
    return css`
      width: ${width};
    `
  }}
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
  ::-webkit-scrollbar {
    width: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d38db4;
    border-radius: 8px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: #c4c4c4;
    border-radius: 8px;
    box-shadow: inset 0px 0px 5px white;
  }
  &:hover {
    ::-webkit-scrollbar {
      width: 8px;
    }
  }
`
const HideTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  ${({ width }: WidthProps) => {
    return css`
      width: ${width};
    `
  }}
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
`
const HideTitle = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 10px;
  ${({ width }: WidthProps) => {
    return css`
      width: ${width};
    `
  }}
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
`
const HideContent = styled.div`
  height: 206px;
  padding-left: 10px;
`
const HideDiv = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
`
const HideText = styled.span`
  white-space: nowrap;
  ${({ width, fontSize, color, marginLeft }: HideTextProps) => {
    return css`
      width: ${width};
      font-size: ${fontSize};
      color: ${color};
      margin-left: ${marginLeft};
    `
  }}
`

// interface
interface WidthProps {
  width: string
}

interface MutableContainerProps extends WidthProps {
  zIndex: number
  marginLeft: string
}

interface HideTextProps {
  width: string
  fontSize: string
  color: string
  marginLeft: string
}

interface DeviceFilterProps {}

function DeviceFilter({}: DeviceFilterProps) {
  const [openedFilter, setOpenedFilter] = useState<number>(0)
  const theme = useTheme()
  const planTitleList: any = [
    '요금',
    '데이터',
    '나눠쓰기',
    '음성통화',
    '메세지',
  ]
  const planList: any = [
    {
      name: '5G 프리미어 에센셜',
      price: '월 37,500원',
      data: '월 12GB',
      sharing: '사용가능',
      voiceCall: '무제한',
      message: '기본제공',
    },
    {
      name: '5G 슬림+',
      price: '월 37,500원',
      data: '월 12GB',
      sharing: '사용가능',
      voiceCall: '무제한',
      message: '기본제공',
    },
    {
      name: '5G 다이렉트 37.5',
      price: '월 37,500원',
      data: '월 12GB',
      sharing: '사용가능',
      voiceCall: '무제한',
      message: '기본제공',
    },
    {
      name: '5G 프리미어 에센셜 2',
      price: '월 37,500원',
      data: '월 12GB',
      sharing: '사용가능',
      voiceCall: '무제한',
      message: '기본제공',
    },
    {
      name: '5G 슬림+ 2',
      price: '월 37,500원',
      data: '월 12GB',
      sharing: '사용가능',
      voiceCall: '무제한',
      message: '기본제공',
    },
    {
      name: '5G 다이렉트 37.5 2',
      price: '월 37,500원',
      data: '월 12GB',
      sharing: '사용가능',
      voiceCall: '무제한',
      message: '기본제공',
    },
  ]
  const discountList: any = [
    { name: '추천' },
    { name: '공시지원금' },
    { name: '선택약정 24개월' },
    { name: '선택약정 12개월' },
  ]
  const discountInfoList: any = [
    '',
    '휴대폰 가격 1회 할인',
    '24개월간 통신요금 25% 할인',
    '12개월간 통신요금 25% 할인',
  ]
  const installmentList: any = [
    { name: '일시불' },
    { name: '12개월' },
    { name: '24개월' },
    { name: '36개월' },
  ]
  const storageList: any = [
    { name: '전체' },
    { name: '512GB 이상' },
    { name: '256GB' },
    { name: '128GB' },
  ]

  return (
    <FilterContainer>
      <MutableContainer
        width={openedFilter === 1 ? '1230px' : '300px'}
        zIndex={8}
        marginLeft="0px"
      >
        <Title width={openedFilter === 1 ? '1230px' : '300px'}>
          <div>
            <VisibleTitleContainer>
              <TitleText>요금제</TitleText>
              {!(openedFilter === 1) && (
                <MoreText
                  onClick={() => {
                    setOpenedFilter(1)
                  }}
                >{`상세보기 >`}</MoreText>
              )}
            </VisibleTitleContainer>
          </div>
          <HideTitleContainer width="920px">
            <HideTitle width="920px">
              {planTitleList.map((planTitle: string) => (
                <HideText
                  width="100px"
                  fontSize="16px"
                  color={theme.app.grayFont}
                  marginLeft="40px"
                >
                  {planTitle}
                </HideText>
              ))}
            </HideTitle>
            {openedFilter === 1 && (
              <MoreText onClick={() => setOpenedFilter(0)}>{`< 접기`}</MoreText>
            )}
          </HideTitleContainer>
        </Title>
        <Content width={openedFilter === 1 ? '1206px' : '276px'}>
          <div>
            <FormControl sx={{ width: '276px' }}>
              <RadioGroup
                aria-labelledby="plan-label"
                defaultValue="5G 프리미어 에센셜"
                name="plan"
              >
                {planList.map((plan: any) => (
                  <FormControlLabel
                    value={plan.name}
                    control={<Radio />}
                    label={plan.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <HideContent>
            {planList.map((plan: any) => (
              <HideDiv>
                {[
                  plan.price,
                  plan.data,
                  plan.sharing,
                  plan.voiceCall,
                  plan.message,
                ].map((data: any) => (
                  <HideText
                    width="100px"
                    fontSize="18px"
                    color={theme.app.blackFont}
                    marginLeft="40px"
                  >
                    {data}
                  </HideText>
                ))}
              </HideDiv>
            ))}
          </HideContent>
        </Content>
      </MutableContainer>
      <MutableContainer
        width={openedFilter === 2 ? '920px' : '300px'}
        zIndex={7}
        marginLeft="310px"
      >
        <Title width={openedFilter === 2 ? '920px' : '300px'}>
          <div>
            <VisibleTitleContainer>
              <TitleText>할인 유형</TitleText>
              {!(openedFilter === 2) && (
                <MoreText
                  onClick={() => setOpenedFilter(2)}
                >{`상세보기 >`}</MoreText>
              )}
            </VisibleTitleContainer>
          </div>
          <HideTitleContainer width="610px">
            <HideTitle width="610px"></HideTitle>
            {openedFilter === 2 && (
              <MoreText onClick={() => setOpenedFilter(0)}>{`< 접기`}</MoreText>
            )}
          </HideTitleContainer>
        </Title>
        <Content width={openedFilter === 2 ? '896px' : '276px'}>
          <div>
            <FormControl sx={{ width: '276px' }}>
              <RadioGroup
                aria-labelledby="discount-label"
                defaultValue="추천"
                name="discount"
              >
                {discountList.map((discount: any) => (
                  <FormControlLabel
                    value={discount.name}
                    control={<Radio />}
                    label={discount.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <HideContent>
            {discountInfoList.map((discountInfo: any) => (
              <HideDiv>
                <HideText
                  width="auto"
                  fontSize="16px"
                  color={theme.app.grayFont}
                  marginLeft="0"
                >
                  {discountInfo}
                </HideText>
              </HideDiv>
            ))}
          </HideContent>
        </Content>
      </MutableContainer>
      <MutableContainer width="300px" zIndex={6} marginLeft="620px">
        <Title width="300px">
          <TitleText>할부 기간</TitleText>
        </Title>
        <Content width="276px">
          <FormControl>
            <RadioGroup
              aria-labelledby="installment-label"
              defaultValue="24개월"
              name="installment"
            >
              {installmentList.map((installment: any) => (
                <FormControlLabel
                  value={installment.name}
                  control={<Radio />}
                  label={installment.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Content>
      </MutableContainer>
      <MutableContainer width="300px" zIndex={6} marginLeft="930px">
        <Title width="300px">
          <TitleText>저장 용량</TitleText>
        </Title>
        <Content width="276px">
          <FormControl>
            <RadioGroup
              aria-labelledby="storage-label"
              defaultValue="전체"
              name="storage"
            >
              {storageList.map((storage: any) => (
                <FormControlLabel
                  value={storage.name}
                  control={<Radio />}
                  label={storage.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Content>
      </MutableContainer>
    </FilterContainer>
  )
}

export default DeviceFilter
