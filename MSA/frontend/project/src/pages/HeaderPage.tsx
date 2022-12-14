import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import {
  AutoCompletion,
  autoCompletion,
  AutoCompletionList,
} from '../api/search'
import { AxiosError } from 'axios'
// styles
import styled, { css, useTheme } from 'styled-components'
import { flexBetween } from '../styles/basicStyles'
// import components
import SearchBar from '../components/SearchBar'
import UplusLogo from '../components/UplusLogo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StorefrontIcon from '@mui/icons-material/Storefront'
import InventoryIcon from '@mui/icons-material/Inventory'
import { SearchParams } from './search/SearchPage'
import Swal from 'sweetalert2'

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
const CustomCartIcon = styled(ShoppingCartIcon)<{ fcolor: string }>`
  font-size: 36px;
  color: ${({ fcolor }) => fcolor};
  cursor: pointer;
`
const CustomStoreIcon = styled(StorefrontIcon)<{ fcolor: string }>`
  font-size: 36px;
  color: ${({ fcolor }) => fcolor};
  cursor: pointer;
`
const CustomInventoryIcon = styled(InventoryIcon)<{ fcolor: string }>`
  font-size: 36px;
  color: ${({ fcolor }) => fcolor};
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
  const [keyword, setKeyword] = useState('')
  const [autoCompletionList, setAutoCompletionList] = useState<Array<string>>(
    []
  )
  const params = useParams<keyof SearchParams>() as SearchParams
  const completionList = useQuery<AutoCompletionList, AxiosError>(
    ['completionList', keyword],
    () => autoCompletion(keyword)
  )

  const handleKeyPress = (key: string) => {
    if (key === 'Enter') {
      if (keyword !== '' && keyword.length <= 30) {
        navigate(`/search/${keyword}`)
      } else if (keyword === '') {
        Swal.fire({
          text: '???????????? ??????????????????!',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        })
      } else {
        Swal.fire({
          text: '?????? ?????? ?????? ?????? ?????? 30??? ?????????',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        })
      }
    }
  }

  useEffect(() => {
    if (params.keyword) {
      if (keyword !== '' && keyword.length <= 30) {
        setKeyword(params.keyword)
      }
    }
  }, [params.keyword])

  useEffect(() => {
    if (location.pathname === '/') {
      setIsDarkBackground(true)
    } else {
      setIsDarkBackground(false)
    }
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (completionList.data) {
      setAutoCompletionList(
        completionList.data.map(
          (completionData: AutoCompletion) => completionData.name
        )
      )
    }
  }, [completionList.data])

  const handleChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <RootContainer
      backgroundColor={
        isDarkBackground ? theme.app.mainBackground : theme.app.background
      }
    >
      <SearchBar
        keyword={keyword}
        autoCompletionList={autoCompletionList}
        handleKeyPress={handleKeyPress}
        handleChangeKeyword={handleChangeKeyword}
      />
      <InnerContainer>
        <HeaderContainer
          backgroundColor={
            isDarkBackground ? theme.app.mainBackground : theme.app.background
          }
        >
          <UplusLogo color={isDarkBackground ? 'white' : 'black'} />
          <ButtonDiv>
            <CustomStoreIcon
              fcolor={
                isDarkBackground ? theme.app.whiteFont : theme.app.blackFont
              }
              onClick={() => navigate('/device')}
            />
            <CustomCartIcon
              fcolor={
                isDarkBackground ? theme.app.whiteFont : theme.app.blackFont
              }
              onClick={() => navigate('/cart')}
            />
            <CustomInventoryIcon
              fcolor={
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
