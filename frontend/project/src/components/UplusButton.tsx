import styled, { css } from 'styled-components'
import { darken } from 'polished'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  background-color: ${(props) => props.theme.app.uplusPink};
  &:hover {
    background: ${(props) => darken(0.1, props.theme.app.uplusPink)};
  }
  ${({ width, height, radius, size }: ButtonContainerProps) => {
    return css`
      width: ${width};
      height: ${height};
      border-radius: ${radius};
      font-size: ${size};
    `
  }}
`

interface ButtonContainerProps {
  width: string
  height: string
  radius: string
  size: string
}

interface UplusButtonProps extends ButtonContainerProps {
  text: string
  onClick: () => void
}

UplusButton.defaultProps = {
  width: '200px',
  height: '50px',
  radius: '10px',
  size: '16px',
  text: 'Button',
}

function UplusButton({
  width,
  height,
  radius,
  size,
  text,
  onClick,
}: UplusButtonProps) {
  return (
    <ButtonContainer
      width={width}
      height={height}
      radius={radius}
      size={size}
      onClick={() => onClick()}
    >
      {text}
    </ButtonContainer>
  )
}

export default UplusButton
