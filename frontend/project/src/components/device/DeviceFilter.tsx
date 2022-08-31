import { useState } from 'react'
import styled, { css, useTheme } from 'styled-components'
import {
  PLAN_INFO_LIST,
  DISCOUNT_TYPE_LIST,
  DICOUNT_INFO_LIST,
  INSTALLMENT_LIST,
  STORAGE_LIST,
} from '../../data/staticData'
import usePlanList from '../../hooks/plan/usePlanList'
// import components
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import Loading from '../Loading'

// styled
const FilterContainer = styled.div`
  display: flex;
  width: 1230px;
  height: 300px;
  padding-top: 20px;
`
const MutableContainer = styled.div<MutableContainerProps>`
  position: absolute;
  height: 300px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  ${({ width, zIndex, marginLeft, theme }) => {
    return css`
      width: ${width};
      z-index: ${zIndex};
      margin-left: ${marginLeft};
      background-color: ${theme.app.lightGray};
    `
  }}
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
`
const Title = styled.div<WidthProps>`
  display: flex;
  align-items: center;
  height: 60px;
  overflow: hidden;
  ${({ width, theme }) => {
    return css`
      width: ${width};
      border-bottom: 2px solid ${theme.app.dividerGray};
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
const Content = styled.div<WidthProps>`
  display: flex;
  height: 206px;
  padding: 16px 0 16px 24px;
  overflow: hidden auto;
  ${({ width }) => {
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
const HideTitleContainer = styled.div<WidthProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  ${({ width }) => {
    return css`
      width: ${width};
    `
  }}
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
`
const HideTitle = styled.div<WidthProps>`
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 10px;
  ${({ width }) => {
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
const HideText = styled.span<HideTextProps>`
  white-space: nowrap;
  ${({ width, fontSize, color, marginLeft }) => {
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
  const [openedFilter, setOpenedFilter] = useState(0)
  const theme = useTheme()
  const { data: planListData, isLoading: planListIsLoading } = usePlanList()

  if (!planListData || planListIsLoading) {
    return (
      <FilterContainer>
        <Loading />
      </FilterContainer>
    )
  }

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
              {PLAN_INFO_LIST.map((planTitle: string) => (
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
                {planListData.map((planData: any) => (
                  <FormControlLabel
                    value={planData.name}
                    control={<Radio />}
                    label={planData.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <HideContent>
            {planListData.map((planData: any) => (
              <HideDiv>
                {[
                  planData.price,
                  planData.data,
                  planData.sharing,
                  planData.voiceCall,
                  planData.message,
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
                {DISCOUNT_TYPE_LIST.map((discountType: string) => (
                  <FormControlLabel
                    value={discountType}
                    control={<Radio />}
                    label={discountType}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <HideContent>
            {DICOUNT_INFO_LIST.map((discountInfo: string) => (
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
              {INSTALLMENT_LIST.map((installment: string) => (
                <FormControlLabel
                  value={installment}
                  control={<Radio />}
                  label={installment}
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
              {STORAGE_LIST.map((storage: string) => (
                <FormControlLabel
                  value={storage}
                  control={<Radio />}
                  label={storage}
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
