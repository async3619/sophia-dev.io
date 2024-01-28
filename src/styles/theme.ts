import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import local from 'next/font/local'

const suite = local({
  src: './suite.woff2',
})

export const theme = extendTheme({
  colorSchemes: {},
  typography: {
    fontFamily: [suite.style.fontFamily, 'sans-serif'].join(','),
    fontWeightRegular: 500,
  },
})
