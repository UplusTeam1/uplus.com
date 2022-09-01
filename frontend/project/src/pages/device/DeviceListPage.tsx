import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import produce from 'immer'
// import interface
import { DeviceData, DeviceListData } from '../../api/device'
import device, { DeviceFilterType } from '../../modules/device'
// import components
import DeviceFilter from '../../components/device/DeviceFilter'
import DeviceSubFilter from '../../components/device/DeviceSubFilter'
import DeviceItem from '../../components/device/DeviceItem'
import DeviceCompareTab from '../../components/device/DeviceCompareTab'
import DeviceCompareDialog from '../../components/device/DeviceCompareDialog'
// custom hooks
import useDeviceList from '../../hooks/device/useDeviceList'
import useFilter from '../../hooks/device/useFilter'
import usePlanList from '../../hooks/plan/usePlanList'

const DeviceListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1228px;
  & > div:nth-child(4n) {
    margin-right: 0;
  }
`

function filterDeviceList(
  deviceList: DeviceListData,
  deviceFilter: DeviceFilterType
) {
  const recommendCheck = deviceFilter.discountIndex === -1 ? true : false
  const installmentCheck = deviceFilter.installmentIndex === -1 ? false : true
  const storageCheck = deviceFilter.storage === 0 ? false : true

  if (installmentCheck) {
    return deviceList
      .filter((device) =>
        storageCheck ? device.storage === deviceFilter.storage : true
      )
      .filter((device) =>
        deviceFilter.maker === '' ? true : device.brand === deviceFilter.maker
      )
      .filter(
        (device) =>
          deviceFilter.price[0] <=
          device.monthlyChargeList[
            recommendCheck
              ? device.recommendedDiscountIndex
              : deviceFilter.discountIndex
          ].totalCharge[deviceFilter.installmentIndex]
      )
      .filter(
        (device) =>
          device.monthlyChargeList[
            recommendCheck
              ? device.recommendedDiscountIndex
              : deviceFilter.discountIndex
          ].totalCharge[deviceFilter.installmentIndex] <= deviceFilter.price[1]
      )
      .filter((device) => (deviceFilter.stock ? device.totalStock > 0 : true))
  } else {
    return deviceList
      .filter((device) =>
        storageCheck ? device.storage === deviceFilter.storage : true
      )
      .filter((device) =>
        deviceFilter.maker === '' ? true : device.brand === deviceFilter.maker
      )
      .filter(
        (device) =>
          deviceFilter.price[0] <=
          device.monthlyChargeList[
            recommendCheck
              ? device.recommendedDiscountIndex
              : deviceFilter.discountIndex
          ].planCharge
      )
      .filter(
        (device) =>
          device.monthlyChargeList[
            recommendCheck
              ? device.recommendedDiscountIndex
              : deviceFilter.discountIndex
          ].planCharge <= deviceFilter.price[1]
      )
      .filter((device) => (deviceFilter.stock ? device.totalStock > 0 : true))
  }
}

function DeviceListPage() {
  const [isOpenCompareTab, setIsOpenCompareTab] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [sortedDeviceList, setSortedDeviceList] =
    useState<DeviceListData | null>(null)
  const {
    planFilter,
    deviceFilter,
    setPlanFilter,
    setDeviceFilter,
    resetFilter,
  } = useFilter()
  const { data: planListData, isLoading: planListIsLoading } = usePlanList()
  const { deviceList, getDeviceList } = useDeviceList()
  const filteredDeviceList = useMemo(
    () =>
      deviceList.data ? filterDeviceList(deviceList.data, deviceFilter) : null,
    [deviceList.data, deviceFilter]
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
    if (filteredDeviceList) {
      const _filteredDeviceList = [...filteredDeviceList]
      const recommendCheck = deviceFilter.discountIndex === -1
      const installmentCheck = !(deviceFilter.installmentIndex === -1)
      if (deviceFilter.sortIndex === 0) {
        if (installmentCheck) {
          _filteredDeviceList.sort(function (a, b) {
            return (
              a.monthlyChargeList[
                recommendCheck
                  ? a.recommendedDiscountIndex
                  : deviceFilter.discountIndex
              ].totalCharge[deviceFilter.installmentIndex] -
              b.monthlyChargeList[
                recommendCheck
                  ? b.recommendedDiscountIndex
                  : deviceFilter.discountIndex
              ].totalCharge[deviceFilter.installmentIndex]
            )
          })
        } else {
          _filteredDeviceList.sort(function (a, b) {
            return (
              a.monthlyChargeList[deviceFilter.discountIndex].planCharge -
              b.monthlyChargeList[deviceFilter.discountIndex].planCharge
            )
          })
        }
      } else if (deviceFilter.sortIndex === 1) {
        _filteredDeviceList.sort(function (a, b) {
          return a.price - b.price
        })
      } else {
        _filteredDeviceList.sort(function (a, b) {
          return b.price - a.price
        })
      }
      setSortedDeviceList(_filteredDeviceList)
    }
  }, [filteredDeviceList, deviceFilter.sortIndex])

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
  }, [])

  const clickOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const closeDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

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
        />
      )}
      <DeviceListContainer>
        {sortedDeviceList &&
          sortedDeviceList.map((device: DeviceData, index: number) => (
            <DeviceItem
              key={index}
              device={device}
              recommendCheck={deviceFilter.discountIndex === -1}
              installmentCheck={!(deviceFilter.installmentIndex === -1)}
              discountIndex={
                deviceFilter.discountIndex === -1
                  ? device.recommendedDiscountIndex
                  : deviceFilter.discountIndex
              }
              installmentIndex={deviceFilter.installmentIndex}
              clickCompareButton={clickCompareButton}
            />
          ))}
      </DeviceListContainer>
      <DeviceCompareDialog open={openDialog} onClose={closeDialog} />
    </>
  )
}

export default DeviceListPage
