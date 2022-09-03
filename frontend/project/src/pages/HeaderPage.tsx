import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// styles
import styled, { css, useTheme } from 'styled-components'
import { flexBetween } from '../styles/basicStyles'
// import components
import SearchBar from '../components/SearchBar'
import UplusLogo from '../components/UplusLogo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StorefrontIcon from '@mui/icons-material/Storefront'
import InventoryIcon from '@mui/icons-material/Inventory'

// styled
const RootContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  min-width: 1440px;
  ${(props) => {
    return css`
      background-color: ${props.backgroundColor};
    `
  }}
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1440px;
  min-height: 768px;
`
const HeaderContainer = styled.div<ContainerProps>`
  position: fixed;
  ${flexBetween}
  width: 1440px;
  height: 160px;
  z-index: 9;
  ${(props) => {
    return css`
      background-color: ${props.backgroundColor};
    `
  }}
`
const ButtonDiv = styled.div`
  ${flexBetween}
  width: 200px;
  padding-right: 40px;
`
const CustomCartIcon = styled(ShoppingCartIcon)<{ fColor: string }>`
  font-size: 36px;
  color: ${({ fColor }) => fColor};
  cursor: pointer;
`
const CustomStoreIcon = styled(StorefrontIcon)<{ fColor: string }>`
  font-size: 36px;
  color: ${({ fColor }) => fColor};
  cursor: pointer;
`
const CustomInventoryIcon = styled(InventoryIcon)<{ fColor: string }>`
  font-size: 36px;
  color: ${({ fColor }) => fColor};
  cursor: pointer;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1440px;
  padding-top: 160px;
`

interface ContainerProps {
  backgroundColor: string
}

function HeaderPage() {
  const theme = useTheme()
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const navigate = useNavigate()
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
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <RootContainer
      backgroundColor={
        isDarkBackground ? theme.app.mainBackground : theme.app.background
      }
    >
      <SearchBar searchList={dummyDevice} />
      <InnerContainer>
        <HeaderContainer
          backgroundColor={
            isDarkBackground ? theme.app.mainBackground : theme.app.background
          }
        >
          <UplusLogo color={isDarkBackground ? 'white' : 'black'} />
          <ButtonDiv>
            <CustomStoreIcon
              fColor={
                isDarkBackground ? theme.app.whiteFont : theme.app.blackFont
              }
              onClick={() => navigate('/device')}
            />
            <CustomCartIcon
              fColor={
                isDarkBackground ? theme.app.whiteFont : theme.app.blackFont
              }
              onClick={() => navigate('/cart')}
            />
            <CustomInventoryIcon
              fColor={
                isDarkBackground ? theme.app.whiteFont : theme.app.blackFont
              }
              onClick={() => navigate('/order')}
            />
          </ButtonDiv>
        </HeaderContainer>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </InnerContainer>
    </RootContainer>
  )
}

export default HeaderPage
