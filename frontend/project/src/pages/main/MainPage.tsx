import styled from 'styled-components'

const MainContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-image: url('/images/LG_U+_Background.png');
  background-size: 100%;
  background-repeat: no-repeat;
`
const TestText = styled.div`
  color: ${(props) => props.theme.app.upluspink};
`

function DeviceListPage() {
  return (
    <MainContainer>
      <TestText></TestText>
    </MainContainer>
  )
}

export default DeviceListPage
