import { useState } from 'react'
// styles
import styled, { css, useTheme } from 'styled-components'
import { flexBetween, flexCenter } from '../../styles/basicStyles'
import { darken } from 'polished'
// import components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CloseIcon from '@mui/icons-material/Close'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import UplusButton from '../UplusButton'
import ReactApexChart from 'react-apexcharts'

// styled
const CustomDialogTitle = styled(DialogTitle)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
  background-color: ${({ theme }) => theme.app.lightGray};
`
const CustomDialogContent = styled(DialogContent)`
  padding: 0 80px 80px 80px;
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
const DeviceListDiv = styled.div`
  ${flexBetween}
  width: 1140px;
  height: 360px;
  margin-top: 60px;
  margin-bottom: 20px;
`
const DeviceDiv = styled.div`
  ${flexCenter}
  flex-direction: column;
  position: relative;
  width: 356px;
  height: 356px;
  border-radius: 10px;
  ${({ border }: { border: string }) => {
    return css`
      border: ${border};
    `
  }};
  border-color: ${({ theme }) => theme.app.dividerGray};
`
const DeviceImage = styled.img`
  height: 120px;
  margin-bottom: 40px;
`
const ContentText = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.app.grayFont};
`
const PriceText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const ButtonContainer = styled.div`
  ${flexCenter}
  margin-top: 30px;
`
const CartButton = styled.div`
  ${flexCenter}
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.app.grayFont};
  border-radius: 15px;
  margin-left: 8px;
  &:hover {
    background: ${(props) => darken(0.1, props.theme.app.background)};
  }
  &:active {
    background: ${(props) => darken(0.2, props.theme.app.background)};
  }
  cursor: pointer;
`
const CustomPhoneIcon = styled(SmartphoneIcon)`
  font-size: 80px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.app.dividerGray};
`
const InfoTitleDiv = styled.div`
  ${flexBetween}
  width: 1140px;
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.grayFont};
  padding: 20px 0;
  cursor: pointer;
  ${({ border }: { border: string }) => {
    return css`
      border-bottom: ${border};
    `
  }};
  border-color: ${({ theme }) => theme.app.dividerGray};
`
const CustomLessIcon = styled(ExpandLessIcon)`
  color: ${({ theme }) => theme.app.grayFont};
  font-size: 36px;
  margin-right: 10px;
  cursor: pointer;
`
const CustomMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.app.grayFont};
  font-size: 36px;
  margin-right: 10px;
  cursor: pointer;
`
const FeeListDiv = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 1140px;
  overflow: hidden;
  ${({ height }: { height: string }) => {
    return css`
      height: ${height};
    `
  }};
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
`
const DeviceFeeListDiv = styled.div`
  ${flexBetween}
  width: 1140px;
`
const PlanFeeListDiv = styled.div`
  ${flexBetween}
  width: 1140px;
  margin-top: 40px;
`
const InfoListDiv = styled.div`
  ${flexBetween}
  width: 1140px;
  overflow: hidden;
  ${({ height }: { height: string }) => {
    return css`
      height: ${height};
    `
  }};
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
`
const InfoDiv = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 300px;
  padding: 30px;
  background-color: ${({ theme }) => theme.app.lightGray};
`
const PlanInfoDiv = styled.div`
  ${flexBetween}
  flex-direction: column;
  width: 300px;
  height: 220px;
  padding: 30px;
  background-color: ${({ theme }) => theme.app.lightGray};
`
const SpecInfoDiv = styled.div`
  ${flexBetween}
  flex-direction: column;
  width: 300px;
  height: 100px;
  padding: 30px;
  background-color: ${({ theme }) => theme.app.lightGray};
`
const InfoTopTextDiv = styled.div`
  ${flexBetween}
  width: 300px;
  padding-bottom: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.app.dividerGray};
`
const InfoTopText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const InfoTextDiv = styled.div`
  ${flexBetween}
  width: 300px;
  margin-top: 10px;
`
const SpecInfoTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`
const InfoText = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.app.blackFont};
  word-break: break-word;
`
const CustomDialogActions = styled(DialogActions)`
  justify-content: center;
  padding: 30px;
`
const CustomCloseIcon = styled(CloseIcon)`
  position: absolute;
  right: 16px;
  top: 16px;
  color: ${({ theme }) => theme.app.grayFont};
  cursor: pointer;
  ${({ size }: { size: string }) => {
    return css`
      font-size: ${size};
    `
  }};
`

// interface
interface DeviceProps {
  device: any
}

interface DeviceListProps {
  deviceList: any
}

