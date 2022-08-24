import { useEffect, useState } from 'react'
// router
import { Outlet, useLocation } from 'react-router-dom'
// styles
import styled, { css } from 'styled-components'
// components
import SearchBar from '../components/SearchBar'
import UplusLogo from '../components/UplusLogo'

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 1440px;
  ${({ backgroundColor }: RootContainerProps) => {
    return css`
      background-color: ${backgroundColor};
    `
  }}
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1440px;
  min-height: 2768px;
`
const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 1440px;
  height: 160px;
  z-index: 9;
  ${({ backgroundColor }: RootContainerProps) => {
    return css`
      background-color: ${backgroundColor};
    `
  }}
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1440px;
  padding-top: 160px;
`

interface RootContainerProps {
  backgroundColor: string
}

function HeaderPage() {
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(true)
  const location = useLocation()
  const dummyDevice: any = [
    { title: 'Galaxy 1' },
    { title: 'Galaxy 2' },
    { title: 'Iphone 1' },
    { title: 'Iphone 2' },
  ]

  useEffect(() => {
    if (location.pathname === '/') {
      setIsDarkBackground(true)
    } else {
      setIsDarkBackground(false)
    }
  }, [location.pathname])

  return (
    <RootContainer backgroundColor={isDarkBackground ? 'black' : 'white'}>
      <SearchBar searchList={dummyDevice} />
      <InnerContainer>
        <HeaderContainer backgroundColor={isDarkBackground ? 'black' : 'white'}>
          <UplusLogo color={isDarkBackground ? 'white' : 'black'} />
        </HeaderContainer>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </InnerContainer>
    </RootContainer>
  )
}

export default HeaderPage
