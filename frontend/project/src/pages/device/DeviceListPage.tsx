import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import styled, { useTheme } from 'styled-components'
import produce from 'immer'
// import interface
import { DeviceData, DeviceListData, getDevicePrice } from '../../api/device'
import { CompareDevice } from '../../modules/device'
// import components
import DeviceFilter from '../../components/device/DeviceFilter'
import DeviceSubFilter from '../../components/device/DeviceSubFilter'
import DeviceItem from '../../components/device/DeviceItem'
import DeviceCompareTab from '../../components/device/DeviceCompareTab'
import DeviceCompareDialog from '../../components/device/DeviceCompareDialog'
import Swal from 'sweetalert2'
// custom hooks
import useDeviceList from '../../hooks/device/useDeviceList'
import useFilter from '../../hooks/device/useFilter'
import useCompareDeviceList from '../../hooks/device/useCompareDeviceList'
import usePlanList from '../../hooks/plan/usePlanList'
import useFilterDevice from '../../hooks/device/useFilterDevice'
import useSortDevice from '../../hooks/device/useSortDevice'
import useCalculatedPrice from '../../hooks/device/useCalculatedPrice'

const DeviceListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1228px;
  & > div:nth-child(4n) {
    margin-right: 0;
  }
  margin-bottom: 200px;
`

function DeviceListPage() {
  const [isOpenCompareTab, setIsOpenCompareTab] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [sortedDeviceList, setSortedDeviceList] =
    useState<DeviceListData | null>(null)
  const { planFilter, deviceFilter, setPlanFilter, setDeviceFilter } =
    useFilter()
  const { data: planListData, isLoading: planListIsLoading } = usePlanList()
  const { deviceList, getDeviceList } = useDeviceList()
  const { compareDeviceList, setCompareDeviceList, resetCompareDeviceList } =
    useCompareDeviceList()
  const { filterDevice } = useFilterDevice()
  const { sortDevice } = useSortDevice()
  const priceMutation = useMutation(getDevicePrice)
  const { calculatePrice } = useCalculatedPrice()

  const filteredDeviceList = useMemo(
    () => filterDevice(deviceList.data, deviceFilter),
    [filterDevice, deviceList.data, deviceFilter]
  )
  const selectedCompareDeviceCode = useMemo(
    () =>
      compareDeviceList
        ? compareDeviceList.map((device) => device.deviceCode)
        : [''],
    [compareDeviceList]
  )

  useEffect(() => {
    if (planFilter !== '') {
      getDeviceList(planFilter)
    }
  }, [planFilter, getDeviceList])

  useEffect(() => {
    if (planListData && planFilter === '') {
      setPlanFilter(planListData[0].name)
    }
  }, [planFilter, planListData, setPlanFilter])

  useEffect(() => {
    setSortedDeviceList(sortDevice(filteredDeviceList, deviceFilter))
  }, [sortDevice, filteredDeviceList, deviceFilter.sortIndex])

  useEffect(() => {
    if (compareDeviceList[0].discountIndex !== 4) {
      setIsOpenCompareTab(true)
    }
  }, [])

  const handlePlanFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanFilter((e.target as HTMLInputElement).value)
  }

  const handleDeviceFilter = (
    value: number | string | Array<number> | boolean,
    key: string
  ) => {
    setDeviceFilter(
      produce(deviceFilter, (draft) => {
        draft[key] = value
      })
    )
  }

  const clickCompareButton = useCallback(() => {
    setIsOpenCompareTab(true)
  }, [])

  const closeCompareTab = useCallback(() => {
    setIsOpenCompareTab(false)
    resetCompareDeviceList()
  }, [])

  const clickOpenDialog = useCallback(() => {
    if (compareDeviceList[1].discountIndex !== 4) {
      setOpenDialog(true)
    } else {
      Swal.fire({
        text: '2개 이상의 상품을 선택하셔야 비교하기가 가능합니다.',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      })
    }
  }, [compareDeviceList])

  const closeDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const addCompareDevice = (compareDevice: CompareDevice) => {
    clickCompareButton()
    for (let i = 0; i < 3; i++) {
      if (compareDeviceList[i].discountIndex === 4) {
        setCompareDeviceList(
          produce(compareDeviceList, (draft) => {
            draft[i] = compareDevice
          })
        )
        if (i === 2) {
          setOpenDialog(true)
        }
        return
      }
    }
    Swal.fire({
      text: '최대 3개 상품까지 비교하기가 가능합니다.',
      icon: 'warning',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    })
  }

  const changeCompareDeviceOption = (compareDevice: CompareDevice) => {
    for (let i = 0; i < 3; i++) {
      if (compareDeviceList[i].deviceCode === compareDevice.deviceCode) {
        priceMutation.mutate(
          {
            deviceCode: compareDevice.deviceCode,
            planName: compareDevice.planName,
          },
          {
            onSuccess: (devicePrice) => {
              setCompareDeviceList(
                produce(compareDeviceList, (draft) => {
                  draft[i] = {
                    ...compareDevice,
                    calculatedPrice: calculatePrice(
                      devicePrice,
                      compareDevice.discountIndex,
                      compareDevice.installmentIndex
                    ),
                  }
                })
              )
            },
            onError: (e) => {
              console.error(e)
            },
          }
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
      discountIndex: 4,
      planName: '',
      picPath: '',
      calculatedPrice: null,
      color: [''],
      storage: 0,
    })
    setCompareDeviceList(_compareDeviceList)
  }

  return (
    <>
      <DeviceFilter
        planListData={planListData}
        planListIsLoading={planListIsLoading}
        planFilter={planFilter}
        deviceFilter={deviceFilter}
        handlePlanFilter={handlePlanFilter}
        handleDeviceFilter={handleDeviceFilter}
      />
      <DeviceSubFilter
        deviceFilter={deviceFilter}
        handleDeviceFilter={handleDeviceFilter}
      />
      {isOpenCompareTab && (
        <DeviceCompareTab
          closeCompareTab={closeCompareTab}
          clickOpenDialog={clickOpenDialog}
          compareDeviceList={compareDeviceList}
          deleteCompareDevice={deleteCompareDevice}
          resetCompareDeviceList={resetCompareDeviceList}
        />
      )}
      <DeviceListContainer>
        {sortedDeviceList &&
          sortedDeviceList.map((device: DeviceData, index: number) => (
            <DeviceItem
              key={index}
              device={device}
              planFilter={planFilter}
              discountIndex={deviceFilter.discountIndex}
              installmentIndex={deviceFilter.installmentIndex}
              addCompareDevice={addCompareDevice}
              deleteCompareDevice={deleteCompareDevice}
              selectedCheck={selectedCompareDeviceCode.includes(device.code)}
            />
          ))}
      </DeviceListContainer>
      <DeviceCompareDialog
        open={openDialog}
        onClose={closeDialog}
        compareDeviceList={compareDeviceList}
        changeCompareDeviceOption={changeCompareDeviceOption}
        deleteCompareDevice={deleteCompareDevice}
      />
    </>
  )
}

export default DeviceListPage
