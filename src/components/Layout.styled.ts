import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Root = styled.div`
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }) => theme.spacing(4, 0)};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: ${({ theme }) => theme.spacing(1, 0)};
  }

  @media print {
    padding: 0;
  }
`

export const Main = styled.main``

export const GlobalStyles = css`
  a {
    -webkit-tap-highlight-color: transparent;
  }

  @media print {
    @page {
      margin: 0;
    }

    body {
      margin: 1.6cm;
    }

    html {
      font-size: 10pt;
    }
  }
`
