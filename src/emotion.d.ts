import type { experimental_extendTheme } from '@mui/material/styles'

declare module '@emotion/react' {
  export interface Theme extends ReturnType<typeof experimental_extendTheme> {}
}
