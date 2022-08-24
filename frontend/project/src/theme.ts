import { createTheme, Theme as MuiTheme } from '@mui/material/styles'

const muiTheme: MuiTheme = createTheme({
  palette: {
    primary: {
      main: '#e6007e',
    },
  },
})

export const theme = {
  ...muiTheme,
  app: {
    uplusPink: '#E6007E',
    lightGray: '#F8F8F8',
    divederGray: '#E1E1E1',
    blackFont: '#000000',
    grayFont: '#646464',
  },
}

export type Theme = typeof theme