interface InfoTitleProps {
  title: string
  isFold: boolean
  onClick: () => void
}

interface DeviceCompareDialogProps {
  open: boolean
  onClose: () => void
}

// components
function Device({ device }: DeviceProps) {
  const theme = useTheme()

  return (
    <DeviceDiv border={device.name === '' ? '2px dashed' : '2px solid'}>
      {device.name === '' ? (
        <>
          <CustomPhoneIcon />
          <ContentText>기기 미선택</ContentText>
        </>
      ) : (
        <>
          <CustomCloseIcon size="28px" onClick={() => null} />
          <DeviceImage alt="Device Image" src={device.picPath} />
          <ContentText>{device.name}</ContentText>
          <PriceText>{device.price}원</PriceText>
          <ButtonContainer>
            <UplusButton
              width="120px"
              height="30px"
              radius="15px"
              text="자세히보기"
              fontColor={theme.app.grayFont}
              bgColor={theme.app.background}
              border={`1px solid ${theme.app.grayFont}`}
              onClick={() => null}
            />
            <CartButton>
              <AddShoppingCartOutlinedIcon color="secondary" fontSize="small" />
            </CartButton>
          </ButtonContainer>
        </>
      )}
    </DeviceDiv>
  )
}

function InfoTitle({ title, isFold, onClick }: InfoTitleProps) {
  return (
    <InfoTitleDiv onClick={() => onClick()} border={isFold ? '1px solid' : ''}>
      {title}
      {isFold ? <CustomMoreIcon /> : <CustomLessIcon />}
    </InfoTitleDiv>
  )
}

function PlanFee({ device }: DeviceProps) {
  return (
    <InfoDiv>
      <InfoTopTextDiv>
        <InfoTopText>{device.name === '' ? '-' : '휴대폰 가격'}</InfoTopText>
        <PriceText>{device.name === '' ? '' : `${device.price}원`}</PriceText>
      </InfoTopTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '출고가'}</InfoText>
        <InfoText>{device.name === '' ? '' : '1,353,000원'}</InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '공시지원금'}</InfoText>
        <InfoText>{device.name === '' ? '' : '0원'}</InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '15% 추가지원금'}</InfoText>
        <InfoText>{device.name === '' ? '' : '0원'}</InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '할부수수료(연5.9%)'}</InfoText>
        <InfoText>{device.name === '' ? '' : '84,720원'}</InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '실구매가'}</InfoText>
        <InfoText>{device.name === '' ? '' : '1,353,000원'}</InfoText>
      </InfoTextDiv>
    </InfoDiv>
  )
}

function DeviceFee({ device }: DeviceProps) {
  return (
    <InfoDiv>
      <InfoTopTextDiv>
        <InfoTopText>{device.name === '' ? '-' : '통신료'}</InfoTopText>
        <PriceText>{device.name === '' ? '' : `${device.price}원`}</PriceText>
      </InfoTopTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '월정액'}</InfoText>
        <InfoText>{device.name === '' ? '' : '65,000원'}</InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '선택약정할인'}</InfoText>
        <InfoText>{device.name === '' ? '' : '0원'}</InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.name === '' ? '-' : '7%추가요금할인'}</InfoText>
        <InfoText>{device.name === '' ? '' : '0원'}</InfoText>
      </InfoTextDiv>
    </InfoDiv>
  )
}

function FeeChart({ deviceList }: DeviceListProps) {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: '휴대폰 가격',
        data: [61360, 7880, 0],
      },
      {
        name: '통신료',
        data: [65000, 55000, 0],
      },
    ],
    options: {
      chart: {
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: ['갤럭시 Z 플립1', '갤럭시 Z 플립2', ''],
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
          },
        },
      },
      dataLabels: {
        style: {
          fontSize: '18px',
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
  })

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      width={1140}
      height={280}
    />
  )
}

