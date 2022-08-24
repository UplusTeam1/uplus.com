import { useState } from 'react'
import styled, { css } from 'styled-components'

const FilterContainer = styled.div`
  width: 1230px;
  height: 1500px;
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
`
const Title = styled.div`
  height: 60px;
  border-bottom: 2px solid ${(props) => props.theme.app.divederGray};
  ${({ width }: WidthProps) => {
    return css`
      width: ${width};
    `
  }}
`
const Content = styled.div`
  height: 238px;
  ${({ width }: WidthProps) => {
    return css`
      width: ${width};
    `
  }}
`

interface WidthProps {
  width: string
}

interface MutableContainerProps extends WidthProps {
  zIndex: number
  marginLeft: string
}

interface DeviceFilterProps {}

function DeviceFilter({}: DeviceFilterProps) {
  const [isOpenPlan, setIsOpenPlan] = useState<boolean>(false)
  const [isOpenDiscount, setIsOpenDiscount] = useState<boolean>(false)

  return (
    <FilterContainer>
      <MutableContainer width="1230px" zIndex={8} marginLeft="0px">
        <Title width="1230px"></Title>
        <Content width="1230px"></Content>
      </MutableContainer>
      <MutableContainer width="920px" zIndex={7} marginLeft="310px">
        <Title width="920px"></Title>
        <Content width="920px"></Content>
      </MutableContainer>
    </FilterContainer>
  )
}

export default DeviceFilter
