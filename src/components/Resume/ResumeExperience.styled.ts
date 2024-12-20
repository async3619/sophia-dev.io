import styled from '@emotion/styled'

export const Root = styled.div``

export const DescriptionList = styled.ul`
  margin: 0;
  padding: ${({ theme }) => theme.spacing(1, 0, 0, 2)};
`

export const Link = styled.a`
  color: ${({ theme }) => theme.vars.palette.text.primary};

  > span {
    text-decoration: underline;
  }
`
