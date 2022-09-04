import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import produce from 'immer'
// custom hooks
import usePlanList from '../../hooks/plan/usePlanList'
// import interface
import { CompareDevice } from '../../modules/device'
import {
  DiscountType,
  DISCOUNT_TYPE_LIST,
  InstallmentType,
  INSTALLMENT_LIST,
  JoinType,
  JOIN_TYPE_LIST,
} from '../../data/staticData'
import { PlanData, PlanListData } from '../../api/plan'
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
  ${({ theme }) => {
    return css`
      color: ${theme.app.blackFont};
      background-color: ${theme.app.lightGray};
    `
  }}
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
const DeviceDiv = styled.div<{ border: string }>`
  ${flexCenter}
  flex-direction: column;
  position: relative;
  width: 356px;
  height: 356px;
  border-radius: 10px;
  ${({ border, theme }) => {
    return css`
      border: ${border};
      border-color: ${theme.app.dividerGray};
    `
  }};
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
const CustomPhoneIcon = styled(SmartphoneIcon)`
  font-size: 80px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.app.dividerGray};
`
const InfoTitleDiv = styled.div<{ border: string }>`
  ${flexBetween}
  width: 1140px;
  font-size: 22px;
  font-weight: bold;
  padding: 20px 0;
  cursor: pointer;
  ${({ border, theme }) => {
    return css`
      border-bottom: ${border};
      color: ${theme.app.grayFont};
      border-color: ${theme.app.dividerGray};
    `
  }};
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
  height: 120px;
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
const CustomCloseIcon = styled(CloseIcon)<{ size: string }>`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  ${({ size, theme }) => {
    return css`
      font-size: ${size};
      color: ${theme.app.grayFont};
    `
  }};
`

// interface
interface DeviceProps {
  device: CompareDevice
}

interface CompareDeviceProps extends DeviceProps {
  deleteCompareDevice: (deviceCode: string) => void
}

interface DeviceListProps {
  deviceList: Array<CompareDevice>
}

interface InfoTitleProps {
  title: string
  isFold: boolean
  onClick: () => void
}

interface PlanProps extends DeviceProps {
  planList: PlanListData
  changeCompareDeviceOption: (compareDevice: CompareDevice) => void
}

interface DeviceCompareDialogProps {
  open: boolean
  onClose: () => void
  compareDeviceList: Array<CompareDevice>
  changeCompareDeviceOption: (compareDevice: CompareDevice) => void
  deleteCompareDevice: (deviceCode: string) => void
}

// components
function Device({ device, deleteCompareDevice }: CompareDeviceProps) {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <DeviceDiv border={device.deviceName === '' ? '2px dashed' : '2px solid'}>
      {device.deviceName === '' ? (
        <>
          <CustomPhoneIcon />
          <ContentText>기기 미선택</ContentText>
        </>
      ) : (
        <>
          <CustomCloseIcon
            size="28px"
            onClick={() => deleteCompareDevice(device.deviceCode)}
          />
          <DeviceImage alt="Device Image" src={device.picPath} />
          <ContentText>{device.deviceName}</ContentText>
          <PriceText>
            월 {device.calculatedPrice?.totalMonthlyCharge}원
          </PriceText>
          <ButtonContainer>
            <UplusButton
              width="120px"
              height="30px"
              radius="15px"
              text="자세히보기"
              fontColor={theme.app.grayFont}
              bgColor={theme.app.background}
              border={`1px solid ${theme.app.grayFont}`}
              onClick={() =>
                navigate(`/device/${device.deviceCode}`, {
                  state: {
                    planName: device.planName,
                    discountIndex: device.discountIndex,
                    installmentIndex: device.installmentIndex,
                  },
                })
              }
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
        <InfoTopText>
          {device.deviceName === ''
            ? '-'
            : `${
                device.installmentIndex === 0
                  ? '기기 완납 결제 가격'
                  : '월 휴대폰 할부금'
              }`}
        </InfoTopText>
        <PriceText>
          {device.deviceName === ''
            ? ''
            : `${device.calculatedPrice?.monthlyDiscountedDevicePrice}원`}
        </PriceText>
      </InfoTopTextDiv>
      <InfoTextDiv>
        <InfoText>{device.deviceName === '' ? '-' : '출고가'}</InfoText>
        <InfoText>
          {device.deviceName === ''
            ? ''
            : `${device.calculatedPrice?.realDevicePrice}원`}
        </InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.deviceName === '' ? '-' : '공시지원금'}</InfoText>
        <InfoText>
          {device.deviceName === ''
            ? ''
            : `-${
                device.discountIndex === 0
                  ? device.calculatedPrice?.deviceDiscount
                  : '0'
              }원`}
        </InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.deviceName === '' ? '-' : '실구매가'}</InfoText>
        <InfoText>
          {device.deviceName === ''
            ? ''
            : `${
                device.discountIndex === 0
                  ? device.calculatedPrice?.discountedDevicePrice
                  : device.calculatedPrice?.realDevicePrice
              }원`}
        </InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>
          {device.deviceName === '' ? '-' : '할부수수료(연5.9%)'}
        </InfoText>
        <InfoText>
          {device.deviceName === ''
            ? ''
            : `${device.calculatedPrice?.interestCharge}원`}
        </InfoText>
      </InfoTextDiv>
    </InfoDiv>
  )
}