function Plan({ device }: DeviceProps) {
  return (
    <PlanInfoDiv>
      {device.name === '' ? (
        <>
          <InfoText>-</InfoText>
          <InfoText>-</InfoText>
          <InfoText>-</InfoText>
          <InfoText>-</InfoText>
        </>
      ) : (
        <>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-1-label"
              id="select-1"
              value={0}
              onChange={() => null}
              label="1"
            >
              <MenuItem value={0}>기기변경</MenuItem>
              <MenuItem value={1}>번호이동</MenuItem>
              <MenuItem value={2}>신규가입</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-2-label"
              id="select-2"
              value={2}
              onChange={() => null}
              label="2"
            >
              <MenuItem value={0}>일시불</MenuItem>
              <MenuItem value={1}>12개월</MenuItem>
              <MenuItem value={2}>24개월</MenuItem>
              <MenuItem value={3}>36개월</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-3-label"
              id="select-3"
              value={0}
              onChange={() => null}
              label="3"
            >
              <MenuItem value={0}>공시지원금</MenuItem>
              <MenuItem value={1}>선택약정24개월</MenuItem>
              <MenuItem value={2}>선택약정12개월</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-4-label"
              id="select-4"
              value={0}
              onChange={() => null}
              label="4"
            >
              <MenuItem value={0}>5G 시그니처</MenuItem>
              <MenuItem value={1}>5G 프리미어 슈퍼</MenuItem>
              <MenuItem value={2}>5G 프리미어 플러스</MenuItem>
              <MenuItem value={3}>5G 라이트+</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </PlanInfoDiv>
  )
}

function Spec({ device }: DeviceProps) {
  return (
    <SpecInfoDiv>
      <SpecInfoTextDiv>
        <InfoTopText>{device.name === '' ? '-' : '색상'}</InfoTopText>
        <InfoText>{device.name === '' ? '-' : '화이트'}</InfoText>
      </SpecInfoTextDiv>
      <SpecInfoTextDiv>
        <InfoTopText>{device.name === '' ? '-' : '용량'}</InfoTopText>
        <InfoText>{device.name === '' ? '-' : '256GB'}</InfoText>
      </SpecInfoTextDiv>
    </SpecInfoDiv>
  )
}

function DeviceCompareDialog({ open, onClose }: DeviceCompareDialogProps) {
  const [isFoldFee, setIsFoldFee] = useState(false)
  const [isFoldPlan, setIsFoldPlan] = useState(false)
  const [isFoldSpec, setIsFoldSpec] = useState(false)
  const deviceList: any = [
    {
      name: '갤럭시 Z 플립1',
      picPath:
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      price: '월 126,360',
    },
    {
      name: '갤럭시 Z 플립2',
      picPath:
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      price: '월 62,880',
    },
    {
      name: '',
      picPath:
        'https://image.lguplus.com/common/images/hphn/product/A2638-128/list/ushop_A2638-128_SU_A20210928152740918.jpg',
      price: '월 82,970',
    },
  ]

  const clickFeeTitle = () => {
    setIsFoldFee(!isFoldFee)
  }

  const clickPlanTitle = () => {
    setIsFoldPlan(!isFoldPlan)
  }

  const clickSpecTitle = () => {
    setIsFoldSpec(!isFoldSpec)
  }

  return (
    <Dialog maxWidth="xl" onClose={() => onClose()} open={open}>
      <CustomDialogTitle>
        비교결과
        <CustomCloseIcon size="36px" onClick={() => onClose()} />
      </CustomDialogTitle>
      <CustomDialogContent dividers={true}>
        <DeviceListDiv>
          {deviceList.map((device: any) => (
            <Device device={device}></Device>
          ))}
        </DeviceListDiv>
        <InfoTitle
          title="월 납부금액"
          isFold={isFoldFee}
          onClick={clickFeeTitle}
        />
        <FeeListDiv height={isFoldFee ? '0' : '810px'}>
          <FeeChart deviceList={deviceList} />
          <DeviceFeeListDiv>
            {deviceList.map((device: any) => (
              <PlanFee device={device}></PlanFee>
            ))}
          </DeviceFeeListDiv>
          <PlanFeeListDiv>
            {deviceList.map((device: any) => (
              <DeviceFee device={device}></DeviceFee>
            ))}
          </PlanFeeListDiv>
        </FeeListDiv>
        <InfoTitle
          title="할인 유형, 요금제"
          isFold={isFoldPlan}
          onClick={clickPlanTitle}
        />
        <InfoListDiv height={isFoldPlan ? '0' : '300px'}>
          {deviceList.map((device: any) => (
            <Plan device={device}></Plan>
          ))}
        </InfoListDiv>
        <InfoTitle
          title="기기 성능"
          isFold={isFoldSpec}
          onClick={clickSpecTitle}
        />
        <InfoListDiv height={isFoldSpec ? '0' : '160px'}>
          {deviceList.map((device: any) => (
            <Spec device={device}></Spec>
          ))}
        </InfoListDiv>
      </CustomDialogContent>
      <CustomDialogActions>
        <UplusButton
          width="150px"
          height="40px"
          radius="20px"
          text="확인"
          onClick={() => onClose()}
        />
      </CustomDialogActions>
    </Dialog>
  )
}

export default DeviceCompareDialog
