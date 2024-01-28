import styled from '@emotion/styled'

export const Root = styled.code`
  padding: ${({ theme }) => theme.spacing(0.125, 0.25)};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 2px;

  font-size: 0.9em;
  font-family: 'Consolas', monospace;

  background-color: #eee;
`
