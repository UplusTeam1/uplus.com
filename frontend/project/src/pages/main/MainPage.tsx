import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import UplusButton from '../../components/UplusButton'

// styled
const MainContainer = styled.div`
  width: 1440px;
  height: 800px;
  background-image: url('/images/LG_U+_Background.png');
  background-size: 100%;
  background-repeat: no-repeat;
`
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 150px;
  width: 600px;
  height: 100%;
`

function DeviceListPage() {
  const navigate = useNavigate()

  return (
    <MainContainer>
      <ContentContainer>
        <UplusButton
          radius="25px"
          size="18px"
          text="휴대폰 보러가기"
          onClick={() => navigate(`/device`)}
        />
      </ContentContainer>
    </MainContainer>
  )
}

export default DeviceListPage
