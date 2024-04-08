import styled from '@emotion/styled'

export const Root = styled.blockquote`
  margin: ${({ theme }) => theme.spacing(2, -2)};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  border-left: 4px solid ${({ theme }) => theme.vars.palette.text.secondary};

  font-style: italic;

  color: ${({ theme }) => theme.vars.palette.text.secondary};
`
