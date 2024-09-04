import styled from '@emotion/styled'
import { linkInterpolation } from '@styles/link'

export const Root = styled.div``

export const DescriptionList = styled.ul`
  margin: 0;
  padding: ${({ theme }) => theme.spacing(1, 0, 0, 2)};
`

export const Link = styled.a`
  ${linkInterpolation};

  color: ${({ theme }) => theme.palette.text.primary};

  > span {
    text-decoration: underline;
  }
`
