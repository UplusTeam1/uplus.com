import { useEffect, useState } from 'react'
import { PlanData, PlanListData } from '../../api/plan'
// styles
import styled, { css } from 'styled-components'
import { flexBetween, flexCenter } from '../../styles/basicStyles'
// import components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import UplusButton from '../UplusButton'

// styled
const CustomDialogTitle = styled(DialogTitle)`
  width: 1300px;
  padding: 0;
`
const TitleDiv = styled.div`
  ${flexBetween}
  width: 1268px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  padding: 16px;
  ${({ theme }) => {
    return css`
      color: ${theme.app.blackFont};
      background-color: ${theme.app.lightGray};
      border-bottom: 1px solid ${theme.app.dividerGray};
    `
  }}
`
const TitleInfoDiv = styled.div`
  display: flex;
  width: 1200px;
  padding: 10px 50px;
`
const TitleHalfDiv = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
`
const TitleInfoText = styled.div`
  ${flexCenter}
  width: 150px;
  font-size: 16px;
  color: ${({ theme }) => theme.app.grayFont};
  ${({ width }: { width: string }) => {
    return css`
      width: ${width};
    `
  }};
`
const CustomDialogContent = styled(DialogContent)`
  padding: 0 30px 30px 30px;
  background-color: ${({ theme }) => theme.app.lightGray};
  overflow: overlay;
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
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
      height: 8px;
    }
  }
`
const PlanListDiv = styled.div`
  width: 1240px;
`
const PlanDiv = styled.div<{ check: boolean }>`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 30px;
  background-color: ${({ theme }) => theme.app.background};
  border-radius: 10px;
  ${({ check, theme }) => {
    return css`
      width: ${check ? '1198px' : '1200px'};
      height: ${check ? '178px' : '180px'};
      border: ${check
        ? `2px solid ${theme.app.blackFont}`
        : `1px solid ${theme.app.dividerGray}`};
    `
  }};
  cursor: pointer;
`
const PlanRadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`
const PlanName = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.app.blackFont};
`
const PlanFee = styled.span`
  font-size: 32px;
  font-weight: bold;
  margin-left: 42px;
  color: ${({ theme }) => theme.app.blackFont};
`
const PlanInfoDiv = styled.div`
  width: 140px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.app.blackFont};
`
const CallTopInfo = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.app.blackFont};
`
const CustomDialogActions = styled(DialogActions)`
  justify-content: center;
  padding: 30px;
`
const CustomCloseIcon = styled(CloseIcon)`
  color: ${({ theme }) => theme.app.grayFont};
  cursor: pointer;
  ${({ size }: { size: string }) => {
    return css`
      font-size: ${size};
    `
  }};
`

// interface
interface PlanProps {
  selected: boolean
  planData: PlanData
  handleCheckPlan: (value: string) => void
}

interface PlanListDialogProps {
  open: boolean
  onClose: () => void
  selectedPlan: string
  planListData: PlanListData | undefined
  handleChangePlan: (value: string) => void
}

// components
function priceFormat(value: number) {
  return `${value.toLocaleString('ko-KR')}`
}

function Plan({ selected, planData, handleCheckPlan }: PlanProps) {
  return (
    <PlanDiv check={selected} onClick={() => handleCheckPlan(planData.name)}>
      <PlanRadioDiv>
        <PlanName>
          <Radio
            checked={selected}
            onChange={() => handleCheckPlan(planData.name)}
            value={planData.name}
            name="radio"
          />
          {planData.name}
        </PlanName>
        <PlanFee>??? {priceFormat(planData.price)}???</PlanFee>
      </PlanRadioDiv>
      <PlanInfoDiv>{planData.data}</PlanInfoDiv>
      <PlanInfoDiv>{planData.sharing}</PlanInfoDiv>
      <PlanInfoDiv>
        {planData.voiceCall === '???/???????????? ?????????' ? (
          <>
            <CallTopInfo>???/????????????</CallTopInfo>?????????
          </>
        ) : (
          planData.voiceCall
        )}
      </PlanInfoDiv>
      <PlanInfoDiv>{planData.message}</PlanInfoDiv>
    </PlanDiv>
  )
}

function PlanListDialog({
  open,
  onClose,
  selectedPlan,
  planListData,
  handleChangePlan,
}: PlanListDialogProps) {
  const [checkedPlan, setCheckedPlan] = useState(selectedPlan)

  useEffect(() => {
    if (open) {
      setCheckedPlan(selectedPlan)
    }
  }, [open, selectedPlan])

  const handleCheckPlan = (value: string) => {
    setCheckedPlan(value)
  }

  return (
    <Dialog maxWidth="xl" onClose={() => onClose()} open={open}>
      <CustomDialogTitle>
        <TitleDiv>
          5G ????????? ??????
          <CustomCloseIcon size="32px" onClick={() => onClose()} />
        </TitleDiv>
        <TitleInfoDiv>
          <TitleHalfDiv>
            <TitleInfoText width="560px">?????????</TitleInfoText>
          </TitleHalfDiv>
          <TitleHalfDiv>
            <TitleInfoText width="140px">?????????</TitleInfoText>
            <TitleInfoText width="140px">????????????</TitleInfoText>
            <TitleInfoText width="140px">????????????</TitleInfoText>
            <TitleInfoText width="140px">?????????</TitleInfoText>
          </TitleHalfDiv>
        </TitleInfoDiv>
      </CustomDialogTitle>
      <CustomDialogContent dividers={true}>
        <PlanListDiv>
          {planListData &&
            planListData.map((planData: PlanData, index: number) => (
              <Plan
                key={index}
                selected={planData.name === checkedPlan}
                planData={planData}
                handleCheckPlan={handleCheckPlan}
              />
            ))}
        </PlanListDiv>
      </CustomDialogContent>
      <CustomDialogActions>
        <UplusButton
          width="150px"
          height="40px"
          radius="20px"
          text="??????"
          onClick={() => handleChangePlan(checkedPlan)}
        />
      </CustomDialogActions>
    </Dialog>
  )
}

export default PlanListDialog
