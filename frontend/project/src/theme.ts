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
    upluspink: '#e6007e',
  },
}

export type Theme = typeof theme
