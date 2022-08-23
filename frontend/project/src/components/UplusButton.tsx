import styled from 'styled-components'

const ButtonContainer = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => props.theme.app.upluspink};
`

interface UplusButtonProps {
  width: number
  height: number
  radius: number
}

UplusButton.defaultProps = {
  width: 200,
  height: 50,
  radius: 10,
}

function UplusButton({ width, height, radius }: UplusButtonProps) {
  return <ButtonContainer></ButtonContainer>
}

export default UplusButton
