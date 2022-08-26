import styled, { css, useTheme } from 'styled-components'
import { darken, lighten } from 'polished'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props: ButtonContainerProps) => {
    return css`
      width: ${props.width};
      height: ${props.height};
      border-radius: ${props.radius};
      font-size: ${props.size};
      color: ${props.fontColor};
      background-color: ${props.bgColor};
      &:hover {
        background: ${darken(0.1, props.bgColor)};
      }
      &:active {
        background: ${darken(0.2, props.bgColor)};
      }
      border: ${props.border};
    `
  }}
`

interface ButtonContainerProps {
  width: string
  height: string
  radius: string
  size: string
  fontColor: string
  bgColor: string
  border: string
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
  fontColor: '',
  bgColor: '',
  border: '',
}

function UplusButton(props: UplusButtonProps) {
  const theme = useTheme()

  return (
    <ButtonContainer
      width={props.width}
      height={props.height}
      radius={props.radius}
      size={props.size}
      fontColor={props.fontColor === '' ? theme.app.whiteFont : props.fontColor}
      bgColor={props.bgColor === '' ? theme.app.uplusPink : props.bgColor}
      border={props.border}
      onClick={() => props.onClick()}
    >
      {props.text}
    </ButtonContainer>
  )
}

export default UplusButton
