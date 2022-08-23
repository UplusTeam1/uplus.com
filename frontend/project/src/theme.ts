import { createTheme, Theme as MuiTheme } from '@mui/material/styles'

const muiTheme: MuiTheme = createTheme({
  palette: {},
})

export const theme = {
  ...muiTheme,
  app: {
    upluspink: '#e6007e',
  },
}

export type Theme = typeof theme
