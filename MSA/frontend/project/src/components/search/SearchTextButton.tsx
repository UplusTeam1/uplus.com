import styled, { css, useTheme } from 'styled-components'
import { darken } from 'polished'

const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) => {
    return css`
      min-width: ${props.minWidth};
      width: ${props.width};
      height: ${props.height};
      border-radius: ${props.radius};
      font-size: ${props.size};
      color: ${props.fontColor};
      background-color: ${props.bgColor};
      padding-left: ${props.paddingLeft};
      padding-right: ${props.paddingRight};
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
  minWidth: string
  width: string
  height: string
  radius: string
  size: string
  fontColor: string
  bgColor: string
  border: string
  paddingLeft: string
  paddingRight: string
}

interface SearchTextButtonProps extends ButtonContainerProps {
  text: string
  onClick: () => void
}

SearchTextButton.defaultProps = {
  minWidth: '100px',
  width: '200px',
  height: '50px',
  radius: '10px',
  size: '16px',
  text: 'Button',
  fontColor: '',
  bgColor: '',
  border: '',
  paddingLeft: '0px',
  paddingRight: '0px',
}

function SearchTextButton(props: SearchTextButtonProps) {
  const theme = useTheme()

  return (
    <ButtonContainer
      minWidth={props.minWidth}
      width={props.width}
      height={props.height}
      radius={props.radius}
      size={props.size}
      fontColor={props.fontColor === '' ? theme.app.whiteFont : props.fontColor}
      bgColor={props.bgColor === '' ? theme.app.uplusPink : props.bgColor}
      border={props.border}
      paddingLeft={props.paddingLeft}
      paddingRight={props.paddingRight}
      onClick={() => props.onClick()}
    >
      {props.text}
    </ButtonContainer>
  )
}

export default SearchTextButton
