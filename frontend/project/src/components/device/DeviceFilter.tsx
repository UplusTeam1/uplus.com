import { useState } from 'react'
import {
  PLAN_INFO_LIST,
  DISCOUNT_TYPE_LIST,
  DICOUNT_INFO_LIST,
  INSTALLMENT_LIST,
  STORAGE_LIST,
  DiscountType,
  InstallmentType,
  StorageType,
} from '../../data/staticData'
// styles
import styled, { css, useTheme } from 'styled-components'
import { lighten } from 'polished'
// import components
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Skeleton,
} from '@mui/material'
// import interface
import { DeviceFilterType } from '../../modules/device'
import { PlanData, PlanListData } from '../../api/plan'

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

interface PlanFilterProps {
  openedFilter: number
  setOpenedFilter: React.Dispatch<React.SetStateAction<number>>
  planListData: PlanListData
  planFilter: string
  handlePlanFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface BasicDeviceFilterProps {
  deviceFilter: DeviceFilterType
  handleDeviceFilter: (
    value: number | string | Array<number> | boolean,
    key: string
  ) => void
}

interface DiscountFilterProps extends BasicDeviceFilterProps {
  openedFilter: number
  setOpenedFilter: React.Dispatch<React.SetStateAction<number>>
}

interface DeviceFilterProps {
  planListData: PlanListData | undefined
  planListIsLoading: boolean
  planFilter: string
  deviceFilter: DeviceFilterType
  handlePlanFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeviceFilter: (
    value: number | string | Array<number> | boolean,
    key: string
  ) => void
}

// components
function priceFormat(value: number) {
  return `${value.toLocaleString('ko-KR')}`
}

function PlanFilter({
  openedFilter,
  setOpenedFilter,
  planListData,
  planFilter,
  handlePlanFilter,
}: PlanFilterProps) {
  const theme = useTheme()

  return (
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
            {PLAN_INFO_LIST.map((planTitle: string, index: number) => (
              <HideText
                key={index}
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
              name="plan"
              value={planFilter}
              onChange={handlePlanFilter}
            >
              {planListData.map((planData: PlanData, index: number) => (
                <FormControlLabel
                  key={index}
                  value={planData.name}
                  control={<Radio />}
                  label={planData.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <HideContent>
          {planListData.map((planData: PlanData, index: number) => (
            <HideDiv key={index}>
              <HideText
                key={index}
                width="100px"
                fontSize="18px"
                color={theme.app.blackFont}
                marginLeft="40px"
              >
                {priceFormat(planData.price)}원
              </HideText>
              {[
                planData.data,
                planData.sharing,
                planData.voiceCall,
                planData.message,
              ].map((data: number | string, index: number) => (
                <HideText
                  key={index}
                  width="100px"
                  fontSize="18px"
                  color={theme.app.blackFont}
                  marginLeft="40px"
                >
                  {data === '집/이동전화 무제한' ? '무제한' : data}
                </HideText>
              ))}
            </HideDiv>
          ))}
        </HideContent>
      </Content>
    </MutableContainer>
  )
}

function DiscountFilter(props: DiscountFilterProps) {
  const theme = useTheme()

  return (
    <MutableContainer
      width={props.openedFilter === 2 ? '920px' : '300px'}
      zIndex={7}
      marginLeft="310px"
    >
      <Title width={props.openedFilter === 2 ? '920px' : '300px'}>
        <div>
          <VisibleTitleContainer>
            <TitleText>할인 유형</TitleText>
            {!(props.openedFilter === 2) && (
              <MoreText
                onClick={() => props.setOpenedFilter(2)}
              >{`상세보기 >`}</MoreText>
            )}
          </VisibleTitleContainer>
        </div>
        <HideTitleContainer width="610px">
          <HideTitle width="610px"></HideTitle>
          {props.openedFilter === 2 && (
            <MoreText
              onClick={() => props.setOpenedFilter(0)}
            >{`< 접기`}</MoreText>
          )}
        </HideTitleContainer>
      </Title>
      <Content width={props.openedFilter === 2 ? '896px' : '276px'}>
        <div>
          <FormControl sx={{ width: '276px' }}>
            <RadioGroup
              aria-labelledby="discount-label"
              name="discount"
              value={props.deviceFilter.discountIndex}
              onChange={(e) =>
                props.handleDeviceFilter(
                  Number(e.target.value),
                  'discountIndex'
                )
              }
            >
              {DISCOUNT_TYPE_LIST.map(
                ({ label, indexValue }: DiscountType, index: number) => (
                  <FormControlLabel
                    key={index}
                    value={indexValue}
                    control={<Radio />}
                    label={label}
                  />
                )
              )}
            </RadioGroup>
          </FormControl>
        </div>
        <HideContent>
          {DICOUNT_INFO_LIST.map((discountInfo: string, index: number) => (
            <HideDiv key={index}>
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
  )
}

function InstallmentFilter(props: BasicDeviceFilterProps) {
  return (
    <MutableContainer width="300px" zIndex={6} marginLeft="620px">
      <Title width="300px">
        <TitleText>할부 기간</TitleText>
      </Title>
      <Content width="276px">
        <FormControl>
          <RadioGroup
            aria-labelledby="installment-label"
            name="installment"
            value={props.deviceFilter.installmentIndex}
            onChange={(e) =>
              props.handleDeviceFilter(
                Number(e.target.value),
                'installmentIndex'
              )
            }
          >
            {INSTALLMENT_LIST.map(
              ({ label, indexValue }: InstallmentType, index: number) => (
                <FormControlLabel
                  key={index}
                  value={indexValue}
                  control={<Radio />}
                  label={label}
                />
              )
            )}
          </RadioGroup>
        </FormControl>
      </Content>
    </MutableContainer>
  )
}

function StorageFilter(props: BasicDeviceFilterProps) {
  return (
    <MutableContainer width="300px" zIndex={6} marginLeft="930px">
      <Title width="300px">
        <TitleText>저장 용량</TitleText>
      </Title>
      <Content width="276px">
        <FormControl>
          <RadioGroup
            aria-labelledby="storage-label"
            name="storage"
            value={props.deviceFilter.storage}
            onChange={(e) =>
              props.handleDeviceFilter(Number(e.target.value), 'storage')
            }
          >
            {STORAGE_LIST.map(
              ({ label, value }: StorageType, index: number) => (
                <FormControlLabel
                  key={index}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              )
            )}
          </RadioGroup>
        </FormControl>
      </Content>
    </MutableContainer>
  )
}

function DeviceFilter(props: DeviceFilterProps) {
  const [openedFilter, setOpenedFilter] = useState(0)
  const theme = useTheme()

  if (!props.planListData || props.planListIsLoading) {
    return (
      <FilterContainer>
        <Skeleton
          sx={{ bgcolor: lighten(0.5, theme.app.uplusPink) }}
          variant="rounded"
          width={1230}
          height={300}
        />
      </FilterContainer>
    )
  }

  return (
    <FilterContainer>
      <PlanFilter
        openedFilter={openedFilter}
        setOpenedFilter={setOpenedFilter}
        planListData={props.planListData}
        planFilter={props.planFilter}
        handlePlanFilter={props.handlePlanFilter}
      />
      <DiscountFilter
        openedFilter={openedFilter}
        setOpenedFilter={setOpenedFilter}
        deviceFilter={props.deviceFilter}
        handleDeviceFilter={props.handleDeviceFilter}
      />
      <InstallmentFilter
        deviceFilter={props.deviceFilter}
        handleDeviceFilter={props.handleDeviceFilter}
      />
      <StorageFilter
        deviceFilter={props.deviceFilter}
        handleDeviceFilter={props.handleDeviceFilter}
      />
    </FilterContainer>
  )
}

export default DeviceFilter
