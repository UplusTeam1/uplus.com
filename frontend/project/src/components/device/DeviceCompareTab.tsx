import { useState } from 'react'
import styled, { css, useTheme } from 'styled-components'
// import components
import UplusButton from '../UplusButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CloseIcon from '@mui/icons-material/Close'
import SmartphoneIcon from '@mui/icons-material/Smartphone'

// styled
const TabContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 1300px;
  z-index: 11;
  ${({ theme }) => {
    return css`
      border-right: 1px solid ${theme.app.mainBackground};
      border-left: 1px solid ${theme.app.mainBackground};
    `
  }}
`
const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1300px;
  height: 50px;
  background-color: ${({ theme }) => theme.app.mainBackground};
`
const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.whiteFont};
  margin-left: 20px;
`
const TitleButtonDiv = styled.div`
  display: flex;
  align-items: center;
`
const CustomLessIcon = styled(ExpandLessIcon)`
  color: ${({ theme }) => theme.app.whiteFont};
  font-size: 36px;
  margin-right: 10px;
  cursor: pointer;
`
const CustomMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.app.whiteFont};
  font-size: 36px;
  margin-right: 14px;
  cursor: pointer;
`
const CustomCloseIcon = styled(CloseIcon)`
  color: ${({ theme }) => theme.app.whiteFont};
  font-size: 32px;
  margin-right: 14px;
  cursor: pointer;
`
const ContentDiv = styled.div<HeightProps>`
  display: flex;
  justify-content: space-between;
  width: 1300px;
  ${({ height, theme }) => {
    return css`
      height: ${height};
      background-color: ${theme.app.background};
    `
  }};
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
`
const DeviceListDiv = styled.div`
  display: flex;
  height: 120px;
  padding: 20px;
`
const DeviceDiv = styled.div<{ border: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 90px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 10px;
  ${({ border, theme }) => {
    return css`
      border: ${border};
      border-color: ${theme.app.dividerGray};
    `
  }};
`
const DeviceInfoDiv = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  height: 90px;
`
const DeviceImage = styled.img`
  width: 80px;
  margin: 0 12px 0 8px;
`
const DeleteDiv = styled.div`
  display: flex;
  justify-content: end;
  width: 20px;
  height: 90px;
`
const CustomDeleteIcon = styled(CloseIcon)`
  color: ${({ theme }) => theme.app.grayFont};
  font-size: 20px;
  cursor: pointer;
`
const CustomPhoneIcon = styled(SmartphoneIcon)`
  font-size: 60px;
  margin: 0 10px 0 -16px;
  color: ${({ theme }) => theme.app.dividerGray};
`
const ContentText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.grayFont};
`
const PriceText = styled.span`
  font-size: 26px;
  font-weight: bold;
  margin-right: 4px;
  color: ${({ theme }) => theme.app.blackFont};
`
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 26px;
  height: 98px;
`

// interface
interface HeightProps {
  height: string
}

interface DeviceProps {
  device: any
}

interface DeviceCompareTabProps {
  closeCompareTab: () => void
  clickOpenDialog: () => void
}

// components
function Device({ device }: DeviceProps) {
  return (
    <DeviceDiv border={device.name === '' ? '2px dashed' : '2px solid'}>
      {device.name === '' ? (
        <>
          <CustomPhoneIcon />
          <ContentText>기기 미선택</ContentText>
        </>
      ) : (
        <>
          <DeviceInfoDiv>
            <DeviceImage alt="Device Image" src={device.picPath} />
            <div>
              <div>
                <ContentText>{device.name}</ContentText>
              </div>
              <PriceText>{device.price}</PriceText>
              <ContentText>원</ContentText>
            </div>
          </DeviceInfoDiv>
          <DeleteDiv>
            <CustomDeleteIcon onClick={() => null} />
          </DeleteDiv>
        </>
      )}
    </DeviceDiv>
  )
}

function DeviceCompareTab({
  closeCompareTab,
  clickOpenDialog,
}: DeviceCompareTabProps) {
  const [isFoldTab, setIsFoldTab] = useState(false)
  const theme = useTheme()
  const deviceList: any = [
    {
      name: '갤럭시 Z 플립1',
      picPath:
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      price: '월 82,970',
    },
    {
      name: '갤럭시 Z 플립2',
      picPath:
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      price: '월 82,970',
    },
    {
      name: '',
      picPath:
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      price: '월 82,970',
    },
  ]

  return (
    <TabContainer>
      <TitleDiv>
        <Title>비교하기</Title>
        <TitleButtonDiv>
          {isFoldTab ? (
            <CustomLessIcon onClick={() => setIsFoldTab(false)} />
          ) : (
            <CustomMoreIcon onClick={() => setIsFoldTab(true)} />
          )}
          <CustomCloseIcon onClick={() => closeCompareTab()} />
        </TitleButtonDiv>
      </TitleDiv>
      <ContentDiv height={isFoldTab ? '0' : '150px'}>
        <DeviceListDiv>
          {deviceList.map((device: any) => (
            <Device device={device}></Device>
          ))}
        </DeviceListDiv>
        <ButtonDiv>
          <UplusButton
            width="150px"
            height="40px"
            radius="25px"
            text="비교하기"
            onClick={() => clickOpenDialog()}
          />
          <UplusButton
            width="150px"
            height="40px"
            radius="25px"
            text="전체삭제"
            fontColor={theme.app.grayFont}
            bgColor={theme.app.background}
            border={`1px solid ${theme.app.dividerGray}`}
            onClick={() => null}
          />
        </ButtonDiv>
      </ContentDiv>
    </TabContainer>
  )
}

export default DeviceCompareTab
