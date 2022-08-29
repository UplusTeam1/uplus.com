import { useState } from 'react'
import styled from 'styled-components'
// import components
import DeviceFilter from '../../components/device/DeviceFilter'
import DeviceSubFilter from '../../components/device/DeviceSubFilter'
import DeviceItem from '../../components/device/DeviceItem'
import DeviceCompareTab from '../../components/device/DeviceCompareTab'
import DeviceCompareDialog from '../../components/device/DeviceCompareDialog'

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
  const deviceList: any = [
    {
      name: 'iPhone 12 Pro 256G',
      detailPerColor: [
        { color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' },
        { color: '핑크 골드', rgb: 'rgb(236, 219, 211)' },
      ],
    },
    {
      name: 'iPhone 12 Pro Max 256G',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: 'iPhone 13 Pro 256G',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: 'iPhone 13 Pro Max 256G',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: '갤럭시 Z 플립 3',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: '갤럭시 Z Filp 4',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: '갤럭시 Z Fold 4',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: '갤럭시 S21',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: '갤럭시 노트20',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
    {
      name: '갤럭시 S22',
      detailPerColor: [{ color: '보라 퍼플', rgb: 'rgb(184, 170, 203)' }],
    },
  ]

  const clickCompareButton = () => {
    setIsOpenCompareTab(true)
  }

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
        {deviceList.map((device: any) => (
          <DeviceItem
            name={device.name}
            colors={device.detailPerColor}
            clickCompareButton={clickCompareButton}
          />
        ))}
      </DeviceListContainer>
      <DeviceCompareDialog open={openDialog} onClose={closeDialog} />
    </>
  )
}

export default DeviceListPage
