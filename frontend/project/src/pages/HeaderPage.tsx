// router
import { Outlet } from 'react-router-dom'
// styles
import styled from 'styled-components'
// components
import SearchBar from '../components/SearchBar'
import UplusLogo from '../components/UplusLogo'

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 1440px;
  background-color: black;
`
const InnerContainer = styled.div`
  width: 1440px;
  min-height: 768px;
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1440px;
  height: 160px;
`

function HeaderPage() {
  const dummyDevice: any = [
    { title: 'Galaxy 1' },
    { title: 'Galaxy 2' },
    { title: 'Iphone 1' },
    { title: 'Iphone 2' },
  ]

  return (
    <RootContainer>
      <SearchBar searchList={dummyDevice} />
      <InnerContainer>
        <HeaderContainer>
          <UplusLogo />
        </HeaderContainer>
        <Outlet />
      </InnerContainer>
    </RootContainer>
  )
}

export default HeaderPage
