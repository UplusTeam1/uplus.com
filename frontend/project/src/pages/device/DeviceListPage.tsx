import styled from 'styled-components'

const TestText = styled.div`
  color: ${(props) => props.theme.app.upluspink};
`

function DeviceListPage() {
  return (
    <>
      <TestText>DeviceListPage</TestText>
    </>
  )
}

export default DeviceListPage
