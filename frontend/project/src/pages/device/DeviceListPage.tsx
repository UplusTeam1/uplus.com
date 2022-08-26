import styled from 'styled-components'
// components
import DeviceFilter from '../../components/device/DeviceFilter'
import DeviceSubFilter from '../../components/device/DeviceSubFilter'
import DeviceItem from '../../components/device/DeviceItem'

const DeviceListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1228px;
  & > div:nth-child(4n) {
    margin-right: 0;
  }
`

function DeviceListPage() {
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

  return (
    <>
      <DeviceFilter />
      <DeviceSubFilter />
      <DeviceListContainer>
        {deviceList.map((device: any) => (
          <DeviceItem name={device.name} colors={device.detailPerColor} />
        ))}
      </DeviceListContainer>
    </>
  )
}

export default DeviceListPage
