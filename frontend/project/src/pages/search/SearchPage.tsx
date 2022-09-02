import produce from 'immer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { DeviceData } from '../../api/device'
import DeviceCompareDialog from '../../components/device/DeviceCompareDialog'
import DeviceCompareTab from '../../components/device/DeviceCompareTab'
import DeviceItem from '../../components/device/DeviceItem'
import UplusButton from '../../components/UplusButton'
import useCompareDeviceList from '../../hooks/device/useCompareDeviceList'
import useDeviceList from '../../hooks/device/useDeviceList'
import { CompareDevice } from '../../modules/device'
import { flexCenter } from '../../styles/basicStyles'

const SearchRelationContainer = styled.div`
  ${flexCenter}
  width: 1228px;
  margin-bottom: 50px;
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const SearchCountContainer = styled.div`
  ${flexCenter}
  width: 1228px;
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const SearchCountSpan = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.app.uplusPink};
`
const SearchRelationSpan = styled.span`
  margin-right: 50px;
`
const SearchTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  width: 1228px;
`
const SearchListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1228px;
  & > div:nth-child(4n) {
    margin-right: 0;
  }
`
const UplusButtonDiv = styled.div`
  margin-left: 10px;
`

function SearchPage() {
  const theme = useTheme()
  const [isOpenCompareTab, setIsOpenCompareTab] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { deviceList, getDeviceList } = useDeviceList()
  const { compareDeviceList, setCompareDeviceList, resetCompareDeviceList } =
    useCompareDeviceList()

  const selectedCompareDeviceCode = useMemo(
    () =>
      compareDeviceList
        ? compareDeviceList.map((device) => device.deviceCode)
        : [''],
    [compareDeviceList]
  )

  useEffect(() => {
    getDeviceList('5G 심플+')
  }, [getDeviceList])

  const clickCompareButton = useCallback(() => {
    setIsOpenCompareTab(true)
  }, [])

  const closeCompareTab = useCallback(() => {
    setIsOpenCompareTab(false)
    resetCompareDeviceList()
  }, [])

  const clickOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const closeDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const addCompareDevice = (compareDevice: CompareDevice) => {
    clickCompareButton()
    for (let i = 0; i < 3; i++) {
      if (compareDeviceList[i].discountIndex === 3) {
        const _compareDeviceList = [...compareDeviceList]
        setCompareDeviceList(
          produce(_compareDeviceList, (draft) => {
            draft[i] = compareDevice
          })
        )
        if (i === 2) {
          setOpenDialog(true)
        }
        return
      }
    }
    alert('최대 3개 상품까지 비교하기가 가능합니다.')
  }

  const changeCompareDeviceOption = (compareDevice: CompareDevice) => {
    for (let i = 0; i < 3; i++) {
      if (compareDeviceList[i].deviceCode === compareDevice.deviceCode) {
        const _compareDeviceList = [...compareDeviceList]
        setCompareDeviceList(
          produce(_compareDeviceList, (draft) => {
            draft[i] = compareDevice
          })
        )
        break
      }
    }
  }

  const deleteCompareDevice = (deviceCode: string) => {
    const _compareDeviceList = [...compareDeviceList].filter(
      (device) => device.deviceCode !== deviceCode
    )
    _compareDeviceList.push({
      deviceCode: '',
      deviceName: '',
      joinTypeIndex: 0,
      installmentIndex: 0,
      discountIndex: 3,
      planName: '',
      picPath: '',
      price: 0,
    })
    setCompareDeviceList(_compareDeviceList)
  }

  return (
    <>
      <SearchTopContainer>
        <SearchRelationContainer>
          <SearchRelationSpan>연관 검색어</SearchRelationSpan>
          {['Sample1', 'Sample2', 'Sample3'].map((num) => (
            <UplusButtonDiv>
              <UplusButton
                width="100px"
                height="35px"
                size="14px"
                fontColor={theme.app.grayFont}
                bgColor={theme.app.whiteFont}
                border={`1px solid ${theme.app.grayFont}`}
                text={String(num)}
                onClick={() => null}
              />
            </UplusButtonDiv>
          ))}
        </SearchRelationContainer>
        <SearchCountContainer>
          <SearchCountSpan>"{'SampleSearchText'}"</SearchCountSpan>
          {'에 대한 검색결과는 총 '}
          <SearchCountSpan>{`SampleCount`}</SearchCountSpan>건 입니다!!
        </SearchCountContainer>
      </SearchTopContainer>
      {isOpenCompareTab && (
        <DeviceCompareTab
          closeCompareTab={closeCompareTab}
          clickOpenDialog={clickOpenDialog}
          compareDeviceList={compareDeviceList}
          deleteCompareDevice={deleteCompareDevice}
          resetCompareDeviceList={resetCompareDeviceList}
        />
      )}
      <SearchListContainer>
        {deviceList.data &&
          deviceList.data.map((device: DeviceData, index: number) => (
            <DeviceItem
              key={index}
              device={device}
              planFilter={'5G 심플+'}
              recommendCheck={true}
              installmentCheck={true}
              discountIndex={device.recommendedDiscountIndex}
              installmentIndex={2}
              addCompareDevice={addCompareDevice}
              deleteCompareDevice={deleteCompareDevice}
              selectedCheck={selectedCompareDeviceCode.includes(device.code)}
            />
          ))}
      </SearchListContainer>
      <DeviceCompareDialog
        open={openDialog}
        onClose={closeDialog}
        compareDeviceList={compareDeviceList}
        deleteCompareDevice={deleteCompareDevice}
      />
    </>
  )
}

export default SearchPage
