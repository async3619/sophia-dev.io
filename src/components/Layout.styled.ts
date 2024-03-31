import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(4, 0)};
`

export const Main = styled.main`
  overflow-x: hidden;
`

export const GlobalStyles = css`
  a {
    -webkit-tap-highlight-color: transparent;
  }
`
