import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { DeviceData } from '../../api/device'
// import components
import DeviceFilter from '../../components/device/DeviceFilter'
import DeviceSubFilter from '../../components/device/DeviceSubFilter'
import DeviceItem from '../../components/device/DeviceItem'
import DeviceCompareTab from '../../components/device/DeviceCompareTab'
import DeviceCompareDialog from '../../components/device/DeviceCompareDialog'
import useDeviceList from '../../hooks/device/useDeviceList'

const DeviceListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1228px;
  & > div:nth-child(4n) {
    margin-right: 0;
  }
`

function DeviceListPage() {
  const [isOpenCompareTab, setIsOpenCompareTab] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { deviceList, getDeviceList } = useDeviceList()

  const clickCompareButton = useCallback(() => {
    setIsOpenCompareTab(true)
  }, [])

  const closeCompareTab = () => {
    setIsOpenCompareTab(false)
  }

  const clickOpenDialog = () => {
    setOpenDialog(true)
  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <DeviceFilter />
      <DeviceSubFilter />
      {isOpenCompareTab && (
        <DeviceCompareTab
          closeCompareTab={closeCompareTab}
          clickOpenDialog={clickOpenDialog}
        />
      )}
      <DeviceListContainer>
        {deviceList.data &&
          deviceList.data.map((device: DeviceData) => (
            <DeviceItem
              device={device}
              clickCompareButton={clickCompareButton}
            />
          ))}
      </DeviceListContainer>
      <DeviceCompareDialog open={openDialog} onClose={closeDialog} />
    </>
  )
}

export default DeviceListPage
