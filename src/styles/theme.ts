import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import local from 'next/font/local'

const suite = local({
  src: './suite.woff2',
})

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        divider: '#ccc',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#8cb4ff',
        },
        background: {
          default: '#1b1b1b',
        },
        divider: '#aaa',
      },
    },
  },
  typography: {
    fontFamily: [suite.style.fontFamily, 'sans-serif'].join(','),
    fontWeightRegular: 500,
  },
})
