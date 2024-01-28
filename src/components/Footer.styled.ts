import styled from '@emotion/styled'
import { linkInterpolation } from '@styles/link'

export const Root = styled.div``

export const Divider = styled.div`
  width: ${({ theme }) => theme.spacing(4)};
  height: 1px;

  margin: ${({ theme }) => theme.spacing(4, 0)};

  background-color: ${({ theme }) => theme.palette.divider};
`

export const Table = styled.table`
  &,
  th,
  td {
    border: 0;
    padding: ${({ theme }) => theme.spacing(0, 0, 0.5)};
    border-spacing: 0;
  }

  th {
    min-width: ${({ theme }) => theme.spacing(8)};

    text-align: left;
  }
`

export const Link = styled.a`
  ${linkInterpolation}
`
