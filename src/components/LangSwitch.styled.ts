import styled from '@emotion/styled'
import { linkInterpolation } from '@styles/link'

export const Root = styled.div`
  display: flex;

  > a {
    ${linkInterpolation}
  }

  > p,
  > a {
    margin-right: ${({ theme }) => theme.spacing(1)};

    &:last-child {
      margin-right: 0;
    }
  }
`