function DeviceFee({ device }: DeviceProps) {
  return (
    <InfoDiv>
      <InfoTopTextDiv>
        <InfoTopText>
          {device.deviceName === '' ? '-' : '월 통신료'}
        </InfoTopText>
        <PriceText>
          {device.deviceName === ''
            ? ''
            : `${device.calculatedPrice?.monthlyDiscountedPlanCharge}원`}
        </PriceText>
      </InfoTopTextDiv>
      <InfoTextDiv>
        <InfoText>{device.deviceName === '' ? '-' : '월정액'}</InfoText>
        <InfoText>
          {device.deviceName === ''
            ? ''
            : `${device.calculatedPrice?.monthlyRealPlanCharge}원`}
        </InfoText>
      </InfoTextDiv>
      <InfoTextDiv>
        <InfoText>{device.deviceName === '' ? '-' : '선택약정할인'}</InfoText>
        <InfoText>
          {device.deviceName === ''
            ? ''
            : `-${device.calculatedPrice?.monthlyPlanDiscount}원`}
        </InfoText>
      </InfoTextDiv>
    </InfoDiv>
  )
}

function FeeChart({ deviceList }: DeviceListProps) {
  const textAnchor: 'start' | 'middle' | 'end' = 'end'
  const [chartData, setChartData] = useState({
    series: [
      {
        name: '휴대폰 가격',
        data: deviceList.map((device) =>
          device.calculatedPrice && device.installmentIndex !== 0
            ? device.calculatedPrice._monthlyDiscountedDevicePrice
            : 0
        ),
      },
      {
        name: '통신료',
        data: deviceList.map((device) =>
          device.calculatedPrice
            ? device.calculatedPrice._monthlyDiscountedPlanCharge
            : 0
        ),
      },
    ],
    options: {
      chart: {
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'right',
          },
        },
      },
      xaxis: {
        categories: deviceList.map((device) => device.deviceName),
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + '원'
          },
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        textAnchor: textAnchor,
        formatter: function (_val: any, opt: any) {
          let series = opt.w.config.series
          let idx = opt.dataPointIndex
          const total = series.reduce(
            (total: any, self: any) => total + self.data[idx],
            0
          )
          return total.toLocaleString('ko-KR') + '원'
        },
        style: {
          fontSize: '22px',
          colors: ['#000'],
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

  useEffect(() => {
    setChartData(
      produce(chartData, (draft) => {
        draft.series[0].data = deviceList.map((device) =>
          device.calculatedPrice && device.installmentIndex !== 0
            ? device.calculatedPrice._monthlyDiscountedDevicePrice
            : 0
        )
        draft.series[1].data = deviceList.map((device) =>
          device.calculatedPrice
            ? device.calculatedPrice._monthlyDiscountedPlanCharge
            : 0
        )
        draft.options.xaxis.categories = deviceList.map(
          (device) => device.deviceName
        )
      })
    )
  }, [deviceList])

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

function Plan({ device, planList, changeCompareDeviceOption }: PlanProps) {
  return (
    <PlanInfoDiv>
      {device.deviceName === '' ? (
        Array.from(Array(4).keys()).map((key: number) => (
          <InfoText key={key}>-</InfoText>
        ))
      ) : (
        <>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-1-label"
              id="select-1"
              value={device.joinTypeIndex}
              onChange={(e) =>
                changeCompareDeviceOption({
                  ...device,
                  joinTypeIndex: Number(e.target.value),
                })
              }
              label="1"
            >
              {JOIN_TYPE_LIST.map((joinType: JoinType, index: number) => (
                <MenuItem key={index} value={joinType.indexValue}>
                  {joinType.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-2-label"
              id="select-2"
              value={device.installmentIndex}
              onChange={(e) =>
                changeCompareDeviceOption({
                  ...device,
                  installmentIndex: Number(e.target.value),
                })
              }
              label="2"
            >
              {INSTALLMENT_LIST.map(
                (installmentType: InstallmentType, index: number) => (
                  <MenuItem key={index} value={installmentType.indexValue}>
                    {installmentType.label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-3-label"
              id="select-3"
              value={device.discountIndex}
              onChange={(e) =>
                changeCompareDeviceOption({
                  ...device,
                  discountIndex: Number(e.target.value),
                })
              }
              label="3"
            >
              {DISCOUNT_TYPE_LIST.slice(1).map(
                (discountType: DiscountType, index: number) => (
                  <MenuItem key={index} value={discountType.indexValue}>
                    {discountType.label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="select-4-label"
              id="select-4"
              value={device.planName}
              onChange={(e) =>
                changeCompareDeviceOption({
                  ...device,
                  planName: e.target.value,
                })
              }
              label="4"
            >
              {planList.map((planData: PlanData, index: number) => (
                <MenuItem key={index} value={planData.name}>
                  {planData.name}
                </MenuItem>
              ))}
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
        <InfoTopText>{device.deviceName === '' ? '-' : '색상'}</InfoTopText>
        <InfoText>
          {device.deviceName === '' ? '-' : `${device.color.join(', ')}`}
        </InfoText>
      </SpecInfoTextDiv>
      <SpecInfoTextDiv>
        <InfoTopText>{device.deviceName === '' ? '-' : '용량'}</InfoTopText>
        <InfoText>
          {device.deviceName === '' ? '-' : `${device.storage}GB`}
        </InfoText>
      </SpecInfoTextDiv>
    </SpecInfoDiv>
  )
}

function DeviceCompareDialog({
  open,
  onClose,
  compareDeviceList,
  changeCompareDeviceOption,
  deleteCompareDevice,
}: DeviceCompareDialogProps) {
  const [isFoldFee, setIsFoldFee] = useState(false)
  const [isFoldPlan, setIsFoldPlan] = useState(false)
  const [isFoldSpec, setIsFoldSpec] = useState(false)
  const planList = usePlanList()

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
          {compareDeviceList.map((device: CompareDevice, index: number) => (
            <Device
              key={index}
              device={device}
              deleteCompareDevice={deleteCompareDevice}
            ></Device>
          ))}
        </DeviceListDiv>
        <InfoTitle
          title="월 납부금액"
          isFold={isFoldFee}
          onClick={clickFeeTitle}
        />
        <FeeListDiv height={isFoldFee ? '0' : '770px'}>
          <FeeChart deviceList={compareDeviceList} />
          <DeviceFeeListDiv>
            {compareDeviceList.map((device: CompareDevice, index: number) => (
              <PlanFee key={index} device={device}></PlanFee>
            ))}
          </DeviceFeeListDiv>
          <PlanFeeListDiv>
            {compareDeviceList.map((device: CompareDevice, index: number) => (
              <DeviceFee key={index} device={device}></DeviceFee>
            ))}
          </PlanFeeListDiv>
        </FeeListDiv>
        <InfoTitle
          title="할인 유형, 요금제"
          isFold={isFoldPlan}
          onClick={clickPlanTitle}
        />
        <InfoListDiv height={isFoldPlan ? '0' : '300px'}>
          {compareDeviceList.map((device: CompareDevice, index: number) => (
            <Plan
              key={index}
              device={device}
              planList={planList.data ? planList.data : []}
              changeCompareDeviceOption={changeCompareDeviceOption}
            ></Plan>
          ))}
        </InfoListDiv>
        <InfoTitle
          title="기기 성능"
          isFold={isFoldSpec}
          onClick={clickSpecTitle}
        />
        <InfoListDiv height={isFoldSpec ? '0' : '180px'}>
          {compareDeviceList.map((device: CompareDevice, index: number) => (
            <Spec key={index} device={device}></Spec>
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
