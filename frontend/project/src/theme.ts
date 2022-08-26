import { createTheme, Theme as MuiTheme } from '@mui/material/styles'

const muiTheme: MuiTheme = createTheme({
  palette: {
    primary: {
      main: '#E6007E',
    },
    secondary: {
      main: '#8A8A8A',
    },
  },
})

export const theme = {
  ...muiTheme,
  app: {
    mainBackground: '#000000',
    background: '#FFFFFF',
    uplusPink: '#E6007E',
    lightGray: '#F8F8F8',
    dividerGray: '#E1E1E1',
    blackFont: '#000000',
    grayFont: '#646464',
    whiteFont: '#FFFFFF',
  },
}

export type Theme = typeof theme
